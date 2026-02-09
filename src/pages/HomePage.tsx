import HomePageContent from '@/components/home-page/HomePageContent';
import HomePageHero from '@/components/home-page/HomePageHero';
import ContentWrapper from '@/components/layout-utils/ContentWrapper';

function HomePage() {
  return (
    <div className="w-[100%]">
      <HomePageHero />
      <ContentWrapper>
        <HomePageContent />
      </ContentWrapper>
    </div>
  );
}

export default HomePage;
