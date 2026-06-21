'use client'

import { useEffect, useState } from 'react'

interface DashboardStats {
  leads: number
  portfolio: number
  services: number
  caseStudies: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    leads: 0,
    portfolio: 0,
    services: 0,
    caseStudies: 0,
  })
  const [recentLeads, setRecentLeads] = useState<Array<{ id: string; name: string; email: string; service: string | null; status: string; createdAt: string }>>([])

  useEffect(() => {
    async function loadData() {
      const [leadsRes, portfolioRes, servicesRes, caseStudiesRes] = await Promise.all([
        fetch('/api/admin/leads'),
        fetch('/api/admin/portfolio'),
        fetch('/api/admin/services'),
        fetch('/api/admin/case-studies'),
      ])

      const leads = await leadsRes.json()
      const portfolio = await portfolioRes.json()
      const services = await servicesRes.json()
      const caseStudies = await caseStudiesRes.json()

      setStats({
        leads: Array.isArray(leads) ? leads.length : 0,
        portfolio: Array.isArray(portfolio) ? portfolio.length : 0,
        services: Array.isArray(services) ? services.length : 0,
        caseStudies: Array.isArray(caseStudies) ? caseStudies.length : 0,
      })

      if (Array.isArray(leads)) {
        setRecentLeads(leads.slice(0, 5))
      }
    }
    loadData()
  }, [])

  const statCards = [
    { label: 'Total Leads', value: stats.leads, color: 'text-green-400' },
    { label: 'Portfolio Items', value: stats.portfolio, color: 'text-accent' },
    { label: 'Service Categories', value: stats.services, color: 'text-blue-400' },
    { label: 'Case Studies', value: stats.caseStudies, color: 'text-purple-400' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)]">Dashboard</h1>
        <p className="text-text-dim text-sm mt-1">Welcome back to Nickwal Studios admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-bg-card border border-border p-6 rounded-sm">
            <p className="text-text-dim text-xs uppercase tracking-wider mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold font-[family-name:var(--font-heading)] ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="bg-bg-card border border-border p-6 rounded-sm">
        <h2 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-4">
          Recent Leads
        </h2>
        {recentLeads.length === 0 ? (
          <p className="text-text-dim text-sm">No leads yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-text-dim border-b border-border">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Email</th>
                  <th className="pb-3 pr-4">Service</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-border/50">
                    <td className="py-3 pr-4">{lead.name}</td>
                    <td className="py-3 pr-4 text-text-muted">{lead.email}</td>
                    <td className="py-3 pr-4 text-text-muted">{lead.service || '—'}</td>
                    <td className="py-3 pr-4">
                      <span className={`text-xs px-2 py-1 rounded-sm ${
                        lead.status === 'new' ? 'bg-green-500/10 text-green-400' :
                        lead.status === 'contacted' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-gray-500/10 text-gray-400'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 text-text-dim">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
