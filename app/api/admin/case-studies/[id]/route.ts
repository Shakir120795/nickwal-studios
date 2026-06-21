import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const item = await prisma.caseStudy.update({
      where: { id },
      data: body,
    })
    return NextResponse.json(item)
  } catch (error) {
    console.error('CaseStudy PUT error:', error)
    return NextResponse.json({ error: 'Failed to update case study' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.caseStudy.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('CaseStudy DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete case study' }, { status: 500 })
  }
}
