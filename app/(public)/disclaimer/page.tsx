import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer',
}

export default function DisclaimerPage() {
  return (
    <section className="pt-40 pb-40">
      <div className="container-custom max-w-3xl">
        <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-heading)]">
          Legal
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-heading)]">
          Disclaimer
        </h1>
        <p className="text-text-dim text-sm mb-12">Last updated: January 2026</p>

        <div className="space-y-10 text-white/80 text-lg leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">General Information</h2>
            <p>The information on this website is for general business and service purposes only.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Accuracy of Information</h2>
            <p>Nickwal Studios tries to keep all details accurate and updated. However, we do not guarantee that every piece of information will always be complete or error-free.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Project Results</h2>
            <p>Project results may vary based on client requirements, budget, timeline, market condition, platform performance, and other factors.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Portfolio & Sample Work</h2>
            <p>Portfolio work shown on this website is for showcasing our creative services. Some sample visuals, mockups, or stock assets may be used for presentation purposes.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">External Links</h2>
            <p>Our website may include external links. Nickwal Studios is not responsible for the content, privacy practices, or services of third-party websites.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Contact</h2>
            <p>For any questions, contact us at: <a href="mailto:hello@nickwalstudios.com" className="text-accent hover:underline">hello@nickwalstudios.com</a></p>
          </div>
        </div>
      </div>
    </section>
  )
}
