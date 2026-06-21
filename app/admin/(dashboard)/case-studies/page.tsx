'use client'

import { useEffect, useState } from 'react'
import { useToast } from '@/components/Providers'
import UploadButton from '@/components/admin/UploadButton'

interface CaseStudy {
  id: string
  problem: string
  solution: string
  result: string
  imageUrl: string | null
  isFeatured: boolean
  sortOrder: number
  isActive: boolean
}

const emptyItem: CaseStudy = {
  id: '',
  problem: '',
  solution: '',
  result: '',
  imageUrl: '',
  isFeatured: true,
  sortOrder: 0,
  isActive: true,
}

export default function CaseStudiesPage() {
  const { showToast } = useToast()
  const [items, setItems] = useState<CaseStudy[]>([])
  const [editing, setEditing] = useState<CaseStudy | null>(null)
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    const res = await fetch('/api/admin/case-studies')
    const data = await res.json()
    if (Array.isArray(data)) setItems(data)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const handleSave = async () => {
    if (!editing) return
    const method = editing.id ? 'PUT' : 'POST'
    const url = editing.id ? `/api/admin/case-studies/${editing.id}` : '/api/admin/case-studies'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    })
    if (res.ok) {
      showToast('Case study saved')
      setEditing(null)
      loadData()
    } else {
      showToast('Failed to save', 'error')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this case study?')) return
    const res = await fetch(`/api/admin/case-studies/${id}`, { method: 'DELETE' })
    if (res.ok) {
      showToast('Case study deleted')
      loadData()
    }
  }

  if (loading) return <p className="text-text-dim">Loading...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">Case Studies</h1>
        <button onClick={() => setEditing({ ...emptyItem, sortOrder: items.length })} className="btn-primary !py-2.5 !px-6 !text-xs">
          Add Case Study
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-bg-card border border-border p-6 rounded-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm text-text-dim mb-1">Problem:</p>
                <p className="text-sm mb-3">{item.problem.slice(0, 100)}...</p>
                <p className="text-sm text-accent">{item.result.slice(0, 80)}...</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button onClick={() => setEditing(item)} className="text-accent text-sm hover:underline">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-red text-sm hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-bg/90 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-bg-card border border-border p-8 rounded-sm w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6 font-[family-name:var(--font-heading)]">
              {editing.id ? 'Edit Case Study' : 'New Case Study'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-text-dim mb-1 block">Problem</label>
                <textarea rows={3} value={editing.problem} onChange={(e) => setEditing({ ...editing, problem: e.target.value })} className="w-full bg-bg border border-border px-3 py-2 text-text rounded-sm text-sm resize-none" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-text-dim mb-1 block">Solution</label>
                <textarea rows={3} value={editing.solution} onChange={(e) => setEditing({ ...editing, solution: e.target.value })} className="w-full bg-bg border border-border px-3 py-2 text-text rounded-sm text-sm resize-none" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-text-dim mb-1 block">Result</label>
                <textarea rows={2} value={editing.result} onChange={(e) => setEditing({ ...editing, result: e.target.value })} className="w-full bg-bg border border-border px-3 py-2 text-text rounded-sm text-sm resize-none" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-text-dim mb-1 block">Image URL</label>
                <div className="flex gap-2">
                  <input type="text" value={editing.imageUrl || ''} onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })} className="flex-1 bg-bg border border-border px-3 py-2 text-text rounded-sm text-sm" placeholder="Paste URL or upload" />
                  <UploadButton accept="image/*" label="Upload" onUpload={(url) => setEditing({ ...editing, imageUrl: url })} />
                </div>
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
