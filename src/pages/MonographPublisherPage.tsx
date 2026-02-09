import { useParams } from 'react-router';

import { useQuery } from '@tanstack/react-query';

import { Card, CardContent } from '@/components/shadcn/card';
import ContentWrapper from '@/components/layout-utils/ContentWrapper';
import ErrorDisplay from '@/components/ErrorDisplay';
import LoadingDisplay from '@/components/LoadingDisplay';
import MonographPublisherDataEntry from '@/components/monograph-publisher-page/MonographPublisherDataEntry';
import NatlibfiHeading from '@/components/text/NatlibfiHeading';
import Toolbar from '@/components/toolbar/Toolbar';

import { useReadMonographPublisher } from '@/queries/use-monograph-publisher-query';
import useTranslation from '@/hooks/useTranslation';

function MonographPublisherPage() {
  const { translate: t } = useTranslation();

  // Cast typing as suggested in https://stackoverflow.com/a/75711570
  const { monographPublisherId } = useParams() as {
    monographPublisherId: string;
  };

  const { data, isPending, isError } = useQuery(useReadMonographPublisher(monographPublisherId));

  if (isPending) {
    return <LoadingDisplay />;
  }

  if (isError) {
    return <ErrorDisplay />;
  }

  const publisherHasQuitted = data?.hasQuitted === true;
  const title = publisherHasQuitted
    ? `${data?.officialName} / ${t('pages.monograph-publisher.has-quitted')}`
    : data?.officialName;

  const hasIsbnPublisherRanges = data?.isbnSubRanges && data.isbnSubRanges.length > 0;
  const hasIsmnPublisherRanges = data?.isbnSubRanges && data.ismnSubRanges.length > 0;

  return (
    <ContentWrapper>
      <Toolbar />
      <NatlibfiHeading size={'l'} className={publisherHasQuitted ? 'text-brand-red wrap-anywhere' : 'wrap-anywhere'}>
        {t('pages.monograph-publisher.heading')}: {title}
      </NatlibfiHeading>

      <Card>
        <CardContent>
          <div className={'grid max-lg:gap-y-2 lg:grid-cols-2 lg:gap-x-2'}>
            <MonographPublisherDataEntry
              heading={t('pages.monograph-publisher.previous-names')}
              value={data?.previousNames}
            />

            <MonographPublisherDataEntry
              heading={t('data-tables.monograph-publisher.headers.other-names')}
              value={data?.otherNames}
            />

            <MonographPublisherDataEntry
              heading={t('forms.common.fields.address')}
              value={`${data?.address}, ${data?.zip} ${data?.city}`}
            />

            <MonographPublisherDataEntry heading={t('forms.common.fields.phone')} value={data?.phone} />

            <MonographPublisherDataEntry heading={t('forms.monograph-publishers.fields.www')} value={data?.www} />

            {hasIsbnPublisherRanges && (
              <MonographPublisherDataEntry
                heading={t('pages.monograph-publisher.headings.isbn-publisher-ranges')}
                value={data?.isbnSubRanges.map((isbnSubRange) => isbnSubRange.publisherIdentifier)}
              />
            )}

            {hasIsmnPublisherRanges && (
              <MonographPublisherDataEntry
                heading={t('pages.monograph-publisher.headings.ismn-publisher-ranges')}
                value={data?.ismnSubRanges.map((ismnSubRange) => ismnSubRange.publisherIdentifier)}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </ContentWrapper>
  );
}

export default MonographPublisherPage;
