import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useQuery } from '@tanstack/react-query';

import { Turnstile } from '@marsidev/react-turnstile';
import { ClipLoader } from 'react-spinners';

import { Button } from '@/components/shadcn/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/shadcn/dialog';

import ContentWrapper from '@/components/layout-utils/ContentWrapper';
import ErrorDisplay from '@/components/ErrorDisplay';
import FormTermsAndConditions from '@/components/forms/terms-and-conditions/FormTermsAndConditions';
import LoadingDisplay from '@/components/LoadingDisplay';
import NatlibfiHeading from '@/components/text/NatlibfiHeading';

import useAlert from '@/hooks/useAlert';
import useApplicationConfiguration from '@/hooks/useApplicationConfiguration';
import useTranslation from '@/hooks/useTranslation';

import { useReadPublisherIdentifierPublicInfo } from '@/queries/use-identifierbatch-query';
import { downloadIdentifiers } from '@/api/identifier-batches';

import { asIdNumber } from '@/utils/generic-utils';

function IdentifierBatchDownloadPage({ publisherIdentifierType }: { publisherIdentifierType: 'isbn' | 'ismn' }) {
  const navigate = useNavigate();
  const { translate: t } = useTranslation();
  const { isProductionLikeEnvironment, turnstileSiteKey } = useApplicationConfiguration();
  const { displayAlert } = useAlert();

  const useTurnstile = isProductionLikeEnvironment; // To improve code readability

  const [conditionsAccepted, setConditionsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Cast typing as suggested in https://stackoverflow.com/a/75711570
  const { publisherIdentifierIdString } = useParams() as {
    publisherIdentifierIdString: string;
  };

  const publisherIdentifierId = asIdNumber(publisherIdentifierIdString);
  const { data, isPending, isError } = useQuery(
    useReadPublisherIdentifierPublicInfo(publisherIdentifierType, publisherIdentifierId),
  );

  if (isPending) {
    return <LoadingDisplay />;
  }

  if (isError) {
    return <ErrorDisplay />;
  }

  // Some formatting. Could be improved.
  const confirmationFinnish = t('components.identifierbatches.dialog.description-fi')
    .replace('#PUBLISHER', data.publisher_name)
    .replace('#PUBLISHER-IDENTIFIER', data.publisher_identifier);

  const confirmationSwedish = t('components.identifierbatches.dialog.description-sv')
    .replace('#PUBLISHER', data.publisher_name)
    .replace('#PUBLISHER-IDENTIFIER', data.publisher_identifier);

  const confirmationEnglish = t('components.identifierbatches.dialog.description-en')
    .replace('#PUBLISHER', data.publisher_name)
    .replace('#PUBLISHER-IDENTIFIER', data.publisher_identifier);

  const acceptConditions = () => setConditionsAccepted(true);
  const redirectToHome = () => navigate('/');
  const handleDialogOpenChange = (open: boolean) => {
    if (!open && !conditionsAccepted) {
      return redirectToHome();
    }
  };

  const handleDownload = async () => {
    setSubmitting(true);

    // Turnstile
    let attempts = 0;
    let turnstileToken = undefined;

    // Attempt fetching turnstile token for maximum of 20 seconds
    while (useTurnstile && !turnstileToken && attempts < 20) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      attempts++;

      turnstileToken = window.turnstile?.getResponse();
    }

    // Throw error if turnstile token did not resolve
    try {
      if (useTurnstile && !turnstileToken) {
        displayAlert({
          titleTranslationKey: 'errors.api.turnstile',
          description: t('errors.instructions.generic'),
        });
      }

      await downloadIdentifiers(publisherIdentifierType, publisherIdentifierId, turnstileToken);
      // eslint-disable-next-line
    } catch (_error) {
      displayAlert({
        titleTranslationKey: 'errors.api.generic',
        description: t('errors.instructions.generic'),
      });
    }

    setSubmitting(false);
  };

  if (conditionsAccepted) {
    return (
      <ContentWrapper>
        {/* TODO: refactor as separate component */}
        <Dialog defaultOpen onOpenChange={handleDialogOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('components.identifier.dialog.title')}</DialogTitle>
              <DialogDescription>
                {confirmationFinnish}
                <br />
                <br />
                {confirmationSwedish}
                <br />
                <br />
                {confirmationEnglish}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col md:flex-row md:justify-center gap-4 md:gap-8 pt-4">
              <Button onClick={redirectToHome} variant="destructive">
                {t('components.identifierbatches.dialog.decline')}
              </Button>

              <Button onClick={acceptConditions} variant="submit">
                {t('components.identifierbatches.dialog.accept')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </ContentWrapper>
    );
  }

  // During submitting render turnstile
  if (submitting) {
    return (
      <ContentWrapper>
        <div>{useTurnstile && <Turnstile siteKey={turnstileSiteKey} />}</div>
        <div className="mt-10">
          <ClipLoader size={60} speedMultiplier={0.75} color="blue" />
        </div>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper>
      <NatlibfiHeading size={'l'}>
        {t('pages.identifierbatch-download.title')} ({publisherIdentifierType.toUpperCase()}) / {data.publisher_name} /{' '}
        {data.publisher_identifier}
      </NatlibfiHeading>

      <Button className="w-64 mb-8 cursor-pointer" onClick={handleDownload} variant="default">
        {t('components.identifierbatches.card.download')}
      </Button>

      <FormTermsAndConditions type="download" />
    </ContentWrapper>
  );
}

export default IdentifierBatchDownloadPage;
