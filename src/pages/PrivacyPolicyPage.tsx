import { cn } from '@/lib/utils';
import useTranslation from '@/hooks/useTranslation';

const parts = [
  '1a',
  '1b',
  ...Array.from({ length: 13 }, (_x, i) => `${i + 2}`), // '2' ... '14'
];

// Part 5 contains multiple sub-headings
const part5Configuration: Record<string, string[]> = {
  'publisher-information': [
    'language',
    'name',
    'contact-person-info',
    'address',
    'other-names',
    'publisher-identifier',
    'additional-information',
    'publisher-classification',
  ],
  'publication-information': [
    'publisher-name',
    'publisher-email',
    'publisher-address',
    'publisher-contact-person',
    'publisher-phone',
    'author-information',
  ],
  'superuser-information': ['name', 'username', 'password', 'personal-settings', 'email'],
  personalization: ['settings'],
  other: ['mandatoryInfo', 'error-and-misconduct-info'],
};

function PrivacyPolicyPage() {
  const { translate: t } = useTranslation();

  return (
    <div
      className={cn(
        'flex flex-col w-max-[1200px] w-full xl:w-[1200px]',
        'ml-6 mr-6 xl:ml-auto xl:mr-auto pt-6 pb-6',
        'break-words',
        '[&>div]:pb-6',
        '[&_h3]:font-bold [&_h3]:text-lg [&_h3]:pb-2',
        '[&_h4]:font-bold [&_h4]:text-md',
        '[&_p]:pb-4',
      )}
    >
      <h2 className="font-bold text-brand-darkblue pb-4 text-left md:text-center">{t('pages.privacy-policy.title')}</h2>

      {parts.map((part) => (
        <div key={part}>
          <h3>{t(`pages.privacy-policy.${part}.title`)}</h3>
          {/* Part 5 and 11 have different structure than other parts */}
          {part === '5' && (
            <div>
              <p>{t('pages.privacy-policy.5.prefix')}</p>
              {Object.keys(part5Configuration).map((key) => (
                <div key={key} className="pb-6">
                  <b>{t(`pages.privacy-policy.5.${key}`)}</b>
                  <ul className="pt-1">
                    {part5Configuration[key].map((info) => (
                      <li key={info} className="list-inside list-disc">
                        {t(`pages.privacy-policy.5.${key}.${info}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <p>{t('pages.privacy-policy.5.suffix')}</p>
            </div>
          )}

          {part === '11' &&
            ['1', '2', '3'].map((key) => (
              <div key={key}>
                <b>{t(`pages.privacy-policy.11.part${key}.boldContent`)}</b>
                <p>{t(`pages.privacy-policy.11.part${key}.content`)}</p>
              </div>
            ))}

          {!['5', '11'].includes(part) && (
            <div className="whitespace-pre-wrap">{t(`pages.privacy-policy.${part}.content`)}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PrivacyPolicyPage;
