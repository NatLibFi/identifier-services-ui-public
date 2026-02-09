import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/shadcn/navigation-menu';

import { navigationMenuTriggerStyle } from '@/components/shadcn/navigation-menu-functions';

import ExternalLink from '@/components/links/ExternalLink';
import NatlibfiHeading from '@/components/text/NatlibfiHeading';
import NavbarLink from '@/components/navbar/NavbarLink';
import NatlibfiLinkText from '@/components/text/NatlibfiLinkText';

import useTranslation from '@/hooks/useTranslation';

import navbarLinks from '@/components/navbar/navbar-links';

function DesktopNavigationMenu() {
  const { getCurrentLanguage, translate: t } = useTranslation();
  const language = getCurrentLanguage();

  return (
    <div id="nav-container" className="hidden md:flex pt-2 pb-2 border-b-brand-gray border-b-2 w-full justify-center">
      <div className="w-[95%] max-w-[1280px]">
        {/* Introduce h2-level for HTML heading semantics */}
        <NatlibfiHeading size={'l'} className="hidden">
          {t('components.navbar.menu')}
        </NatlibfiHeading>

        <NavigationMenu data-test="nav-root" viewport={false}>
          <NavigationMenuList>
            {/* Home */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <NavbarLink data-test="nav-link-home" path={navbarLinks.home.path} text={t('components.navbar.home')} />
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Publisher registry search */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <NavbarLink
                  data-test="nav-link-monograph-publishers"
                  path={navbarLinks['monograph-publishers'].path}
                  text={t('components.navbar.monograph-publishers')}
                />
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Forms dropdown */}
            <NavigationMenuItem data-test="nav-link-forms">
              <NavigationMenuTrigger>
                <NatlibfiLinkText>{t('components.navbar.forms')}</NatlibfiLinkText>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-[400px]">
                  {/* Monograph publication form */}
                  <li>
                    <NavigationMenuLink asChild>
                      <NavbarLink
                        data-test="nav-link-forms-monograph-publications"
                        path={navbarLinks.forms['monograph-publications'].path}
                        text={t('components.navbar.forms.monograph-publications')}
                      />
                    </NavigationMenuLink>
                  </li>

                  {/* Monograph publisher form */}
                  <li>
                    <NavigationMenuLink asChild>
                      <NavbarLink
                        data-test="nav-link-forms-monograph-publishers"
                        path={navbarLinks.forms['monograph-publishers'].path}
                        text={t('components.navbar.forms.monograph-publishers')}
                      />
                    </NavigationMenuLink>
                  </li>

                  {/* Publisher contact detail change form (external) */}
                  <li>
                    <NavigationMenuLink asChild>
                      <ExternalLink
                        href={navbarLinks['change-contact-details'].getPath(language)}
                        text={t('components.navbar.forms.change-contact-details')}
                      />
                    </NavigationMenuLink>
                  </li>

                  {/* Serial publication form */}
                  <li>
                    <NavigationMenuLink asChild>
                      <NavbarLink
                        data-test="nav-link-forms-serial-publications"
                        path={navbarLinks.forms['serial-publications'].path}
                        text={t('components.navbar.forms.serial-publications')}
                      />
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Other identifiers dropdown */}
            <NavigationMenuItem data-test="nav-link-forms">
              <NavigationMenuTrigger>
                <NatlibfiLinkText>{t('components.navbar.other-identifiers')}</NatlibfiLinkText>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-[325px]">
                  {/* ISIL */}
                  <li>
                    <NavigationMenuLink asChild>
                      <ExternalLink
                        href={navbarLinks['other-identifiers'].isil.getPath(language)}
                        text={navbarLinks['other-identifiers'].isil.displayName}
                      />
                    </NavigationMenuLink>
                  </li>

                  {/* ISNI */}
                  <li>
                    <NavigationMenuLink asChild>
                      <ExternalLink
                        href={navbarLinks['other-identifiers'].isni.getPath(language)}
                        text={navbarLinks['other-identifiers'].isni.displayName}
                      />
                    </NavigationMenuLink>
                  </li>

                  {/* URN */}
                  <li>
                    <NavigationMenuLink asChild>
                      <ExternalLink
                        href={navbarLinks['other-identifiers'].urn.getPath(language)}
                        text={navbarLinks['other-identifiers'].urn.displayName}
                      />
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

export default DesktopNavigationMenu;
