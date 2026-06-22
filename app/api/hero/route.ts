import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Public API — no auth needed — for hero slideshow
export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    })
    return NextResponse.json(slides)
  } catch {
    return NextResponse.json([])
  }
}
