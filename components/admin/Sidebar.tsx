'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '◆' },
  { href: '/admin/hero', label: 'Hero Slides', icon: '▶' },
  { href: '/admin/services', label: 'Services', icon: '◉' },
  { href: '/admin/portfolio', label: 'Portfolio', icon: '◫' },
  { href: '/admin/case-studies', label: 'Case Studies', icon: '◈' },
  { href: '/admin/leads', label: 'Leads', icon: '◎' },
  { href: '/admin/pages', label: 'Pages', icon: '◻' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙' },
  { href: '/admin/design', label: 'Design', icon: '◐' },
  { href: '/admin/branding', label: 'Branding', icon: '★' },
  { href: '/admin/media', label: 'Media', icon: '◭' },
  { href: '/admin/backup', label: 'Backup', icon: '⬡' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen admin-sidebar fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/admin" className="flex items-center gap-3">
          <svg
            width="28"
            height="28"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 2L38 20L20 38L2 20L20 2Z" fill="#d42b2b" />
            <path d="M13 28V12H16.5L23 22V12H27V28H23.5L17 18V28H13Z" fill="white" />
          </svg>
          <span className="text-gold-gradient text-sm font-bold tracking-wider font-[family-name:var(--font-heading)]">
            ADMIN
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                isActive
                  ? 'text-accent bg-accent/5 border-r-2 border-accent'
                  : 'text-text-muted hover:text-text hover:bg-white/3'
              }`}
            >
              <span className="text-xs">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-border">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 text-sm text-text-dim hover:text-text transition-colors mb-2"
        >
          ← View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-2 px-4 py-2 text-sm text-red hover:text-red/80 transition-colors w-full text-left"
        >
          Sign Out
        </button>
      </div>
    </aside>
  )
}
