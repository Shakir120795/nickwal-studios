'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const filters = ['all', 'create', 'shoots', 'design']

const portfolioItems = [
  { title: 'Luxe Watches — Brand Film', category: 'create', mediaType: 'video', thumb: '/uploads/portfolio-thumb-1.jpg', media: '/uploads/portfolio-1.mp4' },
  { title: 'Artisan Coffee — Product Shoot', category: 'shoots', mediaType: 'image', thumb: '/uploads/portfolio-thumb-2.jpg', media: '/uploads/portfolio-2.jpg' },
  { title: 'FinTech App — UI/UX Design', category: 'design', mediaType: 'image', thumb: '/uploads/portfolio-thumb-3.jpg', media: '/uploads/portfolio-3.jpg' },
  { title: 'Streetwear Drop — Reels Campaign', category: 'create', mediaType: 'video', thumb: '/uploads/portfolio-thumb-4.jpg', media: '/uploads/portfolio-4.mp4' },
  { title: 'Organic Skincare — Packaging', category: 'design', mediaType: 'image', thumb: '/uploads/portfolio-thumb-5.jpg', media: '/uploads/portfolio-5.jpg' },
  { title: 'Restaurant Interior — Photo Series', category: 'shoots', mediaType: 'image', thumb: '/uploads/portfolio-thumb-6.jpg', media: '/uploads/portfolio-6.jpg' },
  { title: 'Tech Startup — Brand Identity', category: 'design', mediaType: 'image', thumb: '/uploads/portfolio-thumb-7.jpg', media: '/uploads/portfolio-7.jpg' },
  { title: 'Fashion Week — Event Coverage', category: 'shoots', mediaType: 'image', thumb: '/uploads/portfolio-thumb-8.jpg', media: '/uploads/portfolio-8.jpg' },
]

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filteredItems = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeFilter)

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20">
        <div className="container-custom">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeInUp} className="text-accent text-sm uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-heading)]">
              Portfolio
            </motion.p>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-6 font-[family-name:var(--font-heading)]">
              Our <span className="text-gold-gradient">Work</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-text-muted max-w-lg">
              A selection of projects we&apos;re proud of. Every piece crafted with intention and precision.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-12">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 text-xs uppercase tracking-[0.2em] transition-all duration-300 font-[family-name:var(--font-heading)] ${
                  activeFilter === filter
                    ? 'bg-accent text-bg'
                    : 'border border-border-light text-text-muted hover:border-accent hover:text-accent'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-40">
        <div className="container-custom">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setLightbox(idx)}
                  className="relative aspect-[4/5] overflow-hidden group cursor-pointer"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.thumb})` }}
                  />
                  <div className="absolute inset-0 bg-bg/30 group-hover:bg-bg/10 transition-all duration-500" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-accent text-xs uppercase tracking-widest mb-2 font-[family-name:var(--font-heading)]">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold font-[family-name:var(--font-heading)]">{item.title}</h3>
                    {item.mediaType === 'video' && (
                      <span className="text-text-dim text-xs mt-1">▶ Video</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-bg/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-3xl text-text-muted hover:text-white"
            >
              ✕
            </button>
            <div className="max-w-5xl w-full max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
              {filteredItems[lightbox]?.mediaType === 'video' ? (
                <video
                  src={filteredItems[lightbox].media}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <div
                  className="w-full h-[70vh] bg-cover bg-center"
                  style={{ backgroundImage: `url(${filteredItems[lightbox]?.media})` }}
                />
              )}
              <p className="text-center mt-6 text-lg font-bold font-[family-name:var(--font-heading)]">
                {filteredItems[lightbox]?.title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="section-padding text-center border-t border-border">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-heading)]">
            Like What You See?
          </h2>
          <p className="text-text-muted text-lg mb-10">
            Let&apos;s create something just as good — or better — for your brand.
          </p>
          <Link href="/contact" className="btn-primary">
            Start a Project
          </Link>
        </div>
      </section>
    </>
  )
}
