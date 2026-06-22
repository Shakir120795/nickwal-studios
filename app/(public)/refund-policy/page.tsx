import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
}

export default function RefundPolicyPage() {
  return (
    <section className="pt-40 pb-40">
      <div className="container-custom max-w-3xl">
        <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-heading)]">
          Legal
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-heading)]">
          Refund & Cancellation Policy
        </h1>
        <p className="text-text-dim text-sm mb-12">Last updated: January 2026</p>

        <div className="space-y-10 text-white/80 text-lg leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Before Work Starts</h2>
            <p>If you cancel the project before any work has started, you may receive a refund after deducting basic processing or administrative charges.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">During Production</h2>
            <p>Once the work has started, refund will depend on the amount of work already completed. This includes planning, shooting, editing, design, development, or any other project work.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">After Final Delivery</h2>
            <p>Once the final files or project has been delivered and approved, refunds will not be provided. If changes are needed, we will support you within the agreed revision limit.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Revisions</h2>
            <p>Every project includes revisions as discussed before starting. Extra changes, new ideas, or additional work may cost extra.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Non-Refundable Costs</h2>
            <p>Third-party costs such as stock footage, music licenses, domains, hosting, paid tools, travel, location charges, or urgent delivery charges are non-refundable.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Disputes</h2>
            <p>If you have any concern about payment or delivery, please contact us within 7 days of delivery.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Contact</h2>
            <p>For refund-related questions, contact us at: <a href="mailto:hello@nickwalstudios.com" className="text-accent hover:underline">hello@nickwalstudios.com</a></p>
          </div>
        </div>
      </div>
    </section>
  )
}
