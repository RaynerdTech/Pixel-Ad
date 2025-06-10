import HeroSection from '@/sections/HeroSection';
import HowItWorksSection from '@/sections/HowItWorksSection';
import PixelGridSection from '@/sections/PixelGridSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import AdvertisementSection from '@/sections/WhyAdvertiseSection';


export default function Home() {
  return (
    <div>
      <HeroSection />
      {/* Later we’ll add HowItWorksSection here */}
      <HowItWorksSection />
       {/*PixelGrid section */}
      <PixelGridSection />
      <AdvertisementSection />
      <TestimonialsSection />
      
    </div>
  );
}
