'use client'

import { useEffect, useState } from 'react'
import { useToast } from '@/components/Providers'
import UploadButton from '@/components/admin/UploadButton'

interface PortfolioItem {
  id: string
  title: string
  category: string
  mediaType: string
  mediaUrl: string
  externalUrl: string | null
  thumbnailUrl: string | null
  description: string | null
  isFeatured: boolean
  sortOrder: number
  isActive: boolean
}

const emptyItem: PortfolioItem = {
  id: '',
  title: '',
  category: 'create',
  mediaType: 'image',
  mediaUrl: '',
  externalUrl: '',
  thumbnailUrl: '',
  description: '',
  isFeatured: false,
  sortOrder: 0,
  isActive: true,
}

export default function PortfolioPage() {
  const { showToast } = useToast()
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [editing, setEditing] = useState<PortfolioItem | null>(null)
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    const res = await fetch('/api/admin/portfolio')
    const data = await res.json()
    if (Array.isArray(data)) setItems(data)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const handleSave = async () => {
    if (!editing) return
    const method = editing.id ? 'PUT' : 'POST'
    const url = editing.id ? `/api/admin/portfolio/${editing.id}` : '/api/admin/portfolio'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    })
    if (res.ok) {
      showToast('Portfolio item saved')
      setEditing(null)
      loadData()
    } else {
      showToast('Failed to save', 'error')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return
    const res = await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' })
    if (res.ok) {
      showToast('Item deleted')
      loadData()
    }
  }

  if (loading) return <p className="text-text-dim">Loading...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">Portfolio</h1>
        <button onClick={() => setEditing({ ...emptyItem, sortOrder: items.length })} className="btn-primary !py-2.5 !px-6 !text-xs">
          Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-bg-card border border-border rounded-sm overflow-hidden group">
            <div className="aspect-video bg-bg-elevated relative">
              {item.thumbnailUrl && (
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${item.thumbnailUrl})` }} />
              )}
              {!item.isActive && (
                <div className="absolute top-2 right-2 bg-red/80 text-white text-[10px] px-2 py-0.5">INACTIVE</div>
              )}
            </div>
            <div className="p-4">
              <p className="font-medium text-sm mb-1">{item.title}</p>
              <p className="text-xs text-text-dim mb-3">{item.category} • {item.mediaType}</p>
              <div className="flex gap-2">
                <button onClick={() => setEditing(item)} className="text-accent text-xs hover:underline">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-red text-xs hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-bg/90 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-bg-card border border-border p-8 rounded-sm w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6 font-[family-name:var(--font-heading)]">
              {editing.id ? 'Edit Item' : 'New Item'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-text-dim mb-1 block">Title</label>
                <input type="text" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full bg-bg border border-border px-3 py-2 text-text rounded-sm text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-text-dim mb-1 block">Category</label>
                  <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full bg-bg border border-border px-3 py-2 text-text rounded-sm text-sm">
                    <option value="create">Create</option>
                    <option value="shoots">Shoots</option>
                    <option value="design">Design</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-text-dim mb-1 block">Media Type</label>
                  <select value={editing.mediaType} onChange={(e) => setEditing({ ...editing, mediaType: e.target.value })} className="w-full bg-bg border border-border px-3 py-2 text-text rounded-sm text-sm">
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-text-dim mb-1 block">Media URL</label>
                <div className="flex gap-2">
                  <input type="text" value={editing.mediaUrl} onChange={(e) => setEditing({ ...editing, mediaUrl: e.target.value })} className="flex-1 bg-bg border border-border px-3 py-2 text-text rounded-sm text-sm" placeholder="Paste URL or upload" />
                  <UploadButton accept="image/*,video/*" label="Upload" onUpload={(url) => setEditing({ ...editing, mediaUrl: url })} />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-text-dim mb-1 block">Thumbnail URL</label>
                <div className="flex gap-2">
                  <input type="text" value={editing.thumbnailUrl || ''} onChange={(e) => setEditing({ ...editing, thumbnailUrl: e.target.value })} className="flex-1 bg-bg border border-border px-3 py-2 text-text rounded-sm text-sm" placeholder="Paste URL or upload" />
                  <UploadButton accept="image/*" label="Upload" onUpload={(url) => setEditing({ ...editing, thumbnailUrl: url })} />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-text-dim mb-1 block">Description</label>
                <textarea rows={3} value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full bg-bg border border-border px-3 py-2 text-text rounded-sm text-sm resize-none" />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editing.isFeatured} onChange={(e) => setEditing({ ...editing, isFeatured: e.target.checked })} className="accent-accent" />
                  <span className="text-sm">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editing.isActive} onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })} className="accent-accent" />
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
