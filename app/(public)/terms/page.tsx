import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
}

export default function TermsPage() {
  return (
    <section className="pt-40 pb-40">
      <div className="container-custom max-w-3xl">
        <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-heading)]">
          Legal
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-heading)]">
          Terms of Service
        </h1>
        <p className="text-text-dim text-sm mb-12">Last updated: January 2026</p>

        <div className="space-y-10 text-white/80 text-lg leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Services</h2>
            <p>Nickwal Studios provides creative services such as video production, photography, reels, ad films, branding, website design, and bots.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Project Approval</h2>
            <p>All projects begin only after discussion, final quote, and client approval.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Payment Terms</h2>
            <p>Payment terms depend on the project. In most cases, an advance payment is required before work starts, and the remaining payment is completed before final delivery.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Final Delivery</h2>
            <p>Final files or project deliverables are shared after full payment is completed.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Portfolio Rights</h2>
            <p>Nickwal Studios may showcase completed work in its portfolio unless the client requests otherwise.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Revisions</h2>
            <p>Revisions are provided as agreed before the project starts. Extra changes or new requirements may include additional charges.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Cancellation</h2>
            <p>If a project is cancelled after work has started, charges may apply for the work already completed.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Contact</h2>
            <p>For service-related questions, contact us at: <a href="mailto:hello@nickwalstudios.com" className="text-accent hover:underline">hello@nickwalstudios.com</a></p>
          </div>
        </div>
      </div>
    </section>
  )
}
