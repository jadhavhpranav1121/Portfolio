'use client'

import { useCallback, useEffect, useState } from 'react'
import { ArrowUpRight, LogOut, RotateCcw, Save } from 'lucide-react'
import type { Auth, User } from 'firebase/auth'
import { ContentEditor } from '@/components/admin/content-editor'
import { Button, Field } from '@/components/admin/fields'
import { isCurrent, mergeContent } from '@/lib/content'
import { sanitizeContent } from '@/lib/content-io'
import { contentVersion, defaultContent, type SiteContent } from '@/lib/data'
import {
  CONTENT_PATH,
  getDb,
  getFirebaseAuth,
  isFirebaseConfigured,
  OWNER_EMAIL,
} from '@/lib/firebase'

const isOwner = (user: User) =>
  user.emailVerified && user.email?.toLowerCase() === OWNER_EMAIL

type Status = { kind: 'idle' | 'busy' | 'ok' | 'error'; message?: string }

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(false)
  const [content, setContent] = useState<SiteContent>(defaultContent)
  const [loaded, setLoaded] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [denied, setDenied] = useState<string | null>(null)

  useEffect(() => {
    const auth = getFirebaseAuth()
    if (!auth) {
      setAuthReady(true)
      return
    }
    let unsubscribe: (() => void) | undefined
    void (async () => {
      const { onAuthStateChanged } = await import('firebase/auth')
      const { signOut } = await import('firebase/auth')
      unsubscribe = onAuthStateChanged(auth, (next) => {
        // Only the owner gets in. Anyone else is signed straight back out, so
        // the editor never renders for them (firestore.rules blocks their
        // writes regardless).
        if (next && !isOwner(next)) {
          setDenied(next.email ?? 'This account')
          void signOut(auth)
          return
        }
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
        const data = snapshot.exists() ? snapshot.data() : null
        setContent(mergeContent(data))
        setLoaded(true)
        setDirty(false)
        if (data && !isCurrent(data)) {
          setStatus({
            kind: 'idle',
            message: 'The Markdown in content/ changed since your last publish — starting from it.',
          })
        }
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
        version: contentVersion,
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
  if (!user) return <SignIn denied={denied} onRetry={() => setDenied(null)} />

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
            title="Reset the editor to the Markdown committed in content/"
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

function SignIn({ denied, onRetry }: { denied: string | null; onRetry: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const run = async (signIn: (auth: Auth) => Promise<unknown>) => {
    const auth = getFirebaseAuth()
    if (!auth) return
    setBusy(true)
    setError('')
    onRetry()
    try {
      await signIn(auth)
    } catch (e) {
      const code = (e as { code?: string }).code
      // Closing the Google popup is not an error worth showing.
      if (code !== 'auth/popup-closed-by-user' && code !== 'auth/cancelled-popup-request') {
        setError(e instanceof Error ? e.message : 'Sign-in failed')
      }
    } finally {
      setBusy(false)
    }
  }

  // Google accounts arrive with a verified email, which both the owner check
  // and firestore.rules require.
  const signInWithGoogle = () =>
    run(async (auth) => {
      const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth')
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ login_hint: OWNER_EMAIL, prompt: 'select_account' })
      await signInWithPopup(auth, provider)
    })

  const submit = () =>
    run(async (auth) => {
      const { signInWithEmailAndPassword } = await import('firebase/auth')
      await signInWithEmailAndPassword(auth, email.trim(), password)
    })

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
            Private to the site owner.
          </p>
        </div>
        <Button
          variant="ghost"
          disabled={busy}
          onClick={() => void signInWithGoogle()}
          className="w-full justify-center"
        >
          Sign in with Google
        </Button>
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or with a password
          <span className="h-px flex-1 bg-border" />
        </div>
        <Field label="Email" type="email" value={email} onChange={setEmail} />
        <Field label="Password" type="password" value={password} onChange={setPassword} />
        {denied ? (
          <p className="text-xs text-destructive">
            {denied} is not allowed here. This editor is private to the site owner.
          </p>
        ) : null}
        {error ? <p className="text-xs text-destructive">{error}</p> : null}
        <Button type="submit" disabled={busy} className="w-full justify-center">
          {busy ? 'Signing in…' : 'Sign in with password'}
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
        <code className="text-foreground">content/</code>.
      </p>
    </div>
  )
}
