import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const design = await prisma.designSettings.findUnique({ where: { id: 'default' } })
    return NextResponse.json(design)
  } catch (error) {
    console.error('Design GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch design settings' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const design = await prisma.designSettings.upsert({
      where: { id: 'default' },
      update: body,
      create: { id: 'default', ...body },
    })
    return NextResponse.json(design)
  } catch (error) {
    console.error('Design PUT error:', error)
    return NextResponse.json({ error: 'Failed to update design settings' }, { status: 500 })
  }
}
