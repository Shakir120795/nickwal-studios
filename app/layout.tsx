import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Nickwal Studios — Premium Creative Studio',
    template: '%s | Nickwal Studios',
  },
  description:
    'Nickwal Studios — Premium Creative Studio for Video, Photography, Ads, Reels, Branding, Websites & Bots. We make ideas click.',
  keywords: [
    'video production',
    'brand films',
    'photography',
    'branding',
    'web design',
    'creative studio',
    'ad films',
    'reels',
    'Nickwal Studios',
  ],
  authors: [{ name: 'Nickwal Studios' }],
  openGraph: {
    title: 'Nickwal Studios — Premium Creative Studio',
    description: 'We create visual stories, brand films, reels, websites and digital systems that make ideas click.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Nickwal Studios',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-bg text-text antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
