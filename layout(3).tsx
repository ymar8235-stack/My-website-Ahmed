import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/common/WhatsAppButton'
import { ScrollProgress } from '@/components/common/ScrollProgress'
import { CustomCursor } from '@/components/common/CustomCursor'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
