'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
]

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-0 group">
      {/* Red Diamond N — clip right black space */}
      <div className="h-12 md:h-14 w-9 md:w-11 overflow-hidden flex-shrink-0">
        <img
          src="/uploads/acf4fb8f-1472-45f3-a133-c0f5c057d321.png"
          alt="N"
          className="h-full w-auto max-w-none object-cover object-left transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {/* Text — touching N */}
      <div className="flex flex-col leading-none justify-center">
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
  )
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-bg/95 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom flex items-center justify-between h-20">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-[0.15em] text-text-muted hover:text-accent transition-colors duration-300 font-[family-name:var(--font-heading)]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn-primary !py-2.5 !px-6 !text-xs"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-[2px] bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-[5px]' : ''
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-white transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg/98 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-bold uppercase tracking-wider text-text hover:text-accent transition-colors font-[family-name:var(--font-heading)]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary mt-4"
                >
                  Book Now
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
