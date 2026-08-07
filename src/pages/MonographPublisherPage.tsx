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

  const publisherHasQuitted = data.has_quitted === true;
  const title = publisherHasQuitted
    ? `${data.official_name} / ${t('pages.monograph-publisher.has-quitted')}`
    : data.official_name;

  const hasIsbnPublisherRanges = data.isbn_publisher_ranges.length > 0;
  const hasIsmnPublisherRanges = data.ismn_publisher_ranges.length > 0;

  // Construct address
  let addressString = '';
  if (data.address) addressString += `${data.address}, `;
  if (data.zip) addressString += `${data.zip}, `;
  if (data.city) addressString += `${data.city} `;

  if (addressString.length === 0) addressString = '-';
  if (addressString.length > 0) addressString = addressString.replace(/,\s$/, '').trim();

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
              value={data.previous_names.join(', ')}
            />

            <MonographPublisherDataEntry
              heading={t('data-tables.monograph-publisher.headers.other-names')}
              value={data.other_names.join(', ')}
            />

            <MonographPublisherDataEntry heading={t('forms.common.fields.address')} value={addressString} />

            <MonographPublisherDataEntry heading={t('forms.common.fields.phone')} value={data.phone} />

            <MonographPublisherDataEntry heading={t('forms.monograph-publishers.fields.www')} value={data.www} />

            {hasIsbnPublisherRanges && (
              <MonographPublisherDataEntry
                heading={t('pages.monograph-publisher.headings.isbn-publisher-ranges')}
                value={data.isbn_publisher_ranges.map(({ publisher_identifier }) => publisher_identifier)}
              />
            )}

            {hasIsmnPublisherRanges && (
              <MonographPublisherDataEntry
                heading={t('pages.monograph-publisher.headings.ismn-publisher-ranges')}
                value={data.ismn_publisher_ranges.map(({ publisher_identifier }) => publisher_identifier)}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </ContentWrapper>
  );
}

export default MonographPublisherPage;
