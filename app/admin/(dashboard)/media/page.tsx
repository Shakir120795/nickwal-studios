'use client'

import { useEffect, useState } from 'react'
import { useToast } from '@/components/Providers'

interface MediaFile {
  name: string
  url: string
  size: number
  modified: string
}

export default function MediaPage() {
  const { showToast } = useToast()
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  const loadData = async () => {
    const res = await fetch('/api/admin/media')
    const data = await res.json()
    if (data.files) setFiles(data.files)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    if (res.ok) {
      showToast('File uploaded')
      loadData()
    } else {
      showToast('Upload failed', 'error')
    }
    setUploading(false)
  }

  const handleDelete = async (filename: string) => {
    if (!confirm(`Delete ${filename}?`)) return
    const res = await fetch('/api/admin/media', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename }),
    })
    if (res.ok) {
      showToast('File deleted')
      loadData()
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  if (loading) return <p className="text-text-dim">Loading...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">Media Library</h1>
        <label className="btn-primary !py-2.5 !px-6 !text-xs cursor-pointer">
          {uploading ? 'Uploading...' : 'Upload File'}
          <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {files.length === 0 ? (
        <p className="text-text-dim">No files uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {files.map((file) => (
            <div key={file.name} className="bg-bg-card border border-border rounded-sm overflow-hidden group">
              <div className="aspect-square bg-bg-elevated relative flex items-center justify-center">
                {file.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ? (
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${file.url})` }} />
                ) : (
                  <span className="text-text-dim text-xs">{file.name.split('.').pop()?.toUpperCase()}</span>
                )}
              </div>
              <div className="p-2">
                <p className="text-xs truncate" title={file.name}>{file.name}</p>
                <p className="text-[10px] text-text-dim">{formatSize(file.size)}</p>
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => { navigator.clipboard.writeText(file.url); showToast('URL copied') }}
                    className="text-accent text-[10px] hover:underline"
                  >Copy URL</button>
                  <button onClick={() => handleDelete(file.name)} className="text-red text-[10px] hover:underline">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
