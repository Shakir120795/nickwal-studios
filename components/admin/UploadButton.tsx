'use client'

import { useRef, useState } from 'react'

interface UploadButtonProps {
  onUpload: (url: string) => void
  accept?: string
  label?: string
}

export default function UploadButton({ onUpload, accept = 'image/*,video/*', label = 'Upload from PC' }: UploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url) {
        onUpload(data.url)
      }
    } catch {
      // silent fail
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFile}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="px-4 py-2 border border-accent/50 text-accent text-sm rounded hover:bg-accent/10 transition-colors disabled:opacity-50"
      >
        {uploading ? '⏳ Uploading...' : `📁 ${label}`}
      </button>
    </>
  )
}
