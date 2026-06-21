'use client'

import { useEffect, useState } from 'react'
import { useToast } from '@/components/Providers'

interface BackupLog {
  id: string
  filename: string
  size: number | null
  createdAt: string
}

export default function BackupPage() {
  const { showToast } = useToast()
  const [logs, setLogs] = useState<BackupLog[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  const loadData = async () => {
    const res = await fetch('/api/admin/backup')
    const data = await res.json()
    if (data.logs) setLogs(data.logs)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const createBackup = async () => {
    setCreating(true)
    const res = await fetch('/api/admin/backup', { method: 'POST' })
    if (res.ok) {
      const data = await res.json()
      showToast(`Backup created: ${data.filename}`)
      loadData()
    } else {
      showToast('Backup failed', 'error')
    }
    setCreating(false)
  }

  if (loading) return <p className="text-text-dim">Loading...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">Backup</h1>
        <button onClick={createBackup} disabled={creating} className="btn-primary !py-2.5 !px-6 !text-xs disabled:opacity-50">
          {creating ? 'Creating...' : 'Create Backup'}
        </button>
      </div>

      <div className="bg-bg-card border border-border p-6 rounded-sm mb-8">
        <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4">Backup History</h2>
        {logs.length === 0 ? (
          <p className="text-text-dim text-sm">No backups yet. Create your first backup above.</p>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center justify-between py-3 border-b border-border/50">
                <div>
                  <p className="text-sm font-medium">{log.filename}</p>
                  <p className="text-xs text-text-dim">{new Date(log.createdAt).toLocaleString()}</p>
                </div>
                <span className="text-xs text-text-dim">
                  {log.size ? `${(log.size / 1024).toFixed(1)} KB` : '—'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
