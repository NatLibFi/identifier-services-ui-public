import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@/components/shadcn/button';

import ExternalLink from '@/components/links/ExternalLink';
import MobileNavigationListEntry from '@/components/navbar/MobileNavigationListEntry';
import NatlibfiHeading from '@/components/text/NatlibfiHeading';
import NatlibfiInteractiveElementText from '@/components/text/NatlibfiInteractiveElementText';
import NavbarLink from '@/components/navbar/NavbarLink';

import useTranslation from '@/hooks/useTranslation';

import navbarLinks from '@/components/navbar/navbar-links';

function MobileNavigationMenu() {
  const [showMobileContent, setShowMobileContent] = useState(false);

  const { getCurrentLanguage, translate: t } = useTranslation();
  const language = getCurrentLanguage();

  // Prevent flashing of old content by allowing graceful navigation period
  const autoHideMenu = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setTimeout(() => setShowMobileContent(false), 1000);
  };

  return (
    <div id="nav-mobile" className="block md:hidden">
      {/* Menu icon */}
      <div className="flex items-center justify-end gap-4 p-4 border-b-2 border-brand-darkblue">
        <Button id="navbar-mobile-menu" variant={'ghost'} onClick={() => setShowMobileContent(!showMobileContent)}>
          <FontAwesomeIcon icon={faBars} />

          {/* Introduce h2-level for HTML heading semantics */}
          <NatlibfiHeading size={'l'} className="hidden">
            {t('components.navbar.menu')}
          </NatlibfiHeading>

          <NatlibfiInteractiveElementText>{t('components.navbar.menu')}</NatlibfiInteractiveElementText>
        </Button>
      </div>

      {/* Menu content */}
      <div
        id="navbar-mobile-content"
        className={
          showMobileContent
            ? 'flex-col min-h-[70vh] items-center text-center mb-4 bg-brand-whitesmoke/1 border-b-2 border-brand-darkblue rounded-sm'
            : 'hidden'
        }
      >
        <nav>
          <ul>
            {/* Home page */}
            <MobileNavigationListEntry>
              <NavbarLink path={navbarLinks.home.path} text={t('components.navbar.home')} onClick={autoHideMenu} />
            </MobileNavigationListEntry>

            {/* Monograph publisher registry search */}
            <MobileNavigationListEntry>
              <NavbarLink
                path={navbarLinks['monograph-publishers'].path}
                text={t('components.navbar.monograph-publishers')}
                onClick={autoHideMenu}
              />
            </MobileNavigationListEntry>

            {/* Form divider */}
            <div id="nav-divider" className="flex flex-row pt-2 pb-2 items-center justify-evenly">
              <div className="bg-brand-darkblue-20 w-[30%] h-[2px]"></div>
              <p className="text-zinc-700">{t('components.navbar.forms')}</p>
              <div className="bg-brand-darkblue-20 w-[30%] h-[2px]"></div>
            </div>

            {/* Forms */}

            {/* Forms - Monograph Publication */}
            <MobileNavigationListEntry>
              <NavbarLink
                path={navbarLinks.forms['monograph-publications'].path}
                text={t('components.navbar.forms.monograph-publications')}
                onClick={autoHideMenu}
              />
            </MobileNavigationListEntry>

            {/* Forms - Monograph Publisher */}
            <MobileNavigationListEntry>
              <NavbarLink
                path={navbarLinks.forms['monograph-publishers'].path}
                text={t('components.navbar.forms.monograph-publishers')}
                onClick={autoHideMenu}
              />
            </MobileNavigationListEntry>

            {/* Forms - Monograph Publisher Contact Detail (external) */}
            <MobileNavigationListEntry>
              <div className="grid">
                <ExternalLink
                  href={navbarLinks['change-contact-details'].getPath(language)}
                  text={t('components.navbar.forms.change-contact-details-mobile')}
                  className="justify-self-center"
                />
              </div>
            </MobileNavigationListEntry>

            {/* Forms - Serial Publication */}
            <MobileNavigationListEntry>
              <NavbarLink
                path={navbarLinks.forms['serial-publications'].path}
                text={t('components.navbar.forms.serial-publications')}
                onClick={autoHideMenu}
              />
            </MobileNavigationListEntry>

            {/* Other identifiers divider */}
            <div id="nav-divider" className="flex flex-row pt-2 pb-2 items-center justify-evenly">
              <div className="bg-brand-darkblue-20 w-[30%] h-[2px]"></div>
              <p className="text-zinc-700">{t('components.navbar.other-identifiers')}</p>
              <div className="bg-brand-darkblue-20 w-[30%] h-[2px]"></div>
            </div>

            {/* Other identifiers */}

            {/* Other identifiers - ISIL (external) */}
            <MobileNavigationListEntry>
              <div className="grid">
                <ExternalLink
                  href={navbarLinks['other-identifiers'].isil.getPath(language)}
                  text={navbarLinks['other-identifiers'].isil.displayName}
                  className="justify-self-center"
                />
              </div>
            </MobileNavigationListEntry>

            {/* Other identifiers - ISNI (external) */}
            <MobileNavigationListEntry>
              <div className="grid">
                <ExternalLink
                  href={navbarLinks['other-identifiers'].isni.getPath(language)}
                  text={navbarLinks['other-identifiers'].isni.displayName}
                  className="justify-self-center"
                />
              </div>
            </MobileNavigationListEntry>

            {/* Other identifiers - URN (external) */}
            <MobileNavigationListEntry>
              <div className="grid">
                <ExternalLink
                  href={navbarLinks['other-identifiers'].urn.getPath(language)}
                  text={navbarLinks['other-identifiers'].urn.displayName}
                  className="justify-self-center"
                />
              </div>
            </MobileNavigationListEntry>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default MobileNavigationMenu;
