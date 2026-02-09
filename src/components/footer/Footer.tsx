import FooterBranding from '@/components/footer/FooterBranding';
import FooterContactInformation from '@/components/footer/FooterContactInformation';
import FooterServiceInformation from '@/components/footer/FooterServiceInformation';
import FooterSocialMediaLinks from '@/components/footer/FooterSocialMediaLinks';
import FooterImportantLinks from '@/components/footer/FooterImportantLinks';
import NatlibfiHeading from '@/components/text/NatlibfiHeading';

import useTranslation from '@/hooks/useTranslation';

function Footer() {
  const { translate: t } = useTranslation();

  return (
    <footer data-test="footer">
      <div className="grid w-[100%] bg-brand-darkblue text-brand-white pt-[48px] pr-[18px] pb-[48px] pl-[18px] md:p-12">
        <div className="max-w-[1280px] md:justify-self-center-safe grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-y-10 md:gap-y-12 md:gap-x-10 xl:gap-y-0">
          {/* Introduce h2-level for HTML heading semantics */}
          <NatlibfiHeading size={'l'} className="hidden">
            {t('components.footer.headings.main')}
          </NatlibfiHeading>

          <div className="grid">
            <FooterBranding />
            <FooterContactInformation />
          </div>

          <FooterServiceInformation />
          <FooterImportantLinks />
          <FooterSocialMediaLinks />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
