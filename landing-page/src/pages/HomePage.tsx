import Hero from '../components/Hero'
import Intro from '../components/Intro'
import ImmersionDays from '../components/ImmersionDays'
import WhatYouGet from '../components/WhatYouGet'
import Pricing from '../components/Pricing'
import TargetAudience from '../components/TargetAudience'
import Instructor from '../components/Instructor'
import FAQ from '../components/FAQ'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Intro />
        <ImmersionDays />
        <WhatYouGet />
        <TargetAudience />
        <Instructor />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
