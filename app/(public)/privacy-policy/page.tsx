import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

export default function PrivacyPolicyPage() {
  return (
    <section className="pt-40 pb-40">
      <div className="container-custom max-w-3xl">
        <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-heading)]">
          Legal
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-heading)]">
          Privacy Policy
        </h1>
        <p className="text-text-dim text-sm mb-12">Last updated: January 2026</p>

        <div className="space-y-10 text-white/80 text-lg leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Information We Collect</h2>
            <p>When you contact Nickwal Studios through our website, we may collect your name, phone number, email address, service interest, and message.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">How We Use Your Information</h2>
            <p>We use your information to reply to your enquiry, share project details, provide quotes, and deliver our services.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Data Sharing</h2>
            <p>We do not sell or share your personal information with anyone. Your details are used only by Nickwal Studios for communication and service purposes.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Data Security</h2>
            <p>We take reasonable steps to keep your information safe. However, no online system is 100% secure.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Cookies & Analytics</h2>
            <p>Our website may use basic cookies or analytics to improve user experience and understand website performance.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Contact</h2>
            <p>For any privacy-related questions, contact us at: <a href="mailto:hello@nickwalstudios.com" className="text-accent hover:underline">hello@nickwalstudios.com</a></p>
          </div>
        </div>
      </div>
    </section>
  )
}
