'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
}

function HeroSection() {
  const ref = useRef(null)
  const [textVisible, setTextVisible] = useState(false)
  const [scrollLocked, setScrollLocked] = useState(true)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])

  useEffect(() => {
    let scrollCount = 0

    const handleWheel = (e: WheelEvent) => {
      if (scrollLocked) {
        if (e.deltaY > 0) {
          scrollCount++
          if (scrollCount === 1) {
            e.preventDefault()
            setTextVisible(true)
          } else if (scrollCount >= 2) {
            setScrollLocked(false)
          }
        }
      } else {
        // Page is scrolled — if user scrolls back to top, hide text
        if (window.scrollY <= 5 && e.deltaY < 0) {
          setTextVisible(false)
          setScrollLocked(true)
          scrollCount = 0
        }
      }
    }

    const handleScroll = () => {
      if (!scrollLocked && window.scrollY <= 0) {
        setTextVisible(false)
        setScrollLocked(true)
      }
    }

    const handleTouch = (() => {
      let startY = 0
      return {
        start: (e: TouchEvent) => { startY = e.touches[0].clientY },
        end: (e: TouchEvent) => {
          const diff = startY - e.changedTouches[0].clientY
          if (scrollLocked) {
            if (diff > 30) {
              scrollCount++
              if (scrollCount === 1) {
                e.preventDefault()
                setTextVisible(true)
              } else if (scrollCount >= 2) {
                setScrollLocked(false)
              }
            }
          } else if (window.scrollY <= 5 && diff < -30) {
            setTextVisible(false)
            setScrollLocked(true)
            scrollCount = 0
          }
        }
      }
    })()

    if (scrollLocked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('touchstart', handleTouch.start, { passive: true })
    window.addEventListener('touchend', handleTouch.end, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchstart', handleTouch.start)
      window.removeEventListener('touchend', handleTouch.end)
      document.body.style.overflow = ''
    }
  }, [scrollLocked])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/uploads/c7e66389-33e9-4961-8cb4-a670145488ee.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content — hidden first, appears on first scroll */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={textVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p className="text-accent text-sm uppercase tracking-[0.3em] mb-6 font-[family-name:var(--font-heading)]">
            Premium Creative Studio
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-8 font-[family-name:var(--font-heading)]">
            We Create
            <br />
            <span className="text-gold-gradient">Visual Stories</span>
          </h1>
          <p className="text-lg md:text-xl text-text-muted max-w-xl mx-auto mb-12">
            Films • Reels • Photography • Branding • Websites
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/work" className="btn-primary">
              View Work
            </Link>
            <Link href="/contact" className="btn-outline">
              Book Now
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — shows when text is NOT visible */}
      {!textVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-accent/60 to-transparent animate-pulse" />
        </motion.div>
      )}
    </section>
  )
}

function IntroSection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.p
            variants={fadeInUp}
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight font-[family-name:var(--font-heading)]"
          >
            We make{' '}
            <span className="text-gold-gradient">brand films</span>, reels,
            websites and digital systems that make{' '}
            <span className="text-red italic">ideas click</span>.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

