import { AlertTriangleIcon, ExternalLinkIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn/alert';

import SerialPublicationTermsAndConditions from '@/components/forms/terms-and-conditions/SerialPublicationTermsAndConditions';
import MonographPublisherTermsAndConditions from '@/components/forms/terms-and-conditions/MonographPublisherTermsAndConditions';
import MonographPublicationTermsAndConditions from '@/components/forms/terms-and-conditions/MonographPublicationTermsAndConditions';

import useTranslation from '@/hooks/useTranslation';

function FormTermsAndConditions({ type }: { type: string }) {
  const isIsbnIsmn = type === 'isbnIsmn';
  const isMonographPublisher = type === 'monographPublisher';
  const isMonographPublication = type === 'monographPublication';
  const isSerialPublication = type === 'serialPublication';
  const isDownload = type === 'download';

  const { translate: t } = useTranslation();

  return (
    <div>
      <Alert variant="default" className="z-[-1]">
        <AlertTriangleIcon />
        <AlertTitle>{t('components.form-terms-and-conditions.title')}</AlertTitle>
        <AlertDescription className="text-black">
          {isIsbnIsmn && t('components.form-terms-and-conditions.isbn-ismn')}
          {!isDownload && t('components.form-terms-and-conditions.common')}
          {isDownload && t('components.form-terms-and-conditions.download')}
        </AlertDescription>
      </Alert>

      <div className="flex max-sm:flex-col gap-6 md:ml-2 pt-4">
        <a
          href="https://www.cloudflare.com/privacypolicy/"
          target="blank"
          rel="noopener noreferrer"
          className="flex items-baseline underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        >
          {t('components.form-terms-and-conditions.links.cf-privacy-policy')}
          <ExternalLinkIcon className="h-[15px]" />
        </a>

        <a
          href="https://www.cloudflare.com/website-terms/"
          target="blank"
          rel="noopener noreferrer"
          className="flex items-baseline underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        >
          {t('components.form-terms-and-conditions.links.cf-terms-of-use')}
          <ExternalLinkIcon className="h-[15px]" />
        </a>
      </div>

      {isMonographPublication && <MonographPublicationTermsAndConditions />}
      {isMonographPublisher && <MonographPublisherTermsAndConditions />}
      {isSerialPublication && <SerialPublicationTermsAndConditions />}
    </div>
  );
}

export default FormTermsAndConditions;
