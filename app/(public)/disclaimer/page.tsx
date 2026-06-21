import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer',
}

export default async function DisclaimerPage() {
  const page = await prisma.pageContent.findUnique({ where: { slug: 'disclaimer' } })

  return (
    <section className="pt-40 pb-40">
      <div className="container-custom max-w-3xl">
        <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-heading)]">
          Legal
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-12 font-[family-name:var(--font-heading)]">
          {page?.title || 'Disclaimer'}
        </h1>
        <div
          className="prose prose-invert prose-lg max-w-none [&_h2]:font-[family-name:var(--font-heading)] [&_h2]:text-2xl [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:font-[family-name:var(--font-heading)] [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-text-muted [&_li]:text-text-muted [&_a]:text-accent"
          dangerouslySetInnerHTML={{ __html: page?.content || '' }}
        />
      </div>
    </section>
  )
}
