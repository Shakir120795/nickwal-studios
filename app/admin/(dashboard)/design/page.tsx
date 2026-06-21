'use client'

import { useEffect, useState } from 'react'
import { useToast } from '@/components/Providers'

export default function DesignPage() {
  const { showToast } = useToast()
  const [design, setDesign] = useState({
    fontFamily: '',
    headingFont: '',
    bodyFont: '',
    accentColor: '',
    textColor: '',
    bgColor: '',
    buttonColor: '',
    buttonTextColor: '',
    headerStyle: '',
    borderRadius: '',
    containerWidth: '',
    sectionMarginY: '',
    sectionPaddingX: '',
    heroOverlay: '',
    heroHeight: '',
    heroTextPosition: '',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/design')
      .then((res) => res.json())
      .then((data) => {
        if (data) setDesign(data)
        setLoading(false)
      })
  }, [])

  const handleSave = async () => {
    const res = await fetch('/api/admin/design', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(design),
    })
    if (res.ok) {
      showToast('Design settings saved')
    } else {
      showToast('Failed to save', 'error')
    }
  }

  if (loading) return <p className="text-text-dim">Loading...</p>

  const fields = [
    { key: 'fontFamily', label: 'Font Family', type: 'text' as const },
    { key: 'headingFont', label: 'Heading Font', type: 'text' as const },
    { key: 'bodyFont', label: 'Body Font', type: 'text' as const },
    { key: 'accentColor', label: 'Accent Color', type: 'color' as const },
    { key: 'textColor', label: 'Text Color', type: 'color' as const },
    { key: 'bgColor', label: 'Background Color', type: 'color' as const },
    { key: 'buttonColor', label: 'Button Color', type: 'color' as const },
    { key: 'buttonTextColor', label: 'Button Text Color', type: 'color' as const },
    { key: 'headerStyle', label: 'Header Style', type: 'text' as const },
    { key: 'borderRadius', label: 'Border Radius (px)', type: 'text' as const },
    { key: 'containerWidth', label: 'Container Width (px)', type: 'text' as const },
    { key: 'sectionMarginY', label: 'Section Margin Y (px)', type: 'text' as const },
    { key: 'sectionPaddingX', label: 'Section Padding X (px)', type: 'text' as const },
    { key: 'heroOverlay', label: 'Hero Overlay Opacity', type: 'text' as const },
    { key: 'heroHeight', label: 'Hero Height', type: 'text' as const },
    { key: 'heroTextPosition', label: 'Hero Text Position', type: 'text' as const },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">Design Settings</h1>
        <button onClick={handleSave} className="btn-primary !py-2.5 !px-6 !text-xs">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {fields.map(({ key, label, type }) => (
          <div key={key}>
            <label className="text-xs uppercase tracking-wider text-text-dim mb-2 block">
              {label}
            </label>
            <div className="flex gap-2">
              <input
                type={type === 'color' ? 'text' : 'text'}
                value={(design as Record<string, string>)[key] || ''}
                onChange={(e) => setDesign({ ...design, [key]: e.target.value })}
                className="w-full bg-bg-card border border-border px-4 py-3 text-text rounded-sm focus:border-accent transition-colors"
              />
              {type === 'color' && (
                <input
                  type="color"
                  value={(design as Record<string, string>)[key] || '#000000'}
                  onChange={(e) => setDesign({ ...design, [key]: e.target.value })}
                  className="w-12 h-12 cursor-pointer border border-border rounded-sm"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
