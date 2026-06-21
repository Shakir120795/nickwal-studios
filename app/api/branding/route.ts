import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Public API - no auth needed - for Header/Footer logo
export async function GET() {
  try {
    const branding = await prisma.brandingSettings.findUnique({ where: { id: 'default' } })
    return NextResponse.json(branding || {})
  } catch {
    return NextResponse.json({})
  }
}
