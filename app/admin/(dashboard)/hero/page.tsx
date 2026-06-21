'use client'

import { useEffect, useState } from 'react'
import { useToast } from '@/components/Providers'
import UploadButton from '@/components/admin/UploadButton'

interface HeroSlide {
  id: string
  videoUrl: string
  posterUrl: string | null
  title: string
  subtitle: string
  ctaText1: string
  ctaLink1: string
  ctaText2: string
  ctaLink2: string
  sortOrder: number
  isActive: boolean
}

export default function HeroPage() {
  const { showToast } = useToast()
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [editing, setEditing] = useState<HeroSlide | null>(null)
  const [loading, setLoading] = useState(true)

  const loadSlides = async () => {
    const res = await fetch('/api/admin/hero')
    const data = await res.json()
    if (Array.isArray(data)) setSlides(data)
    setLoading(false)
  }

  useEffect(() => { loadSlides() }, [])

  const handleSave = async () => {
    if (!editing) return
    const method = editing.id ? 'PUT' : 'POST'
    const url = editing.id ? `/api/admin/hero/${editing.id}` : '/api/admin/hero'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    })
    if (res.ok) {
      showToast('Slide saved')
      setEditing(null)
      loadSlides()
    } else {
      showToast('Failed to save', 'error')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this slide?')) return
    const res = await fetch(`/api/admin/hero/${id}`, { method: 'DELETE' })
    if (res.ok) {
      showToast('Slide deleted')
      loadSlides()
    }
  }

  if (loading) return <p className="text-text-dim">Loading...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">Hero Slides</h1>
        <button
          onClick={() =>
            setEditing({
              id: '',
              videoUrl: '',
              posterUrl: '',
              title: '',
              subtitle: '',
              ctaText1: 'View Work',
              ctaLink1: '/work',
              ctaText2: 'Book Now',
              ctaLink2: '/contact',
              sortOrder: slides.length,
              isActive: true,
            })
          }
          className="btn-primary !py-2.5 !px-6 !text-xs"
        >
          Add Slide
        </button>
      </div>

      {/* Slides List */}
      <div className="space-y-4 mb-8">
        {slides.map((slide) => (
          <div key={slide.id} className="flex items-center gap-4 bg-bg-card border border-border p-4 rounded-sm">
            <div className="w-24 h-14 bg-bg-elevated flex items-center justify-center text-text-dim text-xs">
              {slide.posterUrl ? (
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${slide.posterUrl})` }} />
              ) : '▶'}
            </div>
            <div className="flex-1">
              <p className="font-medium">{slide.title}</p>
              <p className="text-sm text-text-dim">{slide.subtitle}</p>
            </div>
            <span className={`text-xs px-2 py-1 ${slide.isActive ? 'text-green-400' : 'text-text-dim'}`}>
              {slide.isActive ? 'Active' : 'Inactive'}
            </span>
            <button onClick={() => setEditing(slide)} className="text-accent text-sm hover:underline">Edit</button>
            <button onClick={() => handleDelete(slide.id)} className="text-red text-sm hover:underline">Delete</button>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-bg/90 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-bg-card border border-border p-8 rounded-sm w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6 font-[family-name:var(--font-heading)]">
              {editing.id ? 'Edit Slide' : 'New Slide'}
            </h2>
            <div className="space-y-4">
              {/* Video URL with upload */}
              <div>
                <label className="text-xs uppercase tracking-wider text-text-dim mb-1 block">Video URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editing.videoUrl}
                    onChange={(e) => setEditing({ ...editing, videoUrl: e.target.value })}
                    className="flex-1 bg-bg border border-border px-3 py-2 text-text rounded-sm text-sm"
                    placeholder="Paste URL or upload"
                  />
                  <UploadButton
                    accept="video/*"
                    label="Upload Video"
                    onUpload={(url) => setEditing({ ...editing, videoUrl: url })}
                  />
                </div>
              </div>
              {/* Poster URL with upload */}
              <div>
                <label className="text-xs uppercase tracking-wider text-text-dim mb-1 block">Poster Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editing.posterUrl || ''}
                    onChange={(e) => setEditing({ ...editing, posterUrl: e.target.value })}
                    className="flex-1 bg-bg border border-border px-3 py-2 text-text rounded-sm text-sm"
                    placeholder="Paste URL or upload"
                  />
                  <UploadButton
                    accept="image/*"
                    label="Upload Image"
                    onUpload={(url) => setEditing({ ...editing, posterUrl: url })}
                  />
                </div>
              </div>
              {/* Other fields */}
              {(['title', 'subtitle', 'ctaText1', 'ctaLink1', 'ctaText2', 'ctaLink2'] as const).map((field) => (
                <div key={field}>
                  <label className="text-xs uppercase tracking-wider text-text-dim mb-1 block">{field}</label>
                  <input
                    type="text"
                    value={(editing as unknown as Record<string, string | number | boolean | null>)[field]?.toString() || ''}
                    onChange={(e) => setEditing({ ...editing, [field]: e.target.value })}
                    className="w-full bg-bg border border-border px-3 py-2 text-text rounded-sm text-sm"
                  />
                </div>
              ))}
              <div className="flex items-center gap-4">
                <label className="text-xs uppercase tracking-wider text-text-dim">Sort Order</label>
                <input
                  type="number"
                  value={editing.sortOrder}
                  onChange={(e) => setEditing({ ...editing, sortOrder: parseInt(e.target.value) || 0 })}
                  className="w-20 bg-bg border border-border px-3 py-2 text-text rounded-sm text-sm"
                />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editing.isActive}
                    onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })}
                    className="accent-accent"
                  />
                  <span className="text-sm">Active</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={handleSave} className="btn-primary !py-2.5 !px-6 !text-xs">Save</button>
              <button onClick={() => setEditing(null)} className="btn-outline !py-2.5 !px-6 !text-xs">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
