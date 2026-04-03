import HeroBanner from '@/components/HeroBanner';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategorySection from '@/components/CategorySection';
import PromoSection from '@/components/PromoSection';
import NewsletterSection from '@/components/NewsletterSection';

export default function HomePage() {
  return (
    <div>
      <HeroBanner />
      <CategorySection />
      <FeaturedProducts />
      <PromoSection />
      <NewsletterSection />
    </div>
  );
}
