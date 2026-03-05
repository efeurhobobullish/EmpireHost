import { Docs, FAQ, Hero, HowItWorks, Pricing, Testimonials, Tutorial} from "@/components/landing";
import { LandingLayout } from "@/layouts";

export default function Home() {
  return (
    <LandingLayout>
      <Hero />
      <Tutorial  />
      <HowItWorks />
      <Pricing />
      <Docs  />
      <Testimonials />
      <FAQ />
    

    </LandingLayout>
  )
}
