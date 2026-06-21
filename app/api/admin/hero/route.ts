import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: { sortOrder: 'asc' },
    })
    return NextResponse.json(slides)
  } catch (error) {
    console.error('Hero GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch slides' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const slide = await prisma.heroSlide.create({ data: body })
    return NextResponse.json(slide, { status: 201 })
  } catch (error) {
    console.error('Hero POST error:', error)
    return NextResponse.json({ error: 'Failed to create slide' }, { status: 500 })
  }
}