const services = [
  {
    title: 'CREATE',
    items: [
      { name: 'Logo / Intro Outro', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80' },
      { name: 'AD Films', image: 'https://images.unsplash.com/photo-1536240478700-b869ad10c2a3?w=400&q=80' },
      { name: 'Reels', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80' },
      { name: 'Motion Graphics', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&q=80' },
    ],
    align: 'left',
  },
  {
    title: 'SHOOTS',
    items: [
      { name: 'Product', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80' },
      { name: 'Pre-Wedding', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80' },
      { name: 'Bridal', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80' },
    ],
    align: 'center',
  },
  {
    title: 'DESIGN',
    items: [
      { name: 'Branding', image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&q=80' },
      { name: 'Web', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80' },
      { name: 'Bots', image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&q=80' },
    ],
    align: 'right',
  },
]

function ServicesSection() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="py-24 md:py-32 bg-bg border-t border-border">
      <div className="container-custom">
        {/* Category Titles */}
        <div className="space-y-0 border-b border-border">
          {services.map((service) => {
            const isHovered = hovered === service.title
            // Alignment classes
            const alignCls = service.align === 'center'
              ? 'md:pl-[15%]'
              : service.align === 'right'
              ? 'md:pl-[30%]'
              : 'md:pl-[5%]'

            return (
              <div
                key={service.title}
                className="border-t border-border"
                onMouseEnter={() => setHovered(service.title)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Title Row */}
                <div className={`py-10 md:py-14 cursor-pointer transition-all duration-300 ${alignCls}`}>
                  <motion.h2
                    animate={{ color: isHovered ? '#d42b2b' : 'rgba(255,255,255,0.5)' }}
                    transition={{ duration: 0.25 }}
                    className="font-bold tracking-wider font-[family-name:var(--font-heading)]"
                    style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
                  >
                    {service.title}
                  </motion.h2>
                </div>

                {/* Subcategory Cards — only on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
                        {service.items.map((item, j) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: j * 0.06, duration: 0.3 }}
                          >
                            <Link href={`/work?filter=${service.title.toLowerCase()}`} className="group/card block">
                              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#111]">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/card:opacity-90 group-hover/card:scale-105 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover/card:bg-black/20 transition-colors duration-300" />
                                {/* Centered Text — big bold */}
                                <div className="absolute inset-0 flex items-center justify-center p-3">
                                  <h3 className="text-white text-lg md:text-xl font-bold text-center tracking-wide font-[family-name:var(--font-heading)] drop-shadow-lg">
                                    {item.name}
                                  </h3>
                                </div>
                                {/* Arrow */}
                                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity">
                                  <span className="text-white text-xs">↗</span>
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const featuredWork = [
  { title: 'Luxe Watches — Brand Film', category: 'create', thumb: '/uploads/portfolio-thumb-1.jpg' },
  { title: 'Artisan Coffee — Product Shoot', category: 'shoots', thumb: '/uploads/portfolio-thumb-2.jpg' },
  { title: 'FinTech App — UI/UX Design', category: 'design', thumb: '/uploads/portfolio-thumb-3.jpg' },
  { title: 'Streetwear Drop — Reels', category: 'create', thumb: '/uploads/portfolio-thumb-4.jpg' },
  { title: 'Organic Skincare — Packaging', category: 'design', thumb: '/uploads/portfolio-thumb-5.jpg' },
  { title: 'Restaurant Interior — Photo', category: 'shoots', thumb: '/uploads/portfolio-thumb-6.jpg' },
]

function FeaturedWorkSection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="mb-20"
        >
          <motion.p variants={fadeInUp} className="text-accent text-sm uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-heading)]">
            Portfolio
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-heading)]">
            Featured Work
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {featuredWork.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className="relative aspect-[4/5] overflow-hidden group cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.thumb})` }}
              />
              <div className="absolute inset-0 bg-bg/40 group-hover:bg-bg/20 transition-all duration-500" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <span className="text-accent text-xs uppercase tracking-widest mb-2 font-[family-name:var(--font-heading)]">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold font-[family-name:var(--font-heading)]">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/work" className="btn-outline">
            View All Work
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function ShowreelSection() {
  const [showreelUrl, setShowreelUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ')

  useEffect(() => {
    fetch('/api/branding')
      .then(r => r.json())
      .then(data => {
        if (data?.showreelUrl) setShowreelUrl(data.showreelUrl)
      })
      .catch(() => {})
  }, [])

  return (
    <section className="relative py-0">
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-bg-card" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.05),transparent_70%)]" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="relative z-10 text-center px-6"
        >
          <motion.p variants={fadeInUp} className="text-accent text-sm uppercase tracking-[0.3em] mb-6 font-[family-name:var(--font-heading)]">
            Showreel
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-8 font-[family-name:var(--font-heading)]">
            See Our Work <span className="text-gold-gradient">In Motion</span>
          </motion.h2>
          <motion.div variants={fadeInUp}>
            <a
              href={showreelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 group"
            >
              <div className="w-20 h-20 rounded-full border-2 border-accent flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-accent group-hover:text-bg ml-1 transition-colors"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-lg text-text-muted group-hover:text-accent transition-colors font-[family-name:var(--font-heading)]">
                Play Showreel
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const caseStudies = [
  {
    problem: 'Zero online presence, losing customers',
    result: '3x increase in online inquiries in 60 days',
    image: '/uploads/case-study-1.jpg',
  },
  {
    problem: 'New restaurant, empty tables',
    result: 'Fully booked weekends within 3 weeks',
    image: '/uploads/case-study-2.jpg',
  },
  {
    problem: 'Complex AI product, low sign-ups',
    result: 'Conversion rate jumped from 2.1% to 7.8%',
    image: '/uploads/case-study-3.jpg',
  },
]

function CaseStudiesSection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
          className="mb-20"
        >
          <motion.p variants={fadeInUp} className="text-accent text-sm uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-heading)]">
            Results
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-heading)]">
            Case Studies
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {caseStudies.map((study) => (
            <motion.div
              key={study.problem}
              variants={fadeInUp}
              className="relative aspect-[3/4] overflow-hidden group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${study.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <p className="text-text-dim text-xs uppercase tracking-wider mb-3">Challenge</p>
                <p className="text-text-muted text-sm mb-4">{study.problem}</p>
                <div className="h-px bg-accent/30 mb-4" />
                <p className="text-accent text-xs uppercase tracking-wider mb-2 font-[family-name:var(--font-heading)]">Result</p>
                <p className="text-lg font-bold font-[family-name:var(--font-heading)]">{study.result}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="relative h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.08),transparent_50%)]" />

      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 font-[family-name:var(--font-heading)]"
          >
            Let&apos;s Make
            <br />
            <span className="text-gold-gradient">Something Great</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-text-muted max-w-md mx-auto mb-12"
          >
            Ready to bring your vision to life? Let&apos;s talk.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="https://wa.me/919876543210?text=Hi%20Nickwal%20Studios%2C%20I%27d%20like%20to%20discuss%20a%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              WhatsApp Us
            </a>
            <Link href="/contact" className="btn-outline">
              Book a Call
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <IntroSection />
        <ServicesSection />
        <FeaturedWorkSection />
        <ShowreelSection />
        <CaseStudiesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
