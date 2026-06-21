import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { writeFile, mkdir, readdir } from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    const backupDir = path.join(process.cwd(), 'backups')
    let backups: string[] = []
    
    try {
      backups = await readdir(backupDir)
    } catch {
      // Directory doesn't exist yet
    }

    const logs = await prisma.backupLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    })

    return NextResponse.json({ backups, logs })
  } catch (error) {
    console.error('Backup GET error:', error)
    return NextResponse.json({ error: 'Failed to list backups' }, { status: 500 })
  }
}

export async function POST() {
  try {
    // Export all data
    const data = {
      siteSettings: await prisma.siteSettings.findUnique({ where: { id: 'default' } }),
      designSettings: await prisma.designSettings.findUnique({ where: { id: 'default' } }),
      brandingSettings: await prisma.brandingSettings.findUnique({ where: { id: 'default' } }),
      heroSlides: await prisma.heroSlide.findMany(),
      serviceCategories: await prisma.serviceCategory.findMany({ include: { items: true } }),
      portfolioItems: await prisma.portfolioItem.findMany(),
      caseStudies: await prisma.caseStudy.findMany(),
      pages: await prisma.pageContent.findMany(),
      leads: await prisma.lead.findMany(),
    }

    const backupDir = path.join(process.cwd(), 'backups')
    await mkdir(backupDir, { recursive: true })

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `backup-${timestamp}.json`
    const filepath = path.join(backupDir, filename)

    const jsonData = JSON.stringify(data, null, 2)
    await writeFile(filepath, jsonData)

    // Log backup
    await prisma.backupLog.create({
      data: {
        filename,
        size: Buffer.byteLength(jsonData),
      },
    })

    return NextResponse.json({ success: true, filename, size: Buffer.byteLength(jsonData) })
  } catch (error) {
    console.error('Backup POST error:', error)
    return NextResponse.json({ error: 'Failed to create backup' }, { status: 500 })
  }
}
