import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

/**
 * Firebase client config. These NEXT_PUBLIC_* values are public by design —
 * they identify the project, they do not grant access. Write access is gated
 * by Firebase Auth plus the rules in firestore.rules.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

/**
 * The only account allowed into /admin. Must match the email in
 * firestore.rules, which is what actually enforces write access.
 */
export const OWNER_EMAIL = 'pranavhj23@gmail.com'

/** The document holding all editable site content. */
export const CONTENT_PATH = { collection: 'site', doc: 'content' } as const

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
)

function getFirebaseApp(): FirebaseApp {
  return getApps().length ? getApp() : initializeApp(firebaseConfig)
}

/** Returns the Firestore handle, or null when the project isn't configured. */
export function getDb(): Firestore | null {
  if (!isFirebaseConfigured) return null
  return getFirestore(getFirebaseApp())
}

/** Returns the Auth handle, or null when the project isn't configured. */
export function getFirebaseAuth(): Auth | null {
  if (!isFirebaseConfigured) return null
  return getAuth(getFirebaseApp())
}
