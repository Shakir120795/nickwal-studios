import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.serviceCategory.findMany({
      include: { items: { orderBy: { sortOrder: 'asc' } } },
      orderBy: { sortOrder: 'asc' },
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Services GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { items, ...categoryData } = body
    const category = await prisma.serviceCategory.create({
      data: {
        ...categoryData,
        items: items ? { create: items } : undefined,
      },
      include: { items: true },
    })
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Services POST error:', error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}
