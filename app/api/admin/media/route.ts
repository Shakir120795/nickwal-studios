import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { readdir, stat, unlink } from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    
    let files: { name: string; url: string; size: number; modified: Date }[] = []
    
    try {
      const dirEntries = await readdir(uploadsDir)
      for (const entry of dirEntries) {
        const filePath = path.join(uploadsDir, entry)
        const fileStat = await stat(filePath)
        if (fileStat.isFile()) {
          files.push({
            name: entry,
            url: `/uploads/${entry}`,
            size: fileStat.size,
            modified: fileStat.mtime,
          })
        }
      }
    } catch {
      // uploads dir doesn't exist yet
    }

    // Also get from DB
    const dbAssets = await prisma.mediaAsset.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ files, dbAssets })
  } catch (error) {
    console.error('Media GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { filename } = await request.json()
    
    if (!filename) {
      return NextResponse.json({ error: 'Filename required' }, { status: 400 })
    }

    const filepath = path.join(process.cwd(), 'public', 'uploads', filename)
    await unlink(filepath)

    // Also remove from DB if exists
    await prisma.mediaAsset.deleteMany({ where: { filename } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Media DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 })
  }
}
