import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { items, ...categoryData } = body

    // Update category
    const category = await prisma.serviceCategory.update({
      where: { id },
      data: categoryData,
    })

    // If items provided, replace all items
    if (items) {
      await prisma.serviceItem.deleteMany({ where: { categoryId: id } })
      await prisma.serviceItem.createMany({
        data: items.map((item: { name: string; sortOrder?: number }) => ({
          ...item,
          categoryId: id,
        })),
      })
    }

    const updated = await prisma.serviceCategory.findUnique({
      where: { id },
      include: { items: { orderBy: { sortOrder: 'asc' } } },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Services PUT error:', error)
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.serviceCategory.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Services DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}
