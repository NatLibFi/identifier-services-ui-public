import { useEffect } from 'react';
import type { UseFieldArrayRemove, UseFormReturn } from 'react-hook-form';

import { Trash2 } from 'lucide-react';

import { Button } from '@/components/shadcn/button';
import { Card, CardContent, CardHeader } from '@/components/shadcn/card';

import CommonCheckbox from '@/components/forms/fields/CommonCheckbox';
import CommonInputField from '@/components/forms/fields/CommonInputField';
import CommonSelectField from '@/components/forms/fields/CommonSelectField';
import ResponsiveTwoColumnBlock from '@/components/forms/field-layouts/ResponsiveTwoColumnBlock';

import useTranslation from '@/hooks/useTranslation';

import {
  PUBLICATION_LANGUAGE,
  SERIAL_PUBLICATION_FREQUENCY,
  SERIAL_PUBLICATION_FREQUENCY_VALUES,
  SERIAL_PUBLICATION_MEDIUMS,
  SERIAL_PUBLICATION_TYPE,
} from '@/constants';

import type { SerialPublicationFormV1 } from '@/schemas/serial-publication-form.schema';

interface SerialPublicationCardProps extends React.ComponentProps<'div'> {
  form: UseFormReturn<SerialPublicationFormV1>;
  idx: number;
  removePublications: UseFieldArrayRemove;
}

