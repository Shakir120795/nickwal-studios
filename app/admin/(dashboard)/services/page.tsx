'use client'

import { useEffect, useState } from 'react'
import { useToast } from '@/components/Providers'
import UploadButton from '@/components/admin/UploadButton'

interface ServiceItem {
  id?: string
  name: string
  sortOrder: number
}

interface ServiceCategory {
  id: string
  name: string
  slug: string
  description: string | null
  imageUrl: string | null
  videoUrl: string | null
  sortOrder: number
  isActive: boolean
  items: ServiceItem[]
}

export default function ServicesPage() {
  const { showToast } = useToast()
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [editing, setEditing] = useState<ServiceCategory | null>(null)
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    const res = await fetch('/api/admin/services')
    const data = await res.json()
    if (Array.isArray(data)) setCategories(data)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const handleSave = async () => {
    if (!editing) return
    const method = editing.id ? 'PUT' : 'POST'
    const url = editing.id ? `/api/admin/services/${editing.id}` : '/api/admin/services'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    })
    if (res.ok) {
      showToast('Service saved')
      setEditing(null)
      loadData()
    } else {
      showToast('Failed to save', 'error')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service category and all its items?')) return
    const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' })
    if (res.ok) {
      showToast('Service deleted')
      loadData()
    }
  }

  if (loading) return <p className="text-text-dim">Loading...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">Services</h1>
        <button
          onClick={() => setEditing({
            id: '',
            name: '',
            slug: '',
            description: '',
            imageUrl: '',
            videoUrl: '',
            sortOrder: categories.length,
            isActive: true,
            items: [],
          })}
          className="btn-primary !py-2.5 !px-6 !text-xs"
        >
          Add Category
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-bg-card border border-border p-6 rounded-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold font-[family-name:var(--font-heading)]">{cat.name}</h3>
                <p className="text-sm text-text-dim">{cat.description}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setEditing(cat)} className="text-accent text-sm hover:underline">Edit</button>
                <button onClick={() => handleDelete(cat.id)} className="text-red text-sm hover:underline">Delete</button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span key={item.name} className="text-xs bg-bg px-3 py-1 border border-border text-text-muted">
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-bg/90 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-bg-card border border-border p-8 rounded-sm w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6 font-[family-name:var(--font-heading)]">
              {editing.id ? 'Edit Category' : 'New Category'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-text-dim mb-1 block">Name</label>
                <input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full bg-bg border border-border px-3 py-2 text-text rounded-sm text-sm" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-text-dim mb-1 block">Slug</label>
                <input type="text" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="w-full bg-bg border border-border px-3 py-2 text-text rounded-sm text-sm" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-text-dim mb-1 block">Description</label>
                <textarea rows={3} value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full bg-bg border border-border px-3 py-2 text-text rounded-sm text-sm resize-none" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-text-dim mb-1 block">Image URL</label>
                <div className="flex gap-2">
                  <input type="text" value={editing.imageUrl || ''} onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })} className="flex-1 bg-bg border border-border px-3 py-2 text-text rounded-sm text-sm" placeholder="Paste URL or upload" />
                  <UploadButton accept="image/*" label="Upload Image" onUpload={(url) => setEditing({ ...editing, imageUrl: url })} />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-text-dim mb-2 block">
                  Items (one per line)
                </label>
                <textarea
                  rows={6}
                  value={editing.items.map((i) => i.name).join('\n')}
                  onChange={(e) => setEditing({
                    ...editing,
                    items: e.target.value.split('\n').filter(Boolean).map((name, idx) => ({ name, sortOrder: idx })),
                  })}
                  className="w-full bg-bg border border-border px-3 py-2 text-text rounded-sm text-sm resize-none"
                />
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
