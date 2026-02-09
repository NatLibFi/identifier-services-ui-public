import { ExternalLinkIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import useTranslation from '@/hooks/useTranslation';

const issues = ['sitemap', 'batch', 'required'];

const getAccessibilityStatementPageLinkLink = (language: string, linkName: string): string => {
  const accessibilityStatementPageLinks: Record<string, Record<string, string>> = {
    'wcag-2.1': {
      fi: 'https://www.w3.org/Translations/WCAG21-fi/',
      sv: 'https://www.w3.org/TR/WCAG21/', // Note: no Swedish translation exists currently
      en: 'https://www.w3.org/TR/WCAG21/',
    },
    'traficom-home': {
      fi: 'https://www.saavutettavuusvaatimukset.fi/fi',
      sv: 'https://www.saavutettavuusvaatimukset.fi/sv',
      en: 'https://www.saavutettavuusvaatimukset.fi/en',
    },
    'traficom-complaint-form': {
      fi: 'https://www.saavutettavuusvaatimukset.fi/fi/kayttajan-oikeudet/tee-saavutettavuuskantelu-tai-pyyda-selvitysta',
      sv: 'https://www.saavutettavuusvaatimukset.fi/sv/dina-rattigheter/lamna-en-tillganglighetsklagan-eller-be-om-en-utredning',
      en: 'https://www.saavutettavuusvaatimukset.fi/en/user-rights/submit-complaint-web-accessibility-or-request-clarification',
    },
  };

  const link = Object.keys(accessibilityStatementPageLinks).find((k) => k === linkName);

  if (!link) {
    console.error(`Asked for link ${linkName} but it was not defined in configuration.`);
    return '#'; // In order to avoid undefined behavior
  }

  return accessibilityStatementPageLinks[link][language];
};

function AccessibilityStatementPage() {
  const { translate: t, getCurrentLanguage } = useTranslation();
  const currentLanguage = getCurrentLanguage();

  return (
    <div
      className={cn(
        'flex flex-col w-max-[1200px] w-full xl:w-[1200px]',
        'ml-6 mr-6 xl:ml-auto xl:mr-auto pt-6',
        'break-words',
        '[&>h3]:mt-4 [&>h3]:font-bold',
        '[&>h4]:mt-4 [&>h4]:font-bold',
        '[&>p]:pb-4',
      )}
    >
      <h2 className="font-bold text-brand-darkblue pb-4 text-left md:text-center">
        {t('pages.accessibility-statement.title')}
      </h2>

      {/* Introduction */}
      <p>{t('pages.accessibility-statement.description.main')}</p>
      <a
        href={getAccessibilityStatementPageLinkLink(currentLanguage, 'wcag-2.1')}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-fit underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
      >
        {t('pages.accessibility-statement.description.main.link')}
        <ExternalLinkIcon className="h-[15px]" />
      </a>

      <p className="pt-4">{t('pages.accessibility-statement.description.secondary')}</p>

      {/* Current status of service's accessibility */}
      <h3>{t('pages.accessibility-statement.status.title')}</h3>
      <p>{t('pages.accessibility-statement.status.description')}</p>

      {/* List of accessibility issues */}
      <h3>{t('pages.accessibility-statement.issues.title')}</h3>
      <h4>{t('pages.accessibility-statement.issues.disclaimer')}</h4>
      <p>{t('pages.accessibility-statement.issues.disclaimer.description')}</p>

      <h4>{t('pages.accessibility-statement.issues.list.title')}</h4>

      {issues.map((issue) => (
        <section key={issue} className="bg-brand-gold-20 p-2 m-2 [&>*]:pt-2">
          <p>{t(`pages.accessibility-statement.issues.${issue}.title`)}</p>
          <p className="text-sm font-bold pt-1 pb-1">{t('pages.accessibility-statement.issues.subTitle1')}</p>
          <p>{t(`pages.accessibility-statement.issues.${issue}.description`)}</p>
          <p className="text-sm font-bold pt-1 pb-1">{t('pages.accessibility-statement.issues.subTitle2')}</p>
          <p>{t(`pages.accessibility-statement.issues.${issue}.wcag`)}</p>
        </section>
      ))}

      {/* Feedback */}
      <h3>{t('pages.accessibility-statement.feedback.title')}</h3>
      <p>{t('pages.accessibility-statement.feedback.description')}</p>

      <h4>{t('pages.accessibility-statement.feedback.contact.title')}</h4>
      <p>{t('pages.accessibility-statement.feedback.contact.email')}</p>

      {/* Control authority */}
      <h3>{t('pages.accessibility-statement.authority.title')}</h3>
      {t('pages.accessibility-statement.authority.description')}

      <a
        href={getAccessibilityStatementPageLinkLink(currentLanguage, 'traficom-complaint-form')}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-fit pt-4 pb-4 underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
      >
        {t('pages.accessibility-statement.authority.description.link')}
        <ExternalLinkIcon className="h-[15px]" />
      </a>

      <div className="pb-8">
        <h4 className="mt-4 font-bold">{t('pages.accessibility-statement.authority.contact.title')}</h4>
        <p>{t('pages.accessibility-statement.authority.contact.organization')}</p>
        <p>{t('pages.accessibility-statement.authority.contact.department')}</p>

        <a
          href={getAccessibilityStatementPageLinkLink(currentLanguage, 'traficom-home')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        >
          {t('pages.accessibility-statement.authority.contact.website')}
          <ExternalLinkIcon className="h-[15px]" />
        </a>
        <p>{t('pages.accessibility-statement.authority.contact.email')}</p>
        <p>{t('pages.accessibility-statement.authority.contact.phone')}</p>
      </div>
    </div>
  );
}

export default AccessibilityStatementPage;
