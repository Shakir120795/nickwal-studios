'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const services = [
  {
    id: 'create',
    title: 'CREATE',
    description: 'Video production, brand films, ad films, reels, and motion content.',
    items: [
      { name: 'Logo / Intro Outro', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&q=80' },
      { name: 'AD Films', image: 'https://images.unsplash.com/photo-1536240478700-b869ad10c2a3?w=500&q=80' },
      { name: 'Reels', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&q=80' },
      { name: 'Motion Graphics', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&q=80' },
    ],
  },
  {
    id: 'shoots',
    title: 'SHOOTS',
    description: 'Professional photography for products, events, portraits, and brands.',
    items: [
      { name: 'Product', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
      { name: 'Pre-Wedding', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80' },
      { name: 'Bridal', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&q=80' },
    ],
  },
  {
    id: 'design',
    title: 'DESIGN',
    description: 'Branding, websites, and AI-powered systems for your business.',
    items: [
      { name: 'Branding', image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=500&q=80' },
      { name: 'Web', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80' },
      { name: 'Bots', image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500&q=80' },
    ],
  },
]

export default function ServicesPage() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-16">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6 font-[family-name:var(--font-heading)]"
            >
              Our <span className="text-gold-gradient">Services</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-text-muted">
              End-to-end creative solutions — from concept to delivery.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="pb-24">
        <div className="container-custom">
          <div className="border-t border-border">
            {services.map((service) => {
              const isOpen = expanded === service.id

              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="border-b border-border"
                  onMouseEnter={() => setExpanded(service.id)}
                  onMouseLeave={() => setExpanded(null)}
                >
                  {/* Title Row */}
                  <div
                    className="py-12 md:py-16 cursor-pointer flex items-center justify-between"
                    onClick={() => setExpanded(isOpen ? null : service.id)}
                  >
                    <div>
                      <motion.h2
                        animate={{ color: isOpen ? '#d42b2b' : 'rgba(255,255,255,0.5)' }}
                        transition={{ duration: 0.25 }}
                        className="font-bold tracking-wider font-[family-name:var(--font-heading)]"
                        style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
                      >
                        {service.title}
                      </motion.h2>
                      <motion.p
                        animate={{ opacity: isOpen ? 1 : 0.4 }}
                        className="text-text-muted text-sm md:text-base mt-2 max-w-md"
                      >
                        {service.description}
                      </motion.p>
                    </div>

                    {/* Arrow / Indicator */}
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0, opacity: isOpen ? 1 : 0.3 }}
                      transition={{ duration: 0.2 }}
                      className="text-2xl text-accent hidden md:block"
                    >
                      +
                    </motion.span>
                  </div>

                  {/* Subcategory Cards — expand */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                        className="overflow-hidden"
                      >
                        <div className="pb-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                          {service.items.map((item, j) => (
                            <motion.div
                              key={item.name}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: j * 0.07, duration: 0.35 }}
                            >
                              <Link href={`/work?filter=${service.id}`} className="group/card block">
                                {/* Image with centered text */}
                                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#111]">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/card:opacity-90 group-hover/card:scale-105 transition-all duration-500"
                                  />
                                  <div className="absolute inset-0 bg-black/40 group-hover/card:bg-black/20 transition-colors duration-300" />
                                  {/* Centered Text — big bold */}
                                  <div className="absolute inset-0 flex items-center justify-center p-4">
                                    <h3 className="text-white text-xl md:text-2xl font-bold text-center tracking-wide font-[family-name:var(--font-heading)] drop-shadow-lg">
                                      {item.name}
                                    </h3>
                                  </div>
                                  {/* Arrow */}
                                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity">
                                    <span className="text-white text-xs">↗</span>
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          ))}

                          {/* Enquire Now — bigger highlighted */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: service.items.length * 0.07, duration: 0.35 }}
                          >
                            <Link href="/contact" className="group/card block">
                              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-accent/10 border-2 border-accent/50 group-hover/card:border-accent group-hover/card:bg-accent/20 flex items-center justify-center transition-all duration-300">
                                <div className="text-center">
                                  <span className="text-4xl text-accent">→</span>
                                  <p className="text-base font-bold text-accent mt-3 tracking-wider uppercase">Enquire Now</p>
                                </div>
                              </div>
                            </Link>
                          </motion.div>
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

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-heading)]">
              Ready to <span className="text-gold-gradient">Start?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-text-muted text-lg mb-10">
              Tell us about your project. We&apos;ll get back within 24 hours.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Book a Call
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                WhatsApp Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
