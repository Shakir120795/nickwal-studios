'use client'

import { useEffect, useState } from 'react'
import { useToast } from '@/components/Providers'

export default function BrandingPage() {
  const { showToast } = useToast()
  const [branding, setBranding] = useState({
    headerLogoUrl: '',
    footerLogoUrl: '',
    faviconUrl: '',
    adminLogoUrl: '',
    showreelUrl: '',
    introVideoUrl: '',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/branding')
      .then((res) => res.json())
      .then((data) => {
        if (data) setBranding(data)
        setLoading(false)
      })
  }, [])

  const handleSave = async () => {
    const res = await fetch('/api/admin/branding', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(branding),
    })
    if (res.ok) {
      showToast('Branding settings saved')
    } else {
      showToast('Failed to save', 'error')
    }
  }

  const handleUpload = async (field: string) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*,video/*'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      if (res.ok) {
        const { url } = await res.json()
        setBranding({ ...branding, [field]: url })
        showToast('File uploaded')
      }
    }
    input.click()
  }

  if (loading) return <p className="text-text-dim">Loading...</p>

  const fields = [
    { key: 'headerLogoUrl', label: 'Header Logo URL' },
    { key: 'footerLogoUrl', label: 'Footer Logo URL' },
    { key: 'faviconUrl', label: 'Favicon URL' },
    { key: 'adminLogoUrl', label: 'Admin Logo URL' },
    { key: 'showreelUrl', label: 'Showreel URL' },
    { key: 'introVideoUrl', label: 'Intro Video URL' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">Branding</h1>
        <button onClick={handleSave} className="btn-primary !py-2.5 !px-6 !text-xs">
          Save Changes
        </button>
      </div>

      <div className="space-y-6 max-w-2xl">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <label className="text-xs uppercase tracking-wider text-text-dim mb-2 block">
              {label}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={(branding as Record<string, string>)[key] || ''}
                onChange={(e) => setBranding({ ...branding, [key]: e.target.value })}
                className="flex-1 bg-bg-card border border-border px-4 py-3 text-text rounded-sm focus:border-accent transition-colors"
                placeholder="URL or upload..."
              />
              <button
                onClick={() => handleUpload(key)}
                className="px-4 py-3 border border-border text-text-muted hover:text-accent hover:border-accent transition-colors text-sm"
              >
                Upload
              </button>
            </div>
            {(branding as Record<string, string>)[key] && (
              <div className="mt-2 p-2 bg-bg-card border border-border inline-block">
                <div
                  className="w-20 h-20 bg-cover bg-center"
                  style={{ backgroundImage: `url(${(branding as Record<string, string>)[key]})` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
