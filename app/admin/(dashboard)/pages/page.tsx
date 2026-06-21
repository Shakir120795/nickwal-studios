'use client'

import { useEffect, useState } from 'react'
import { useToast } from '@/components/Providers'

interface PageContent {
  id: string
  slug: string
  title: string
  content: string
}

export default function PagesPage() {
  const { showToast } = useToast()
  const [pages, setPages] = useState<PageContent[]>([])
  const [editing, setEditing] = useState<PageContent | null>(null)
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    const res = await fetch('/api/admin/pages')
    const data = await res.json()
    if (Array.isArray(data)) setPages(data)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const handleSave = async () => {
    if (!editing) return
    const res = await fetch('/api/admin/pages', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    })
    if (res.ok) {
      showToast('Page saved')
      setEditing(null)
      loadData()
    } else {
      showToast('Failed to save', 'error')
    }
  }

  if (loading) return <p className="text-text-dim">Loading...</p>

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">Pages</h1>
        <p className="text-text-dim text-sm mt-1">Manage static pages content</p>
      </div>

      <div className="space-y-4">
        {pages.map((page) => (
          <div key={page.id} className="bg-bg-card border border-border p-6 rounded-sm flex items-center justify-between">
            <div>
              <h3 className="font-medium">{page.title}</h3>
              <p className="text-xs text-text-dim">/{page.slug}</p>
            </div>
            <button onClick={() => setEditing(page)} className="text-accent text-sm hover:underline">
              Edit
            </button>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-bg/90 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-bg-card border border-border p-8 rounded-sm w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6 font-[family-name:var(--font-heading)]">
              Edit: {editing.title}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-text-dim mb-1 block">Title</label>
                <input type="text" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full bg-bg border border-border px-3 py-2 text-text rounded-sm text-sm" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-text-dim mb-1 block">Content (HTML)</label>
                <textarea rows={15} value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="w-full bg-bg border border-border px-3 py-2 text-text rounded-sm text-sm font-mono resize-none" />
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
