'use client'

import { useEffect, useState } from 'react'
import { useToast } from '@/components/Providers'

export default function SettingsPage() {
  const { showToast } = useToast()
  const [settings, setSettings] = useState({
    siteName: '',
    tagline: '',
    subtitle: '',
    introText: '',
    whatsappNumber: '',
    phone: '',
    email: '',
    location: '',
    instagramUrl: '',
    facebookUrl: '',
    youtubeUrl: '',
    linkedinUrl: '',
    googleMapsUrl: '',
    metaDesc: '',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data) setSettings(data)
        setLoading(false)
      })
  }, [])

  const handleSave = async () => {
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    })
    if (res.ok) {
      showToast('Settings saved successfully')
    } else {
      showToast('Failed to save settings', 'error')
    }
  }

  if (loading) return <p className="text-text-dim">Loading...</p>

  const fields = [
    { key: 'siteName', label: 'Site Name', textarea: false },
    { key: 'tagline', label: 'Tagline', textarea: false },
    { key: 'subtitle', label: 'Subtitle', textarea: false },
    { key: 'introText', label: 'Intro Text', textarea: true },
    { key: 'whatsappNumber', label: 'WhatsApp Number', textarea: false },
    { key: 'phone', label: 'Phone', textarea: false },
    { key: 'email', label: 'Email', textarea: false },
    { key: 'location', label: 'Location', textarea: false },
    { key: 'instagramUrl', label: 'Instagram URL', textarea: false },
    { key: 'facebookUrl', label: 'Facebook URL', textarea: false },
    { key: 'youtubeUrl', label: 'YouTube URL', textarea: false },
    { key: 'linkedinUrl', label: 'LinkedIn URL', textarea: false },
    { key: 'googleMapsUrl', label: 'Google Maps URL', textarea: false },
    { key: 'metaDesc', label: 'Meta Description', textarea: true },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">Site Settings</h1>
        <button onClick={handleSave} className="btn-primary !py-2.5 !px-6 !text-xs">
          Save Changes
        </button>
      </div>

      <div className="space-y-6 max-w-2xl">
        {fields.map(({ key, label, textarea }) => (
          <div key={key}>
            <label className="text-xs uppercase tracking-wider text-text-dim mb-2 block">
              {label}
            </label>
            {textarea ? (
              <textarea
                rows={3}
                value={(settings as Record<string, string>)[key] || ''}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                className="w-full bg-bg-card border border-border px-4 py-3 text-text rounded-sm focus:border-accent transition-colors resize-none"
              />
            ) : (
              <input
                type="text"
                value={(settings as Record<string, string>)[key] || ''}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                className="w-full bg-bg-card border border-border px-4 py-3 text-text rounded-sm focus:border-accent transition-colors"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
