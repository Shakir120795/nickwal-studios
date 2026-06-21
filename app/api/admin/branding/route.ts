import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const branding = await prisma.brandingSettings.findUnique({ where: { id: 'default' } })
    return NextResponse.json(branding)
  } catch (error) {
    console.error('Branding GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch branding settings' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const branding = await prisma.brandingSettings.upsert({
      where: { id: 'default' },
      update: body,
      create: { id: 'default', ...body },
    })
    return NextResponse.json(branding)
  } catch (error) {
    console.error('Branding PUT error:', error)
    return NextResponse.json({ error: 'Failed to update branding settings' }, { status: 500 })
  }
}
