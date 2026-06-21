import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const pages = await prisma.pageContent.findMany()
    return NextResponse.json(pages)
  } catch (error) {
    console.error('Pages GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { slug, title, content } = body

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    const page = await prisma.pageContent.upsert({
      where: { slug },
      update: { title, content },
      create: { slug, title, content },
    })

    return NextResponse.json(page)
  } catch (error) {
    console.error('Pages PUT error:', error)
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 })
  }
}
