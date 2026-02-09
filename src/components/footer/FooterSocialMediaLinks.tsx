import { faFacebook, faInstagram, faSquareLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

import NatlibfiHeading from '@/components/text/NatlibfiHeading';
import SocialMediaLink from '@/components/links/SocialMediaLink';

import useTranslation from '@/hooks/useTranslation';

function FooterSocialMediaLinks() {
  const { translate: t } = useTranslation();

  return (
    <div id="socials" className="">
      <div id="social-container">
        <NatlibfiHeading size={'m'} color="inverted" className="mb-[16px]">
          {t('components.footer.headings.social-media')}
        </NatlibfiHeading>

        <div className="grid gap-y-[14px]">
          <SocialMediaLink href="https://facebook.com/Kansalliskirjasto" icon={faFacebook} text="Facebook" />
          <SocialMediaLink
            href="https://www.youtube.com/channel/UCMCKdIT517O4D8o9-lesbvQ"
            icon={faYoutube}
            text="Youtube"
          />
          <SocialMediaLink href="https://instagram.com/kansalliskirjasto/" icon={faInstagram} text="Instagram" />
          <SocialMediaLink
            href="https://fi.linkedin.com/company/nationallibraryfinland"
            icon={faSquareLinkedin}
            text="LinkedIn"
          />
        </div>
      </div>
    </div>
  );
}

export default FooterSocialMediaLinks;
