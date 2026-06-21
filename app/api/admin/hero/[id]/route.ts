import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const slide = await prisma.heroSlide.update({
      where: { id },
      data: body,
    })
    return NextResponse.json(slide)
  } catch (error) {
    console.error('Hero PUT error:', error)
    return NextResponse.json({ error: 'Failed to update slide' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.heroSlide.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Hero DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete slide' }, { status: 500 })
  }
}
