'use client'

import Link from 'next/link'

const legalLinks = [
  { href: '/about', label: 'About' },
  { href: '/privacy-policy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/refund-policy', label: 'Refund Policy' },
]

const socialLinks = [
  { href: 'https://instagram.com/nickwalstudios', label: 'Instagram' },
  { href: 'https://youtube.com/@nickwalstudios', label: 'YouTube' },
  { href: 'https://linkedin.com/company/nickwalstudios', label: 'LinkedIn' },
]

export default function Footer() {

  return (
    <footer className="border-t border-border bg-bg">
      <div className="container-custom py-16">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0">
            <img
              src="/uploads/ad66040a-2be3-4093-a323-4d92a2bdfeed.png"
              alt="N"
              className="h-12 md:h-14 w-auto object-contain"
            />
            <div className="flex flex-col leading-none justify-center -ml-24">
              <span
                className="text-lg md:text-xl font-light tracking-[0.08em] leading-none"
                style={{
                  fontFamily: 'var(--font-heading)',
                  background: 'linear-gradient(180deg, #f0d060 0%, #c9a84c 50%, #8a6820 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                NICKWAL
              </span>
              <span
                className="text-xs md:text-sm font-light tracking-[0.2em] leading-none mt-0.5"
                style={{
                  fontFamily: 'var(--font-heading)',
                  background: 'linear-gradient(180deg, #c9a84c 0%, #8a6820 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                STUDIOS
              </span>
              <span className="text-[10px] md:text-xs italic font-normal mt-1 tracking-wide" style={{ color: '#e03030' }}>
                idea clicks
              </span>
            </div>
          </Link>

          {/* Social */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-text-dim hover:text-text-muted transition-colors uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-text-dim">
            © {new Date().getFullYear()} Nickwal Studios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
