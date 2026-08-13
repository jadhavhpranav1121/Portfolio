'use client'

import { useCallback, useEffect, useState } from 'react'
import { ArrowUpRight, LogOut, RotateCcw, Save } from 'lucide-react'
import type { User } from 'firebase/auth'
import { ContentEditor } from '@/components/admin/content-editor'
import { Button, Field } from '@/components/admin/fields'
import { mergeContent } from '@/lib/content'
import { sanitizeContent } from '@/lib/content-io'
import { defaultContent, type SiteContent } from '@/lib/data'
import { CONTENT_PATH, getDb, getFirebaseAuth, isFirebaseConfigured } from '@/lib/firebase'

type Status = { kind: 'idle' | 'busy' | 'ok' | 'error'; message?: string }

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(false)
  const [content, setContent] = useState<SiteContent>(defaultContent)
  const [loaded, setLoaded] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  useEffect(() => {
    const auth = getFirebaseAuth()
    if (!auth) {
      setAuthReady(true)
      return
    }
    let unsubscribe: (() => void) | undefined
    void (async () => {
      const { onAuthStateChanged } = await import('firebase/auth')
      unsubscribe = onAuthStateChanged(auth, (next) => {
        setUser(next)
        setAuthReady(true)
      })
    })()
    return () => unsubscribe?.()
  }, [])

  // Load the live document once signed in, so the editor starts from what the
  // site is actually serving rather than the built-in defaults.
  useEffect(() => {
    const db = getDb()
    if (!db || !user || loaded) return
    void (async () => {
      const { doc, getDoc } = await import('firebase/firestore')
      try {
        const snapshot = await getDoc(doc(db, CONTENT_PATH.collection, CONTENT_PATH.doc))
        setContent(snapshot.exists() ? mergeContent(snapshot.data()) : defaultContent)
        setLoaded(true)
        setDirty(false)
      } catch (e) {
        setStatus({
          kind: 'error',
          message: e instanceof Error ? e.message : 'Could not load content',
        })
      }
    })()
  }, [user, loaded])

  // Guard against closing the tab with unpublished edits.
  useEffect(() => {
    if (!dirty) return
    const onBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [dirty])

  const publish = useCallback(async () => {
    const db = getDb()
    if (!db) return
    setStatus({ kind: 'busy', message: 'Publishing…' })
    try {
      const { doc, serverTimestamp, setDoc } = await import('firebase/firestore')
      const payload = sanitizeContent(content)
      await setDoc(doc(db, CONTENT_PATH.collection, CONTENT_PATH.doc), {
        ...payload,
        updatedAt: serverTimestamp(),
      })
      setContent(payload)
      setDirty(false)
      setStatus({ kind: 'ok', message: 'Published — live on the site now.' })
    } catch (e) {
      setStatus({
        kind: 'error',
        message: e instanceof Error ? e.message : 'Publish failed',
      })
    }
  }, [content])

  if (!isFirebaseConfigured) return <SetupNotice />
  if (!authReady) return <Centered>Loading…</Centered>
  if (!user) return <SignIn />

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <div className="mr-auto">
            <h1 className="font-mono text-sm uppercase tracking-wider">Portfolio content</h1>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          {status.message ? (
            <span
              className={
                status.kind === 'error'
                  ? 'text-xs text-destructive'
                  : 'text-xs text-muted-foreground'
              }
            >
              {status.message}
            </span>
          ) : null}
          {dirty ? (
            <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Unpublished
            </span>
          ) : null}
          <Button
            variant="ghost"
            onClick={() => {
              if (confirm('Discard your edits and reset the editor to the built-in defaults?')) {
                setContent(defaultContent)
                setDirty(true)
                setStatus({ kind: 'idle' })
              }
            }}
            title="Reset the editor to the content committed in lib/data.ts"
          >
            <RotateCcw className="size-3.5" aria-hidden /> Defaults
          </Button>
          <Button variant="ghost" onClick={() => window.open('/', '_blank', 'noopener')}>
            View site <ArrowUpRight className="size-3.5" aria-hidden />
          </Button>
          <Button
            variant="ghost"
            onClick={async () => {
              const auth = getFirebaseAuth()
              if (!auth) return
              const { signOut } = await import('firebase/auth')
              await signOut(auth)
            }}
          >
            <LogOut className="size-3.5" aria-hidden /> Sign out
          </Button>
          <Button onClick={publish} disabled={status.kind === 'busy' || !dirty}>
            <Save className="size-3.5" aria-hidden /> Publish
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <ContentEditor
          content={content}
          onChange={(next) => {
            setContent(next)
            setDirty(true)
            if (status.kind === 'ok') setStatus({ kind: 'idle' })
          }}
        />
      </main>
    </div>
  )
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-6 text-sm text-muted-foreground">
      {children}
    </div>
  )
}

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async () => {
    const auth = getFirebaseAuth()
    if (!auth) return
    setBusy(true)
    setError('')
    try {
      const { signInWithEmailAndPassword } = await import('firebase/auth')
      await signInWithEmailAndPassword(auth, email.trim(), password)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sign-in failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          void submit()
        }}
        className="w-full max-w-sm space-y-4 rounded-xl border border-border bg-card p-6"
      >
        <div>
          <h1 className="font-mono text-sm uppercase tracking-wider">Admin sign in</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Firebase Auth account for this project.
          </p>
        </div>
        <Field label="Email" type="email" value={email} onChange={setEmail} />
        <Field label="Password" type="password" value={password} onChange={setPassword} />
        {error ? <p className="text-xs text-destructive">{error}</p> : null}
        <Button type="submit" disabled={busy} className="w-full justify-center">
          {busy ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </div>
  )
}

function SetupNotice() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-sm">
      <h1 className="font-mono text-sm uppercase tracking-wider">Admin not configured</h1>
      <p className="mt-3 text-muted-foreground">
        The Firebase client config is missing, so the admin page can&apos;t sign you in. Copy{' '}
        <code className="text-foreground">.env.example</code> to{' '}
        <code className="text-foreground">.env.local</code>, fill in the values from the Firebase
        console (Project settings → Your apps → Web app), and redeploy. Full steps are in{' '}
        <code className="text-foreground">README.md</code>.
      </p>
      <p className="mt-3 text-muted-foreground">
        Until then the site keeps rendering the content committed in{' '}
        <code className="text-foreground">lib/data.ts</code>.
      </p>
    </div>
  )
}
