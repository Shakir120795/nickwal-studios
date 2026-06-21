'use client'

import { motion } from 'framer-motion'
import { useState, FormEvent } from 'react'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const serviceOptions = [
  // CREATE
  'Logo / Intro Outro',
  'AD Films',
  'Reels',
  'Motion Graphics',
  // SHOOTS
  'Product Photography',
  'Pre-Wedding Shoot',
  'Bridal Shoot',
  // DESIGN
  'Branding',
  'Website Development',
  'Bots / Automation',
  // Other
  'Other',
]

const budgetOptions = [
  'Under ₹10,000',
  '₹10,000 - ₹25,000',
  '₹25,000 - ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000+',
  'Not sure yet',
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    budget: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }

      setSubmitted(true)
      setFormData({ name: '', phone: '', email: '', service: '', budget: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-12">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-4 font-[family-name:var(--font-heading)]"
            >
              Let&apos;s <span className="text-gold-gradient">Talk</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-text-muted">
              Have a project in mind? Fill out the form or reach us directly.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="pb-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* Form — 3 cols */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="lg:col-span-3"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 border border-border rounded-2xl"
                >
                  <div className="text-6xl mb-6">✓</div>
                  <h2 className="text-3xl font-bold mb-3 font-[family-name:var(--font-heading)]">Message Sent!</h2>
                  <p className="text-text-muted">We&apos;ll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-accent text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  {/* Name + Phone */}
                  <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-white/70 mb-2 block">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent border-b border-border-light py-3 text-white text-lg focus:border-accent outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-white/70 mb-2 block">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-transparent border-b border-border-light py-3 text-white text-lg focus:border-accent outline-none transition-colors"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={fadeInUp}>
                    <label className="text-sm text-white/70 mb-2 block">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-border-light py-3 text-white text-lg focus:border-accent outline-none transition-colors"
                      placeholder="you@email.com"
                    />
                  </motion.div>

                  {/* Service + Budget */}
                  <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-white/70 mb-2 block">Service Interest</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-transparent border-b border-border-light py-3 text-white text-lg focus:border-accent outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#111]">Select a service</option>
                        <optgroup label="CREATE" className="bg-[#111]">
                          <option value="Logo / Intro Outro" className="bg-[#111]">Logo / Intro Outro</option>
                          <option value="AD Films" className="bg-[#111]">AD Films</option>
                          <option value="Reels" className="bg-[#111]">Reels</option>
                          <option value="Motion Graphics" className="bg-[#111]">Motion Graphics</option>
                        </optgroup>
                        <optgroup label="SHOOTS" className="bg-[#111]">
                          <option value="Product Photography" className="bg-[#111]">Product Photography</option>
                          <option value="Pre-Wedding Shoot" className="bg-[#111]">Pre-Wedding Shoot</option>
                          <option value="Bridal Shoot" className="bg-[#111]">Bridal Shoot</option>
                        </optgroup>
                        <optgroup label="DESIGN" className="bg-[#111]">
                          <option value="Branding" className="bg-[#111]">Branding</option>
                          <option value="Website Development" className="bg-[#111]">Website Development</option>
                          <option value="Bots / Automation" className="bg-[#111]">Bots / Automation</option>
                        </optgroup>
                        <option value="Other" className="bg-[#111]">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-white/70 mb-2 block">Budget (Optional)</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-transparent border-b border-border-light py-3 text-white text-lg focus:border-accent outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#111]">Select budget</option>
                        {budgetOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#111]">{opt}</option>
                        ))}
                      </select>
                    </div>
                  </motion.div>

                  {/* Message */}
                  <motion.div variants={fadeInUp}>
                    <label className="text-sm text-white/70 mb-2 block">Message</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-b border-border-light py-3 text-white text-lg focus:border-accent outline-none transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </motion.div>

                  {error && (
                    <p className="text-[#d42b2b] text-sm">{error}</p>
                  )}

                  {/* Submit */}
                  <motion.div variants={fadeInUp}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary text-base px-10 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message →'}
                    </button>
                  </motion.div>
                </form>
              )}
            </motion.div>

            {/* Sidebar — 2 cols */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="lg:col-span-2 space-y-10"
            >
              {/* WhatsApp */}
              <motion.div variants={fadeInUp} className="p-6 border border-border rounded-xl hover:border-accent/30 transition-colors">
                <h3 className="text-sm uppercase tracking-widest text-white/70 mb-3 font-bold">WhatsApp</h3>
                <a
                  href="https://wa.me/919876543210?text=Hi%20Nickwal%20Studios!%20I%20have%20a%20project%20to%20discuss."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-2xl font-bold text-[#25D366] hover:text-white transition-colors font-[family-name:var(--font-heading)]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  +91 98765 43210
                </a>
                <p className="text-white text-sm font-bold mt-3">⚡ Fastest response</p>
              </motion.div>

              {/* Phone */}
              <motion.div variants={fadeInUp}>
                <h3 className="text-xs uppercase tracking-widest text-text-dim mb-2">Call</h3>
                <a href="tel:+919876543210" className="text-lg text-white hover:text-accent transition-colors">
                  +91 98765 43210
                </a>
              </motion.div>

              {/* Email */}
              <motion.div variants={fadeInUp}>
                <h3 className="text-xs uppercase tracking-widest text-text-dim mb-2">Email</h3>
                <a href="mailto:hello@nickwalstudios.com" className="text-lg text-white hover:text-accent transition-colors">
                  hello@nickwalstudios.com
                </a>
              </motion.div>

              {/* Location */}
              <motion.div variants={fadeInUp}>
                <h3 className="text-xs uppercase tracking-widest text-text-dim mb-2">Location</h3>
                <p className="text-lg text-text-muted">India</p>
              </motion.div>

              {/* Social */}
              <motion.div variants={fadeInUp}>
                <h3 className="text-xs uppercase tracking-widest text-text-dim mb-3">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="https://instagram.com/nickwalstudios" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors text-sm">Instagram</a>
                  <a href="https://youtube.com/@nickwalstudios" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors text-sm">YouTube</a>
                  <a href="https://linkedin.com/company/nickwalstudios" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors text-sm">LinkedIn</a>
                </div>
              </motion.div>

              {/* Services Quick List */}
              <motion.div variants={fadeInUp} className="pt-6 border-t border-border">
                <h3 className="text-xs uppercase tracking-widest text-text-dim mb-4">Our Services</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-[#d42b2b] text-xs font-bold tracking-wider mb-1">CREATE</p>
                    <p className="text-text-muted text-sm">Logo / Intro Outro • AD Films • Reels • Motion Graphics</p>
                  </div>
                  <div>
                    <p className="text-[#d42b2b] text-xs font-bold tracking-wider mb-1">SHOOTS</p>
                    <p className="text-text-muted text-sm">Product • Pre-Wedding • Bridal</p>
                  </div>
                  <div>
                    <p className="text-[#d42b2b] text-xs font-bold tracking-wider mb-1">DESIGN</p>
                    <p className="text-text-muted text-sm">Branding • Web • Bots</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}