function SerialPublicationCard({ form, idx, removePublications, ...props }: SerialPublicationCardProps) {
  const { translate: t } = useTranslation();
  const { setValue, watch } = form;

  // Watcher definitions
  const watchFrequency = watch(`publications.${idx}.frequency`);
  const watchPublicationType = watch(`publications.${idx}.publicationType`);
  const watchMedium = watch(`publications.${idx}.medium`);

  const watchHasPrevious = watch(`publications.${idx}.hasPrevious`);
  const watchHasMainSeries = watch(`publications.${idx}.hasMainSeries`);
  const watchHasSubseries = watch(`publications.${idx}.hasSubseries`);
  const watchHasAnotherMedium = watch(`publications.${idx}.hasAnotherMedium`);

  const showOtherFrequencyFields = watchFrequency === SERIAL_PUBLICATION_FREQUENCY.OTHER.value;
  const showOtherPublicationTypeFields = watchPublicationType === SERIAL_PUBLICATION_TYPE.OTHER_SERIAL;
  const showPrintMediumFields = watchMedium === SERIAL_PUBLICATION_MEDIUMS.PRINTED;
  const showOnlineMediumFields = watchMedium === SERIAL_PUBLICATION_MEDIUMS.ONLINE;
  const showOtherMediumFields = watchMedium === SERIAL_PUBLICATION_MEDIUMS.OTHER;

  const showPreviousFields = watchHasPrevious === true;
  const showMainSeriesFields = watchHasMainSeries === true;
  const showSubseriesFields = watchHasSubseries === true;
  const showAnotherMediumFields = watchHasAnotherMedium === true;

  // Watcher-based logic
  // Reset field values when they are not displayed

  // Reset frequencyOther
  useEffect(() => {
    if (!showOtherFrequencyFields) {
      setValue(`publications.${idx}.frequencyOther`, '');
    }
  }, [idx, showOtherFrequencyFields, setValue]);

  // Reset publicationTypeOther
  useEffect(() => {
    if (!showOtherPublicationTypeFields) {
      setValue(`publications.${idx}.publicationTypeOther`, '');
    }
  }, [idx, showOtherPublicationTypeFields, setValue]);

  // Reset printer
  useEffect(() => {
    if (!showPrintMediumFields) {
      setValue(`publications.${idx}.printer`, '');
    }
  }, [idx, setValue, showPrintMediumFields]);

  // Reset url
  useEffect(() => {
    if (!showOnlineMediumFields) {
      setValue(`publications.${idx}.url`, '');
    }
  }, [idx, setValue, showOnlineMediumFields]);

  // Reset mediumOther
  useEffect(() => {
    if (!showOtherMediumFields) {
      setValue(`publications.${idx}.mediumOther`, '');
    }
  }, [idx, setValue, showOtherMediumFields]);

  // Reset previous fields
  useEffect(() => {
    if (!showPreviousFields) {
      setValue(`publications.${idx}.previous.title`, '');
      setValue(`publications.${idx}.previous.issn`, '');
      setValue(`publications.${idx}.previous.lastIssue`, '');
    }
  }, [idx, setValue, showPreviousFields]);

  // Reset mainSeries fields
  useEffect(() => {
    if (!showMainSeriesFields) {
      setValue(`publications.${idx}.mainSeries.title`, '');
      setValue(`publications.${idx}.mainSeries.issn`, '');
    }
  }, [idx, setValue, showMainSeriesFields]);

  // Reset subseries fields
  useEffect(() => {
    if (!showSubseriesFields) {
      setValue(`publications.${idx}.subseries.title`, '');
      setValue(`publications.${idx}.subseries.issn`, '');
    }
  }, [idx, setValue, showSubseriesFields]);

  // Reset anotherMedium fields
  useEffect(() => {
    if (!showAnotherMediumFields) {
      setValue(`publications.${idx}.anotherMedium.title`, '');
      setValue(`publications.${idx}.anotherMedium.issn`, '');
    }
  }, [idx, setValue, showAnotherMediumFields]);

  return (
    <Card {...props}>
      <CardHeader className="pb-2 flex items-baseline justify-between gap-4">
        {t('forms.serial-publications.headings.publication-information')} #{idx + 1}
        <Button
          aria-label={t('forms.serial-publications.fields.delete-publication')}
          variant="outline"
          size="sm"
          onClick={() => removePublications(idx)}
          disabled={form.getValues('publications').length < 2} // Disallow removal when only one publication is defined
        >
          <Trash2 />
          <p className="hidden md:block">{t('forms.serial-publications.fields.delete-publication')}</p>
        </Button>
      </CardHeader>
      <CardContent>
        <ResponsiveTwoColumnBlock>
          {/* title */}
          <CommonInputField
            form={form}
            fieldName={`publications.${idx}.title`}
            fieldBaseTranslateId="forms.serial-publications.fields.title"
            required
          />

          {/* subtitle */}
          <CommonInputField
            form={form}
            fieldName={`publications.${idx}.subtitle`}
            fieldBaseTranslateId="forms.serial-publications.fields.subtitle"
          />

          {/* placeOfPublication */}
          <CommonInputField
            className="lg:col-span-2"
            form={form}
            fieldName={`publications.${idx}.placeOfPublication`}
            fieldBaseTranslateId="forms.serial-publications.fields.place-of-publication"
            required
          />

          {/* issuedFromYear */}
          <CommonInputField
            form={form}
            fieldName={`publications.${idx}.issuedFromYear`}
            fieldBaseTranslateId="forms.serial-publications.fields.issued-from-year"
            required
          />

          {/* issuedFromNumber */}
          <CommonInputField
            form={form}
            fieldName={`publications.${idx}.issuedFromNumber`}
            fieldBaseTranslateId="forms.serial-publications.fields.issued-from-number"
            required
          />

          {/* frequency */}
          <CommonSelectField
            form={form}
            fieldName={`publications.${idx}.frequency`}
            fieldBaseTranslateId="forms.serial-publications.fields.frequency"
            selectOptions={SERIAL_PUBLICATION_FREQUENCY_VALUES}
            required
          />

          {/* frequencyOther */}
          {showOtherFrequencyFields && (
            <CommonInputField
              form={form}
              fieldName={`publications.${idx}.frequencyOther`}
              fieldBaseTranslateId="forms.serial-publications.fields.frequency-other"
              required
            />
          )}

          {/* language */}
          <CommonSelectField
            form={form}
            fieldName={`publications.${idx}.language`}
            fieldBaseTranslateId="forms.common.fields.language"
            selectOptions={Object.keys(PUBLICATION_LANGUAGE)}
            required
          />

          <ResponsiveTwoColumnBlock asChild>
            {/* publicationType */}
            <CommonSelectField
              form={form}
              fieldName={`publications.${idx}.publicationType`}
              fieldBaseTranslateId="forms.serial-publications.fields.publication-type"
              selectOptions={Object.keys(SERIAL_PUBLICATION_TYPE)}
              required
            />

            {/* publicationTypeOther */}
            {showOtherPublicationTypeFields && (
              <CommonInputField
                form={form}
                fieldName={`publications.${idx}.publicationTypeOther`}
                fieldBaseTranslateId="forms.serial-publications.fields.publication-type-other"
                required
              />
            )}
          </ResponsiveTwoColumnBlock>

          <ResponsiveTwoColumnBlock asChild>
            {/* medium */}
            <CommonSelectField
              form={form}
              fieldName={`publications.${idx}.medium`}
              fieldBaseTranslateId="forms.serial-publications.fields.medium"
              selectOptions={Object.keys(SERIAL_PUBLICATION_MEDIUMS)}
              required
            />

            {/* printer */}
            {showPrintMediumFields && (
              <CommonInputField
                form={form}
                fieldName={`publications.${idx}.printer`}
                fieldBaseTranslateId="forms.serial-publications.fields.printer"
              />
            )}

            {/* mediumOther */}
            {showOtherMediumFields && (
              <CommonInputField
                form={form}
                fieldName={`publications.${idx}.mediumOther`}
                fieldBaseTranslateId="forms.serial-publications.fields.medium-other"
                required
              />
            )}

            {/* url */}
            {showOnlineMediumFields && (
              <CommonInputField
                form={form}
                fieldName={`publications.${idx}.url`}
                fieldBaseTranslateId="forms.serial-publications.fields.url"
                required
              />
            )}
          </ResponsiveTwoColumnBlock>

          {/* previous */}

          {/* hasPrevious */}
          <ResponsiveTwoColumnBlock asChild>
            <CommonCheckbox
              form={form}
              fieldName={`publications.${idx}.hasPrevious`}
              fieldBaseTranslateId="forms.serial-publications.fields.has-previous"
            />
          </ResponsiveTwoColumnBlock>

          {showPreviousFields && (
            <ResponsiveTwoColumnBlock asChild>
              {/* previous - title */}
              <CommonInputField
                form={form}
                fieldName={`publications.${idx}.previous.title`}
                fieldBaseTranslateId="forms.serial-publications.fields.previous.title"
                required
              />

              {/* previous - issn */}
              <CommonInputField
                form={form}
                fieldName={`publications.${idx}.previous.issn`}
                fieldBaseTranslateId="forms.serial-publications.fields.previous.issn"
              />

              {/* previous - lastIssued */}
              <CommonInputField
                form={form}
                fieldName={`publications.${idx}.previous.lastIssue`}
                fieldBaseTranslateId="forms.serial-publications.fields.previous.last-issued"
                required
              />
            </ResponsiveTwoColumnBlock>
          )}

          {/* mainSeries */}

          {/* hasMainSeries */}
          <ResponsiveTwoColumnBlock asChild>
            <CommonCheckbox
              form={form}
              fieldName={`publications.${idx}.hasMainSeries`}
              fieldBaseTranslateId="forms.serial-publications.fields.has-main-series"
            />
          </ResponsiveTwoColumnBlock>

          {showMainSeriesFields && (
            <ResponsiveTwoColumnBlock asChild>
              {/* mainSeries - title */}
              <CommonInputField
                form={form}
                fieldName={`publications.${idx}.mainSeries.title`}
                fieldBaseTranslateId="forms.serial-publications.fields.main-series.title"
                required
              />

              {/* mainSeries - issn */}
              <CommonInputField
                form={form}
                fieldName={`publications.${idx}.mainSeries.issn`}
                fieldBaseTranslateId="forms.serial-publications.fields.main-series.issn"
              />
            </ResponsiveTwoColumnBlock>
          )}

          {/* subseries */}
          {/* hasSubseries */}
          <ResponsiveTwoColumnBlock asChild>
            <CommonCheckbox
              form={form}
              fieldName={`publications.${idx}.hasSubseries`}
              fieldBaseTranslateId="forms.serial-publications.fields.has-subseries"
            />
          </ResponsiveTwoColumnBlock>

          {showSubseriesFields && (
            <ResponsiveTwoColumnBlock asChild>
              {/* subseries - title */}
              <CommonInputField
                form={form}
                fieldName={`publications.${idx}.subseries.title`}
                fieldBaseTranslateId="forms.serial-publications.fields.subseries.title"
                required
              />

              {/* subseries - issn */}
              <CommonInputField
                form={form}
                fieldName={`publications.${idx}.subseries.issn`}
                fieldBaseTranslateId="forms.serial-publications.fields.subseries.issn"
              />
            </ResponsiveTwoColumnBlock>
          )}

          {/* anotherMedium */}

          {/* hasAnotherMedium */}
          <ResponsiveTwoColumnBlock asChild>
            <CommonCheckbox
              form={form}
              fieldName={`publications.${idx}.hasAnotherMedium`}
              fieldBaseTranslateId="forms.serial-publications.fields.has-another-medium"
            />
          </ResponsiveTwoColumnBlock>

          {showAnotherMediumFields && (
            <ResponsiveTwoColumnBlock asChild>
              {/* anotherMedium - title */}
              <CommonInputField
                form={form}
                fieldName={`publications.${idx}.anotherMedium.title`}
                fieldBaseTranslateId="forms.serial-publications.fields.another-medium.title"
                required
              />

              {/* anotherMedium - issn */}
              <CommonInputField
                form={form}
                fieldName={`publications.${idx}.anotherMedium.issn`}
                fieldBaseTranslateId="forms.serial-publications.fields.another-medium.issn"
              />
            </ResponsiveTwoColumnBlock>
          )}

          <div className="lg:col-span-2">
            <CommonInputField
              form={form}
              fieldName={`publications.${idx}.additionalInfo`}
              fieldBaseTranslateId="forms.serial-publications.fields.additional-info"
            />
          </div>
        </ResponsiveTwoColumnBlock>
      </CardContent>
    </Card>
  );
}

export default SerialPublicationCard;
