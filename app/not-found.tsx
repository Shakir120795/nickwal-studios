import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-text px-6">
      <h1 className="text-[8rem] md:text-[12rem] font-bold leading-none text-gold-gradient font-[family-name:var(--font-heading)]">
        404
      </h1>
      <p className="text-xl md:text-2xl text-text-muted mt-4 mb-12 text-center">
        This page doesn&apos;t exist. Let&apos;s get you back.
      </p>
      <Link href="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  )
}
