'use client'

import AdminGuard from '@/components/admin/AdminGuard'
import Sidebar from '@/components/admin/Sidebar'

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-64 admin-content">
          <div className="p-8">{children}</div>
        </div>
      </div>
    </AdminGuard>
  )
}
