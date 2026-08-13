import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ContentProvider } from '@/lib/content'
import { siteUrl } from '@/lib/data'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Pranav Jadhav | Software Engineer — Java & Spring Boot',
  description:
    'Software Engineer specializing in Java, Spring Boot, distributed systems, Kafka, PostgreSQL, Redis and Angular.',
  keywords: [
    'Pranav Jadhav',
    'Software Engineer',
    'Java',
    'Spring Boot',
    'Distributed Systems',
    'Kafka',
    'PostgreSQL',
    'Redis',
    'Angular',
    'Backend Engineer',
    'Pune',
  ],
  authors: [{ name: 'Pranav Jadhav', url: siteUrl }],
  creator: 'Pranav Jadhav',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Pranav Jadhav | Software Engineer — Java & Spring Boot',
    description:
      'Software Engineer specializing in Java, Spring Boot, distributed systems, Kafka, PostgreSQL, Redis and Angular.',
    siteName: 'Pranav Jadhav',
    locale: 'en_US',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Pranav Jadhav — Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pranav Jadhav | Software Engineer — Java & Spring Boot',
    description:
      'Software Engineer specializing in Java, Spring Boot, distributed systems, Kafka, PostgreSQL, Redis and Angular.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-dark-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-icon.png' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0b0f',
  width: 'device-width',
  initialScale: 1,
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Pranav Jadhav',
  jobTitle: 'Software Engineer',
  url: siteUrl,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Pune',
    addressCountry: 'India',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Emerson Export Engineering Center',
  },
  email: 'mailto:pranavhj23@gmail.com',
  sameAs: [
    'https://www.linkedin.com/in/pranavharijadhav/',
    'https://github.com/jadhavhpranav1121',
  ],
  knowsAbout: [
    'Java',
    'Spring Boot',
    'Distributed Systems',
    'Apache Kafka',
    'PostgreSQL',
    'Redis',
    'Angular',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <ContentProvider>{children}</ContentProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
