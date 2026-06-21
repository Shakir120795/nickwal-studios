'use client'

import { useEffect, useState } from 'react'
import { useToast } from '@/components/Providers'

interface Lead {
  id: string
  name: string
  phone: string
  email: string
  service: string | null
  budget: string | null
  message: string | null
  status: string
  createdAt: string
}

export default function LeadsPage() {
  const { showToast } = useToast()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    const res = await fetch('/api/admin/leads')
    const data = await res.json()
    if (Array.isArray(data)) setLeads(data)
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (res.ok) {
      showToast('Status updated')
      loadData()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this lead?')) return
    const res = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' })
    if (res.ok) {
      showToast('Lead deleted')
      loadData()
    }
  }

  if (loading) return <p className="text-text-dim">Loading...</p>

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">Leads</h1>
        <p className="text-text-dim text-sm mt-1">{leads.length} total leads</p>
      </div>

      {leads.length === 0 ? (
        <p className="text-text-dim">No leads yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-text-dim border-b border-border">
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">Contact</th>
                <th className="pb-3 pr-4">Service</th>
                <th className="pb-3 pr-4">Budget</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-border/50 hover:bg-white/2">
                  <td className="py-4 pr-4">
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      {lead.message && (
                        <p className="text-xs text-text-dim mt-1 max-w-[200px] truncate">
                          {lead.message}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 pr-4">
                    <p className="text-text-muted">{lead.email}</p>
                    <p className="text-text-dim text-xs">{lead.phone}</p>
                  </td>
                  <td className="py-4 pr-4 text-text-muted">{lead.service || '—'}</td>
                  <td className="py-4 pr-4 text-text-muted">{lead.budget || '—'}</td>
                  <td className="py-4 pr-4">
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className="bg-bg border border-border px-2 py-1 text-xs rounded-sm"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="converted">Converted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td className="py-4 pr-4 text-text-dim text-xs">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4">
                    <button onClick={() => handleDelete(lead.id)} className="text-red text-xs hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
