-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Admin',
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'default',
    "siteName" TEXT NOT NULL DEFAULT 'Nickwal Studios',
    "tagline" TEXT NOT NULL DEFAULT 'Idea Clicks',
    "subtitle" TEXT NOT NULL DEFAULT 'Create. Shoot. Design.',
    "introText" TEXT NOT NULL DEFAULT 'We create visual stories, brand films, reels, websites and digital systems that make ideas click.',
    "whatsappNumber" TEXT NOT NULL DEFAULT '+919876543210',
    "phone" TEXT NOT NULL DEFAULT '+919876543210',
    "email" TEXT NOT NULL DEFAULT 'hello@nickwalstudios.com',
    "location" TEXT NOT NULL DEFAULT 'India',
    "instagramUrl" TEXT NOT NULL DEFAULT '',
    "facebookUrl" TEXT NOT NULL DEFAULT '',
    "youtubeUrl" TEXT NOT NULL DEFAULT '',
    "linkedinUrl" TEXT NOT NULL DEFAULT '',
    "googleMapsUrl" TEXT NOT NULL DEFAULT '',
    "metaDesc" TEXT NOT NULL DEFAULT 'Nickwal Studios — Premium Creative Studio for Video, Photography, Ads, Reels, Branding, Websites & Bots.'
);

-- CreateTable
CREATE TABLE "DesignSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'default',
    "fontFamily" TEXT NOT NULL DEFAULT 'Space Grotesk',
    "headingFont" TEXT NOT NULL DEFAULT 'Space Grotesk',
    "bodyFont" TEXT NOT NULL DEFAULT 'Inter',
    "accentColor" TEXT NOT NULL DEFAULT '#c9a84c',
    "textColor" TEXT NOT NULL DEFAULT '#ffffff',
    "bgColor" TEXT NOT NULL DEFAULT '#050505',
    "buttonColor" TEXT NOT NULL DEFAULT '#c9a84c',
    "buttonTextColor" TEXT NOT NULL DEFAULT '#000000',
    "headerStyle" TEXT NOT NULL DEFAULT 'transparent',
    "borderRadius" TEXT NOT NULL DEFAULT '12',
    "containerWidth" TEXT NOT NULL DEFAULT '1400',
    "sectionMarginY" TEXT NOT NULL DEFAULT '120',
    "sectionPaddingX" TEXT NOT NULL DEFAULT '24',
    "heroOverlay" TEXT NOT NULL DEFAULT '0.4',
    "heroHeight" TEXT NOT NULL DEFAULT '100vh',
    "heroTextPosition" TEXT NOT NULL DEFAULT 'center'
);

-- CreateTable
CREATE TABLE "BrandingSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'default',
    "headerLogoUrl" TEXT NOT NULL DEFAULT '',
    "footerLogoUrl" TEXT NOT NULL DEFAULT '',
    "faviconUrl" TEXT NOT NULL DEFAULT '',
    "adminLogoUrl" TEXT NOT NULL DEFAULT '',
    "showreelUrl" TEXT NOT NULL DEFAULT '',
    "introVideoUrl" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "HeroSlide" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "videoUrl" TEXT NOT NULL,
    "posterUrl" TEXT,
    "title" TEXT NOT NULL DEFAULT 'Nickwal Studios',
    "subtitle" TEXT NOT NULL DEFAULT 'Idea Clicks',
    "ctaText1" TEXT NOT NULL DEFAULT 'View Work',
    "ctaLink1" TEXT NOT NULL DEFAULT '/work',
    "ctaText2" TEXT NOT NULL DEFAULT 'Book Now',
    "ctaLink2" TEXT NOT NULL DEFAULT '/contact',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ServiceCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "videoUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ServiceItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "ServiceItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ServiceCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PortfolioItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "mediaType" TEXT NOT NULL DEFAULT 'image',
    "mediaUrl" TEXT NOT NULL,
    "externalUrl" TEXT,
    "thumbnailUrl" TEXT,
    "description" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CaseStudy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "problem" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "imageUrl" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PageContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "service" TEXT,
    "budget" TEXT,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "BackupLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "size" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceCategory_slug_key" ON "ServiceCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PageContent_slug_key" ON "PageContent"("slug");
