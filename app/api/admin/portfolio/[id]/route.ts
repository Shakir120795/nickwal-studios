import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const item = await prisma.portfolioItem.update({
      where: { id },
      data: body,
    })
    return NextResponse.json(item)
  } catch (error) {
    console.error('Portfolio PUT error:', error)
    return NextResponse.json({ error: 'Failed to update portfolio item' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.portfolioItem.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Portfolio DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete portfolio item' }, { status: 500 })
  }
}
