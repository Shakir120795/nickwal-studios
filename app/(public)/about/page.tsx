import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Who We Are',
}

export default function AboutPage() {
  return (
    <section className="pt-40 pb-40">
      <div className="container-custom max-w-3xl">
        <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-heading)]">
          Who We Are
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-12 font-[family-name:var(--font-heading)]">
          About Nickwal Studios
        </h1>

        <div className="space-y-10 text-white/80 text-lg leading-relaxed">
          <p>Nickwal Studios is a creative studio for videos, photos, reels, branding, websites, and bots. We help brands, businesses, and creators present their ideas in a clean and professional way.</p>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">What We Do</h2>
            <p>We create ad films, reels, logo intros, motion graphics, product shoots, pre-wedding shoots, bridal shoots, branding, websites, and automation bots.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Our Style</h2>
            <p>Our work is visual-first, modern, and simple. We focus on strong ideas, clean design, cinematic visuals, and quality execution.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Who We Work With</h2>
            <p>We work with businesses, startups, creators, brands, and individuals who want professional content and digital presence.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Why Nickwal Studios</h2>
            <ul className="list-none space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Creative ideas with professional delivery</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Clean visuals with modern design</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Complete support from concept to final output</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <span>Simple process and clear communication</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
