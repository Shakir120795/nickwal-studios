import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const items = await prisma.caseStudy.findMany({
      orderBy: { sortOrder: 'asc' },
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('CaseStudies GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch case studies' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const item = await prisma.caseStudy.create({ data: body })
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('CaseStudies POST error:', error)
    return NextResponse.json({ error: 'Failed to create case study' }, { status: 500 })
  }
}
