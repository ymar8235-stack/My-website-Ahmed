import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustMetrics } from '@/components/sections/TrustMetrics'
import {
  AboutSection,
  ClientsSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
} from '@/components/sections/AllSections'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { CaseStudyHighlight } from '@/components/sections/CaseStudyHighlight'
import { BlogSection } from '@/components/sections/BlogSection'
import { AwardsSection } from '@/components/sections/AwardsSection'

export const metadata: Metadata = {
  title: 'Ahmed Ammar | Professional Graphic Designer & Brand Identity Specialist',
  description:
    'Professional Graphic Designer, Brand Identity Designer, Logo Designer, and Website Creator based in Egypt. 5+ years creating premium visual identities for businesses.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustMetrics />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <CaseStudyHighlight />
      <ClientsSection />
      <TestimonialsSection />
      <AwardsSection />
      <BlogSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
