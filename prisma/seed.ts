import { PrismaClient } from '../generated/prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { hash } from 'bcryptjs'

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || 'file:./dev.db',
})
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // Admin user
  const hashedPassword = await hash(process.env.ADMIN_PASSWORD || 'Admin@123456', 12)
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@nickwalstudios.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@nickwalstudios.com',
      password: hashedPassword,
      name: 'Nickwal Admin',
      role: 'admin',
    },
  })
  console.log('✅ Admin user created')

  // Site Settings
  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteName: 'Nickwal Studios',
      tagline: 'Idea Clicks',
      subtitle: 'Create. Shoot. Design.',
      introText: 'We create visual stories, brand films, reels, websites and digital systems that make ideas click.',
      whatsappNumber: '+919876543210',
      phone: '+919876543210',
      email: 'hello@nickwalstudios.com',
      location: 'India',
      instagramUrl: 'https://instagram.com/nickwalstudios',
      facebookUrl: 'https://facebook.com/nickwalstudios',
      youtubeUrl: 'https://youtube.com/@nickwalstudios',
      linkedinUrl: 'https://linkedin.com/company/nickwalstudios',
      googleMapsUrl: '',
      metaDesc: 'Nickwal Studios — Premium Creative Studio for Video, Photography, Ads, Reels, Branding, Websites & Bots.',
    },
  })
  console.log('✅ Site settings created')

  // Design Settings
  await prisma.designSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      fontFamily: 'Space Grotesk',
      headingFont: 'Space Grotesk',
      bodyFont: 'Inter',
      accentColor: '#c9a84c',
      textColor: '#ffffff',
      bgColor: '#050505',
      buttonColor: '#c9a84c',
      buttonTextColor: '#000000',
      headerStyle: 'transparent',
      borderRadius: '12',
      containerWidth: '1400',
      sectionMarginY: '120',
      sectionPaddingX: '24',
      heroOverlay: '0.4',
      heroHeight: '100vh',
      heroTextPosition: 'center',
    },
  })
  console.log('✅ Design settings created')

  // Branding Settings
  await prisma.brandingSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      headerLogoUrl: '',
      footerLogoUrl: '',
      faviconUrl: '',
      adminLogoUrl: '',
      showreelUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      introVideoUrl: '',
    },
  })
  console.log('✅ Branding settings created')

  // Hero Slides
  await prisma.heroSlide.createMany({
    data: [
      {
        videoUrl: '/uploads/hero-1.mp4',
        posterUrl: '/uploads/hero-poster-1.jpg',
        title: 'We Create Visual Stories',
        subtitle: 'Films • Reels • Ads • Brands',
        ctaText1: 'View Work',
        ctaLink1: '/work',
        ctaText2: 'Book Now',
        ctaLink2: '/contact',
        sortOrder: 0,
        isActive: true,
      },
      {
        videoUrl: '/uploads/hero-2.mp4',
        posterUrl: '/uploads/hero-poster-2.jpg',
        title: 'Premium Brand Films',
        subtitle: 'Cinematic storytelling for modern brands',
        ctaText1: 'Our Services',
        ctaLink1: '/services',
        ctaText2: 'Get Quote',
        ctaLink2: '/contact',
        sortOrder: 1,
        isActive: true,
      },
      {
        videoUrl: '/uploads/hero-3.mp4',
        posterUrl: '/uploads/hero-poster-3.jpg',
        title: 'Design That Clicks',
        subtitle: 'Websites • Apps • Branding • Systems',
        ctaText1: 'See Projects',
        ctaLink1: '/work',
        ctaText2: 'WhatsApp Us',
        ctaLink2: '/contact',
        sortOrder: 2,
        isActive: true,
      },
    ],
  })
  console.log('✅ Hero slides created')

  // Service Categories
  const createCategory = await prisma.serviceCategory.create({
    data: {
      name: 'CREATE',
      slug: 'create',
      description: 'Video production, brand films, ad films, reels, and motion content that captures attention and drives results.',
      imageUrl: '/uploads/service-create.jpg',
      videoUrl: '/uploads/service-create.mp4',
      sortOrder: 0,
      items: {
        create: [
          { name: 'Brand Films', sortOrder: 0 },
          { name: 'Ad Films (Digital + TV)', sortOrder: 1 },
          { name: 'Reels & Short Content', sortOrder: 2 },
          { name: 'Product Videos', sortOrder: 3 },
          { name: 'Motion Graphics', sortOrder: 4 },
          { name: 'Corporate Videos', sortOrder: 5 },
          { name: 'Music Videos', sortOrder: 6 },
          { name: 'Testimonial Videos', sortOrder: 7 },
        ],
      },
    },
  })

  const shootsCategory = await prisma.serviceCategory.create({
    data: {
      name: 'SHOOTS',
      slug: 'shoots',
      description: 'Professional photography for products, events, portraits, and brands — styled, lit, and delivered to perfection.',
      imageUrl: '/uploads/service-shoots.jpg',
      videoUrl: '/uploads/service-shoots.mp4',
      sortOrder: 1,
      items: {
        create: [
          { name: 'Product Photography', sortOrder: 0 },
          { name: 'Event Photography', sortOrder: 1 },
          { name: 'Portrait & Headshots', sortOrder: 2 },
          { name: 'Food Photography', sortOrder: 3 },
          { name: 'Interior & Architecture', sortOrder: 4 },
          { name: 'Fashion Shoots', sortOrder: 5 },
          { name: 'Wedding Photography', sortOrder: 6 },
          { name: 'Drone Shoots', sortOrder: 7 },
        ],
      },
    },
  })

  const designCategory = await prisma.serviceCategory.create({
    data: {
      name: 'DESIGN',
      slug: 'design',
      description: 'Digital design, branding, web development, and AI-powered systems that give your business a sharp edge.',
      imageUrl: '/uploads/service-design.jpg',
      videoUrl: '/uploads/service-design.mp4',
      sortOrder: 2,
      items: {
        create: [
          { name: 'Brand Identity & Logo', sortOrder: 0 },
          { name: 'Website Design & Dev', sortOrder: 1 },
          { name: 'Social Media Design', sortOrder: 2 },
          { name: 'Packaging Design', sortOrder: 3 },
          { name: 'UI/UX Design', sortOrder: 4 },
          { name: 'Presentation Design', sortOrder: 5 },
          { name: 'WhatsApp & AI Bots', sortOrder: 6 },
          { name: 'Digital Marketing', sortOrder: 7 },
        ],
      },
    },
  })
  console.log('✅ Service categories created')

  // Portfolio Items
  await prisma.portfolioItem.createMany({
    data: [
      {
        title: 'Luxe Watches — Brand Film',
        category: 'create',
        mediaType: 'video',
        mediaUrl: '/uploads/portfolio-1.mp4',
        thumbnailUrl: '/uploads/portfolio-thumb-1.jpg',
        description: 'Cinematic brand film for premium watch brand showcasing craftsmanship and luxury.',
        isFeatured: true,
        sortOrder: 0,
      },
      {
        title: 'Artisan Coffee — Product Shoot',
        category: 'shoots',
        mediaType: 'image',
        mediaUrl: '/uploads/portfolio-2.jpg',
        thumbnailUrl: '/uploads/portfolio-thumb-2.jpg',
        description: 'Moody product photography for specialty coffee brand.',
        isFeatured: true,
        sortOrder: 1,
      },
      {
        title: 'FinTech App — UI/UX Design',
        category: 'design',
        mediaType: 'image',
        mediaUrl: '/uploads/portfolio-3.jpg',
        thumbnailUrl: '/uploads/portfolio-thumb-3.jpg',
        description: 'Complete UI/UX redesign for a fintech startup mobile application.',
        isFeatured: true,
        sortOrder: 2,
      },
      {
        title: 'Streetwear Drop — Reels Campaign',
        category: 'create',
        mediaType: 'video',
        mediaUrl: '/uploads/portfolio-4.mp4',
        thumbnailUrl: '/uploads/portfolio-thumb-4.jpg',
        description: 'Series of high-energy reels for streetwear brand launch.',
        isFeatured: true,
        sortOrder: 3,
      },
      {
        title: 'Organic Skincare — Packaging',
        category: 'design',
        mediaType: 'image',
        mediaUrl: '/uploads/portfolio-5.jpg',
        thumbnailUrl: '/uploads/portfolio-thumb-5.jpg',
        description: 'Minimal, eco-conscious packaging design for organic skincare range.',
        isFeatured: true,
        sortOrder: 4,
      },
      {
        title: 'Restaurant Interior — Photo Series',
        category: 'shoots',
        mediaType: 'image',
        mediaUrl: '/uploads/portfolio-6.jpg',
        thumbnailUrl: '/uploads/portfolio-thumb-6.jpg',
        description: 'Atmospheric interior photography for fine-dining restaurant.',
        isFeatured: true,
        sortOrder: 5,
      },
      {
        title: 'Tech Startup — Brand Identity',
        category: 'design',
        mediaType: 'image',
        mediaUrl: '/uploads/portfolio-7.jpg',
        thumbnailUrl: '/uploads/portfolio-thumb-7.jpg',
        description: 'Full brand identity system including logo, colors, typography, and guidelines.',
        isFeatured: false,
        sortOrder: 6,
      },
      {
        title: 'Fashion Week — Event Coverage',
        category: 'shoots',
        mediaType: 'image',
        mediaUrl: '/uploads/portfolio-8.jpg',
        thumbnailUrl: '/uploads/portfolio-thumb-8.jpg',
        description: 'Behind-the-scenes and runway photography for fashion week.',
        isFeatured: false,
        sortOrder: 7,
      },
    ],
  })
  console.log('✅ Portfolio items created')

  // Case Studies
  await prisma.caseStudy.createMany({
    data: [
      {
        problem: 'A premium jewelry brand had zero online presence and was losing customers to competitors with strong digital marketing.',
        solution: 'We created a cinematic brand film, redesigned their visual identity, built a luxury e-commerce website, and launched targeted reel campaigns.',
        result: '3x increase in online inquiries within 60 days. Instagram grew from 200 to 5,000 followers. Monthly revenue up 40%.',
        imageUrl: '/uploads/case-study-1.jpg',
        isFeatured: true,
        sortOrder: 0,
      },
      {
        problem: 'A new restaurant needed to stand out in a saturated market with no brand recognition and empty tables on weekdays.',
        solution: 'Shot stunning food and interior photography, designed their full brand kit, built a website with online reservations, and created weekly reel content.',
        result: 'Fully booked weekends within 3 weeks. 200+ Google reviews in 2 months. Food delivery orders up 60%.',
        imageUrl: '/uploads/case-study-2.jpg',
        isFeatured: true,
        sortOrder: 1,
      },
      {
        problem: 'An ed-tech startup needed to explain their complex AI product in a way that parents and students could understand.',
        solution: 'Produced an animated explainer video, redesigned their landing page for clarity, and created a series of testimonial videos from early users.',
        result: 'Sign-up conversion rate jumped from 2.1% to 7.8%. Video was shared 10K+ times. Investor deck engagement doubled.',
        imageUrl: '/uploads/case-study-3.jpg',
        isFeatured: true,
        sortOrder: 2,
      },
    ],
  })
  console.log('✅ Case studies created')

  // Legal / Static Pages
  const pages = [
    {
      slug: 'about',
      title: 'About Nickwal Studios',
      content: `<h2>Who We Are</h2>
<p>Nickwal Studios is a premium creative studio specializing in video production, photography, branding, and digital design. We work with brands, startups, and creators who want to stand out in a noisy digital world.</p>

<h2>Our Philosophy</h2>
<p>Every brand has a story worth telling. We believe in cinematic quality, thoughtful design, and strategic creativity. No templates. No shortcuts. Just work that makes ideas click.</p>

<h2>What We Do</h2>
<p>From brand films and product shoots to full website builds and AI chatbot systems — we handle the entire creative pipeline. Think of us as your creative partner, not just a vendor.</p>

<h2>Why Choose Us</h2>
<ul>
<li>Premium quality at competitive pricing</li>
<li>End-to-end creative solutions</li>
<li>Fast turnaround without compromising craft</li>
<li>Transparent process and communication</li>
</ul>`,
    },
    {
      slug: 'privacy-policy',
      title: 'Privacy Policy',
      content: `<h2>Privacy Policy</h2>
<p>Last updated: January 2025</p>

<h3>Information We Collect</h3>
<p>When you contact us through our website, we collect your name, email address, phone number, and any message you provide. We use this information solely to respond to your inquiry and provide our services.</p>

<h3>How We Use Your Information</h3>
<ul>
<li>To respond to your inquiries and provide quotes</li>
<li>To deliver the services you've requested</li>
<li>To send project updates and relevant communications</li>
<li>To improve our website and services</li>
</ul>

<h3>Data Security</h3>
<p>We implement appropriate security measures to protect your personal information. Your data is stored securely and is only accessible to authorized team members.</p>

<h3>Third-Party Sharing</h3>
<p>We do not sell, trade, or share your personal information with third parties except as necessary to provide our services or as required by law.</p>

<h3>Contact</h3>
<p>For privacy-related questions, contact us at hello@nickwalstudios.com</p>`,
    },
    {
      slug: 'terms',
      title: 'Terms of Service',
      content: `<h2>Terms of Service</h2>
<p>Last updated: January 2025</p>

<h3>Services</h3>
<p>Nickwal Studios provides creative services including video production, photography, graphic design, web development, and digital marketing. All projects are subject to a separate agreement or quote.</p>

<h3>Payment Terms</h3>
<ul>
<li>50% advance payment required to begin work</li>
<li>Remaining 50% due upon project completion</li>
<li>Custom payment plans available for large projects</li>
</ul>

<h3>Intellectual Property</h3>
<p>Upon full payment, clients receive usage rights to the final deliverables. Nickwal Studios retains the right to showcase work in our portfolio unless otherwise agreed.</p>

<h3>Revisions</h3>
<p>Each project includes a defined number of revision rounds as specified in the project quote. Additional revisions may incur extra charges.</p>

<h3>Cancellation</h3>
<p>Projects cancelled after work has begun are subject to charges for work completed. Advance payments are non-refundable once production begins.</p>`,
    },
    {
      slug: 'disclaimer',
      title: 'Disclaimer',
      content: `<h2>Disclaimer</h2>
<p>Last updated: January 2025</p>

<h3>General</h3>
<p>The information on this website is for general informational purposes. While we strive to keep content accurate and up-to-date, we make no warranties about the completeness or accuracy of the information.</p>

<h3>Results</h3>
<p>Case studies and results mentioned on this website are based on specific client projects. Results may vary depending on industry, budget, market conditions, and other factors.</p>

<h3>External Links</h3>
<p>Our website may contain links to external sites. We are not responsible for the content or practices of these third-party websites.</p>

<h3>Portfolio</h3>
<p>All work displayed in our portfolio is original work created by Nickwal Studios. Some images may use stock photography for demonstration purposes and are clearly marked as such.</p>`,
    },
    {
      slug: 'refund-policy',
      title: 'Refund Policy',
      content: `<h2>Refund Policy</h2>
<p>Last updated: January 2025</p>

<h3>Before Production Begins</h3>
<p>If you cancel before any work has started, you are eligible for a full refund of the advance payment, minus a 10% administrative fee.</p>

<h3>During Production</h3>
<p>Once production has begun, refunds are calculated based on work completed. We will provide an itemized breakdown of hours and resources used.</p>

<h3>After Delivery</h3>
<p>Once final deliverables have been approved and delivered, no refunds will be issued. If you are unsatisfied with the quality, we will work with you to make it right within the agreed revision scope.</p>

<h3>Disputes</h3>
<p>If you have a concern about charges or deliverables, please contact us at hello@nickwalstudios.com within 7 days of delivery. We are committed to resolving issues fairly.</p>

<h3>Non-Refundable Items</h3>
<ul>
<li>Third-party costs (stock footage, music licenses, domains, hosting)</li>
<li>Rush delivery surcharges</li>
<li>On-location travel expenses</li>
</ul>`,
    },
  ]

  for (const page of pages) {
    await prisma.pageContent.upsert({
      where: { slug: page.slug },
      update: { content: page.content, title: page.title },
      create: page,
    })
  }
  console.log('✅ Legal pages created')

  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
