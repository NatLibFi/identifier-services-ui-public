/* This form schema is based on original work by Petteri Kivimäki https://github.com/petkivim/ (Identifier Registry) */

import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Turnstile } from '@marsidev/react-turnstile';

import { AlertCircleIcon } from 'lucide-react';
import { ClipLoader } from 'react-spinners';

import { Button } from '@/components/shadcn/button';

import { Card, CardContent, CardHeader } from '@/components/shadcn/card';
import { Field, FieldError, FieldLabel } from '@/components/shadcn/field';

import { MultiSelect } from '@/components/shadcn-custom/multi-select';

import CommonInputField from '@/components/forms/fields/CommonInputField';
import CommonSelectField from '@/components/forms/fields/CommonSelectField';
import ContentWrapper from '@/components/layout-utils/ContentWrapper';

import BooleanSelectField from '@/components/forms/fields/BooleanSelectField';
import FormTermsAndConditions from '@/components/forms/terms-and-conditions/FormTermsAndConditions';

import NatlibfiBodyText from '@/components/text/NatlibfiBodyText';
import NatlibfiHeading from '@/components/text/NatlibfiHeading';

import useAlert from '@/hooks/useAlert';
import useTranslation from '@/hooks/useTranslation';
import useApplicationConfiguration from '@/hooks/useApplicationConfiguration';

import {
  monographPublicationFormV1Schema,
  type MonographPublicationFormV1,
} from '@/schemas/monograph-publication-form.schema';

import {
  LANG_CODES,
  MONOGRAPH_PUBLICATION_AUTHOR_ROLE_MULTISELECT,
  MONOGRAPH_PUBLICATION_ELECTRONICAL_TYPE,
  MONOGRAPH_PUBLICATION_ELECTRONICAL_TYPE_MULTISELECT,
  MONOGRAPH_PUBLICATION_FORMAT,
  PUBLICATION_LANGUAGE,
  MONOGRAPH_PUBLICATION_PRINT_TYPE,
  MONOGRAPH_PUBLICATION_PRINT_TYPE_MULTISELECT,
  MONOGRAPH_PUBLICATION_TYPE,
  MONOGRAPH_PUBLISHING_ACTIVITY,
} from '@/constants';

import { displayLanguageToLangCode } from '@/constants/display-languages';

import { createMonographPublicationRequestV1 } from '@/api/forms';
import { APIError } from '@/api/ApiError';
import { Separator } from '@/components/shadcn/separator';

import { pureTranslate } from '@/translation';

import { isInvalidPublishingMonth } from '@/utils/validation/monograph-publication-form-validation';
import { transforMonographPublicationFormDataV1 } from '@/utils/data-transformation/monograph-publication-form-transformation';
import { getParameterizedLink } from '@/utils/link-utils';

// For development utilize default values that allow fast iteration
// Not included in repo: just craft a similar object locally as the form defaultValues
// import { monographPublicationDevInit } from '@/form-dev-init/monograph-publication-dev-init';

function MonographPublicationForm() {
  const [conditionsAccepted, setConditionsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [searchParams] = useSearchParams();
  const useLink = (href: string) => getParameterizedLink(href, searchParams);

  const navigate = useNavigate();
  const { displayAlert } = useAlert();
  const { isProductionLikeEnvironment, turnstileSiteKey } = useApplicationConfiguration();
  const { translate: t, getCurrentLanguage } = useTranslation();

  const currentLanguage = getCurrentLanguage();
  const useTurnstile = isProductionLikeEnvironment; // To improve code readability

  const form = useForm<MonographPublicationFormV1>({
    resolver: zodResolver(monographPublicationFormV1Schema),
    mode: 'onTouched', // trigger validation on first onBlur and afterwards every onChange
    shouldFocusError: true,
    defaultValues: {
      officialName: '',
      publisherIdentifierStr: '',
      locality: '',
      address: '',
      zip: '',
      city: '',
      contactPerson: '',
      phone: '',
      email: '',
      langCode: displayLanguageToLangCode(currentLanguage),
      publishedBefore: 'true',
      publicationsPublic: '',
      publishingActivity: '',
      publishingActivityAmount: '',
      publicationType: '',
      publicationFormat: '',
      numberOfAuthors: '1',
      firstName1: '',
      lastName1: '',
      role1: [],
      firstName2: '',
      lastName2: '',
      role2: [],
      firstName3: '',
      lastName3: '',
      role3: [],
      firstName4: '',
      lastName4: '',
      role4: [],
      title: '',
      subtitle: '',
      mapScale: '',
      language: '',
      year: '',
      month: '',
      series: '',
      issn: '',
      volume: '',
      printingHouse: '',
      printingHouseCity: '',
      copies: '',
      edition: '',
      type: [],
      typeOther: '',
      comments: '',
      fileformat: [],
      fileformatOther: '',
    },

    // defaultValues: monographPublicationDevInit,
  });

  // Read all form values to subscribe to changes
  const {
    clearErrors,
    control,
    // formState: { errors },
    getValues,
    handleSubmit,
    setError,
    setValue,
    watch,
  } = form;

  // Watchers that affect which fields should be rendered and allow displaying errors through useEffect
  // See docs at: https://react-hook-form.com/docs/useform/watch
  const watchPublishedBefore = watch('publishedBefore');
  const watchPublicationType = watch('publicationType');
  const watchPublicationFormat = watch('publicationFormat');
  const watchNumAuthors = watch('numberOfAuthors');
  const watchFileformat = watch('fileformat');
  const watchType = watch('type');
  const watchYear = watch('year');
  const watchMonth = watch('month');

  // Field display based on watcher values
  const showPublisherIdentifierStr = watchPublishedBefore === 'true';
  const showDissertationFields = watchPublicationType === MONOGRAPH_PUBLICATION_TYPE.DISSERTATION;
  const showMapFields = watchPublicationType === MONOGRAPH_PUBLICATION_TYPE.MAP;
  const showNonUniversityFields = !showDissertationFields;

  const showPrintFields = [
    MONOGRAPH_PUBLICATION_FORMAT.PRINT,
    MONOGRAPH_PUBLICATION_FORMAT.PRINT_ELECTRONICAL,
  ].includes(watchPublicationFormat);

  const showElectronicalFields = [
    MONOGRAPH_PUBLICATION_FORMAT.ELECTRONICAL,
    MONOGRAPH_PUBLICATION_FORMAT.PRINT_ELECTRONICAL,
  ].includes(watchPublicationFormat);

  const showTypeOtherField = watchType.includes(MONOGRAPH_PUBLICATION_PRINT_TYPE.OTHER_PRINT);
  const showFileformatOtherField = watchFileformat.includes(MONOGRAPH_PUBLICATION_ELECTRONICAL_TYPE.OTHER);

  // Watcher-based logic
  // Reset publisherIdentifier when field is not displayed
  useEffect(() => {
    if (!showPublisherIdentifierStr) {
      setValue('publisherIdentifierStr', '');
    }
  }, [showPublisherIdentifierStr, setValue]);

  // Reset map scale
  useEffect(() => {
    if (!showMapFields) {
      setValue('mapScale', '');
    }
  }, [showMapFields, setValue]);

  // Manage dissertation field values
  useEffect(() => {
    // Set static locality for HY dissertations. Remove if publication type is changed.
    // Reset values of fields that are not shown for dissertations
    if (showDissertationFields) {
      setValue('officialName', 'Helsingin yliopisto');
      setValue('locality', 'Helsinki');
      setValue('publishingActivity', undefined);
      setValue('publishingActivityAmount', '');
      setValue('copies', '');
      setValue('publishedBefore', undefined);

      // By default dissertations are PRINT_ELECTRONICAL
      setValue('publicationFormat', MONOGRAPH_PUBLICATION_FORMAT.PRINT_ELECTRONICAL);
      setValue('type', [MONOGRAPH_PUBLICATION_PRINT_TYPE.PAPERBACK]);
      setValue('fileformat', [MONOGRAPH_PUBLICATION_ELECTRONICAL_TYPE.PDF]);

      // Only one author allowed
      setValue('numberOfAuthors', '1');

      // Remove information on other authors
      setValue('firstName2', '');
      setValue('lastName2', '');
      setValue('role2', []);

      setValue('firstName3', '');
      setValue('lastName3', '');
      setValue('role3', []);

      setValue('firstName4', '');
      setValue('lastName4', '');
      setValue('role4', []);
    } else {
      setValue('publishingActivity', '');
      setValue('publishedBefore', 'true');
      setValue('locality', '');

      // Note: these work only when dependency array enforces update if showDissertation changes
      // If forcing update every time when publicationType changes, this will empty fields unnecessarily
      setValue('officialName', '');
    }
  }, [showDissertationFields, setValue]);

  // Reset print field values if not print
  useEffect(() => {
    if (!showPrintFields) {
      setValue('type', []);
      setValue('typeOther', '');
      setValue('printingHouse', '');
      setValue('printingHouseCity', '');
      setValue('copies', '');
      setValue('fileformat', []);
      setValue('fileformatOther', '');
    }
  }, [showPrintFields, setValue]);

  // Reset typeOther if not selected as type
  useEffect(() => {
    if (!showTypeOtherField) {
      setValue('typeOther', '');
    }
  }, [showTypeOtherField, setValue]);

  // Reset fileformatOther if not selected as fileformat
  useEffect(() => {
    if (!showFileformatOtherField) {
      setValue('fileformatOther', '');
    }
  }, [showFileformatOtherField, setValue]);

  // Validate publishing time
  useEffect(() => {
    const publishingTimeIsDefined = watchMonth !== '' && watchYear !== '';
    const invalidMonth = publishingTimeIsDefined && isInvalidPublishingMonth(watchYear, watchMonth);

    if (invalidMonth) {
      setError('month', {
        message: pureTranslate(currentLanguage, 'forms.errors.monograph-publications.publication-date'),
      });
    } else {
      clearErrors('month');
    }
  }, [currentLanguage, watchMonth, watchYear, setError, clearErrors]);

  // Scroll on top after accepting the conditions, useful especially for mobile
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [conditionsAccepted]);

  // Display terms and conditions before entering the form if not in development environment
  const displayTermsAndConditions = isProductionLikeEnvironment && !conditionsAccepted;

  if (displayTermsAndConditions) {
    return (
      <ContentWrapper>
        <NatlibfiHeading size={'l'}>{t('forms.monograph-publications.title')}</NatlibfiHeading>
        <FormTermsAndConditions type="monographPublication" />
        <Button className="max-w-3xs mt-10 mb-10" onClick={() => setConditionsAccepted(true)}>
          {t('components.form-terms-and-conditions.accept')}
        </Button>
      </ContentWrapper>
    );
  }

  // During submitting render turnstile
  if (submitting) {
    return (
      <ContentWrapper>
        <NatlibfiHeading size={'l'}>{t('forms.monograph-publications.title')}</NatlibfiHeading>
        <div>
          <Turnstile siteKey={turnstileSiteKey} />
        </div>
        <div className="mt-10">
          <ClipLoader size={60} speedMultiplier={0.75} color="blue" />
        </div>
      </ContentWrapper>
    );
  }

  const onSubmitHandler = async (data: MonographPublicationFormV1) => {
    try {
      setSubmitting(true);

      let attempts = 0;
      let turnstileToken = undefined;

      // Attempt fetching turnstile token for maximum of 20 seconds
      while (useTurnstile && !turnstileToken && attempts < 20) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        attempts++;

        turnstileToken = window.turnstile?.getResponse();
      }

      // Throw error if turnstile token did not resolve
      if (useTurnstile && !turnstileToken) {
        throw new Error('Could not retrieve turnstile token in time');
      }

      const dataApiV1 = transforMonographPublicationFormDataV1(data, turnstileToken);
      await createMonographPublicationRequestV1(dataApiV1);

      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

      // eslint-disable-next-line react-hooks/rules-of-hooks
      return navigate(useLink('/form-success?form=monograph-publication'));
    } catch (error) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

      if (error instanceof APIError) {
        setSubmitting(false);
        console.error('Managed error occurred during API call: ', error.message);

        return displayAlert({
          titleTranslationKey: 'errors.api.generic',
          description: t('errors.instructions.generic'),
        });
      }

      setSubmitting(false);
      console.error('Unmanaged error occurred during API call: ', error);

      return displayAlert({
        titleTranslationKey: 'errors.api.unknown',
        description: t('errors.instructions.generic'),
      });
    }
  };

  return (
    <ContentWrapper>
      <NatlibfiHeading size={'l'}>{t('forms.monograph-publications.title')}</NatlibfiHeading>
      <NatlibfiBodyText>{t('forms.guide.star')}</NatlibfiBodyText>

      <div className="flex gap-4 mt-2 mb-2 text-destructive lg:col-span-2">
        <AlertCircleIcon />
        <p>{t('forms.errors.monograph-publications.publication-date')}</p>
      </div>

      <div>
        <form
          className="grid grid-cols-1 [&_input]:w-[100%] [&_[data-slot=form-item]]:pt-4 [&_[data-slot=card]]:mb-6 [&_[data-slot=card]]:gap-0"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          {/* Mandatory information */}
          <Card>
            <CardHeader className="pb-2">{t('forms.monograph-publications.headings.basic-information')}</CardHeader>
            <CardContent className="grid gap-y-4 lg:gap-y-6 lg:gap-x-4">
              <BooleanSelectField
                form={form}
                fieldName="publicationsPublic"
                fieldBaseTranslateId="forms.monograph-publications.fields.publications-public"
                required
              />

              {/* publicationType */}
              <CommonSelectField
                form={form}
                fieldName="publicationType"
                fieldBaseTranslateId="forms.monograph-publications.fields.publication-type"
                selectOptions={Object.keys(MONOGRAPH_PUBLICATION_TYPE)}
                required
              />

              {/* Dissertation notification */}
              {showDissertationFields && (
                <p className="mt-2 text-destructive">{t('forms.monograph-publications.notes.dissertation-locality')}</p>
              )}
            </CardContent>
          </Card>

          {/* Publisher information */}
          <Card>
            <CardHeader className="pb-2">
              {showNonUniversityFields && t('forms.monograph-publications.headings.publisher-information')}

              {showDissertationFields && t('forms.monograph-publications.headings.contact-information')}
            </CardHeader>
            <CardContent className="grid gap-y-4 lg:gap-y-6 lg:grid-cols-2 lg:gap-x-4">
              {/* publisherBefore (non-dissertations) */}
              {showNonUniversityFields && (
                <div className="lg:col-span-2">
                  <BooleanSelectField
                    form={form}
                    fieldName="publishedBefore"
                    fieldBaseTranslateId="forms.monograph-publications.fields.published-before"
                    required
                  />
                </div>
              )}

              {/* officialName (non-dissertations) */}
              <CommonInputField
                readOnly={showDissertationFields}
                form={form}
                fieldName="officialName"
                fieldBaseTranslateId="forms.common.fields.official-name"
                required
              />

              {/* publisherIdentifierStr (if published before) */}
              {showPublisherIdentifierStr && (
                <CommonInputField
                  form={form}
                  fieldName="publisherIdentifierStr"
                  fieldBaseTranslateId="forms.monograph-publications.fields.publisher-identifier-str"
                  hasDescription
                />
              )}

              {/* Contact person */}
              <CommonInputField
                form={form}
                fieldName="contactPerson"
                fieldBaseTranslateId="forms.common.fields.contact-person"
                required
              />

              {/* Address */}
              <CommonInputField
                autoComplete="address"
                form={form}
                fieldName="address"
                fieldBaseTranslateId="forms.common.fields.address"
                required
              />

              {/* Zip */}
              <CommonInputField form={form} fieldName="zip" fieldBaseTranslateId="forms.common.fields.zip" required />

              {/* City */}
              <CommonInputField form={form} fieldName="city" fieldBaseTranslateId="forms.common.fields.city" required />

              {/* Phone */}
              <CommonInputField
                autoComplete="phone"
                form={form}
                fieldName="phone"
                fieldBaseTranslateId="forms.common.fields.phone"
                required
              />

              {/* Email */}
              <CommonInputField
                autoComplete="email"
                form={form}
                fieldName="email"
                fieldBaseTranslateId="forms.common.fields.email"
                required
              />

              {/* langCode */}
              <CommonSelectField
                form={form}
                fieldName="langCode"
                fieldBaseTranslateId="forms.common.fields.language-code"
                selectOptions={Object.keys(LANG_CODES)}
                required
              />

              {/* publishingActivity (non-dissertations) */}
              {showNonUniversityFields && (
                <CommonSelectField
                  form={form}
                  fieldName="publishingActivity"
                  fieldBaseTranslateId="forms.monograph-publications.fields.publishing-activity"
                  selectOptions={Object.keys(MONOGRAPH_PUBLISHING_ACTIVITY)}
                  required
                />
              )}

              {/* publishingActivityAmount (non-dissertations) */}
              {showNonUniversityFields && (
                <CommonInputField
                  form={form}
                  fieldName="publishingActivityAmount"
                  fieldBaseTranslateId="forms.monograph-publications.fields.publishing-activity-amount"
                />
              )}
            </CardContent>
          </Card>

          {/* Publication basic information */}
          <Card>
            <CardHeader className="pb-2">
              {t('forms.monograph-publications.headings.publication-information')}
            </CardHeader>
            <CardContent className="grid gap-y-4 lg:gap-y-6 lg:grid-cols-2 lg:gap-x-4">
              {/* locality - display only HY as only option if publicationType is dissertation */}
              {showDissertationFields && (
                <div className="lg:col-span-2">
                  <CommonInputField
                    readOnly={true}
                    form={form}
                    fieldName="locality"
                    fieldBaseTranslateId="forms.monograph-publications.fields.locality"
                    required
                  />
                </div>
              )}

              {/* publicationFormat */}
              <div className="lg:col-span-2">
                <CommonSelectField
                  form={form}
                  fieldName="publicationFormat"
                  fieldBaseTranslateId="forms.monograph-publications.fields.publication-format"
                  selectOptions={Object.keys(MONOGRAPH_PUBLICATION_FORMAT)}
                  required
                />
              </div>

              {/* type - show only if publicationFormat contains print */}
              {showPrintFields && (
                <div className={showTypeOtherField ? '' : 'lg:col-span-2'}>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="type">{t('forms.monograph-publications.fields.type')} *</FieldLabel>
                        <MultiSelect
                          id="type"
                          ref={field.ref}
                          defaultValue={getValues('type')}
                          options={MONOGRAPH_PUBLICATION_PRINT_TYPE_MULTISELECT.map(({ translationId, value }) => ({
                            value,
                            label: t(translationId),
                          }))}
                          onValueChange={field.onChange}
                          placeholder={t('forms.monograph-publications.fields.type.placeholder')}
                          hideSelectAll
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>
              )}

              {/* typeOther - render only if OTHER_PRINT in types */}
              {showTypeOtherField && (
                <CommonInputField
                  form={form}
                  fieldName="typeOther"
                  fieldBaseTranslateId="forms.monograph-publications.fields.type-other"
                  required // Note: required when displayed, schema considers optional for submitting when not displayed
                />
              )}

              {/* fileformat - show only if publicationFormat contains electronical */}
              {showElectronicalFields && (
                <div className={showFileformatOtherField ? '' : 'lg:col-span-2'}>
                  <Controller
                    name="fileformat"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="fileformat">
                          {t('forms.monograph-publications.fields.fileformat')} *
                        </FieldLabel>
                        <MultiSelect
                          id="fileformat"
                          ref={field.ref}
                          defaultValue={getValues('fileformat')}
                          options={MONOGRAPH_PUBLICATION_ELECTRONICAL_TYPE_MULTISELECT.map(
                            ({ translationId, value }) => ({
                              value,
                              label: t(translationId),
                            }),
                          )}
                          onValueChange={field.onChange}
                          placeholder={t('forms.monograph-publications.fields.fileformat.placeholder')}
                          hideSelectAll
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>
              )}

              {/* fileformatOther - render only if OTHER in fileformats */}
              {showFileformatOtherField && (
                <CommonInputField
                  form={form}
                  fieldName="fileformatOther"
                  fieldBaseTranslateId="forms.monograph-publications.fields.fileformat-other"
                  required // Note: required when displayed, schema considers optional for submitting when not displayed
                />
              )}

              {/* title */}
              <div className="lg:col-span-2">
                <CommonInputField
                  form={form}
                  fieldName="title"
                  fieldBaseTranslateId="forms.monograph-publications.fields.title"
                  required
                />
              </div>

              {/* subtitle */}
              <div className="lg:col-span-2">
                <CommonInputField
                  form={form}
                  fieldName="subtitle"
                  fieldBaseTranslateId="forms.monograph-publications.fields.subtitle"
                />
              </div>

              <div className="lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-4">
                {/* month */}
                <CommonSelectField
                  form={form}
                  fieldName="month"
                  fieldBaseTranslateId="forms.monograph-publications.fields.month"
                  selectOptions={Array.from(new Array(12), (_, idx) => String(idx + 1).padStart(2, '0'))}
                  required
                />

                {/* year */}
                <CommonSelectField
                  doNotTranslateOptions
                  form={form}
                  fieldName="year"
                  fieldBaseTranslateId="forms.monograph-publications.fields.year"
                  selectOptions={Array.from(new Array(5), (_, idx) => new Date().getFullYear() + idx).map((v) =>
                    String(v),
                  )}
                  required
                />
              </div>

              {/* language */}
              <CommonSelectField
                form={form}
                fieldName="language"
                fieldBaseTranslateId="forms.common.fields.language"
                selectOptions={Object.keys(PUBLICATION_LANGUAGE)}
                required
              />

              {/* releaseDate */}

              {/* edition (non-dissertation) */}
              {showNonUniversityFields && (
                <CommonInputField
                  form={form}
                  fieldName="edition"
                  fieldBaseTranslateId="forms.monograph-publications.fields.edition"
                />
              )}

              {/* printingHouse (print only) */}
              {showPrintFields && (
                <CommonInputField
                  form={form}
                  fieldName="printingHouse"
                  fieldBaseTranslateId="forms.monograph-publications.fields.printing-house"
                />
              )}

              {/* printingHouseCity (print only) */}
              {showPrintFields && (
                <CommonInputField
                  form={form}
                  fieldName="printingHouseCity"
                  fieldBaseTranslateId="forms.monograph-publications.fields.printing-house-city"
                />
              )}

              {/* copies (print only + no dissertations) */}
              {showPrintFields && showNonUniversityFields && (
                <CommonInputField
                  form={form}
                  fieldName="copies"
                  fieldBaseTranslateId="forms.monograph-publications.fields.copies"
                />
              )}

              {/* mapScale (only maps) */}
              {showMapFields && (
                <CommonInputField
                  form={form}
                  fieldName="mapScale"
                  fieldBaseTranslateId="forms.monograph-publications.fields.map-scale"
                />
              )}
            </CardContent>
          </Card>

          {/* Series information */}
          <Card>
            <CardHeader className="pb-2">{t('forms.monograph-publications.headings.series-information')}</CardHeader>
            <CardContent className="grid gap-y-4 lg:gap-y-6 lg:grid-cols-2 lg:gap-x-4">
              <div className="lg:col-span-2">
                <NatlibfiBodyText size={'small'}>
                  {t('forms.monograph-publications.descriptions.series-information')}
                </NatlibfiBodyText>
              </div>

              <CommonInputField form={form} fieldName="series" fieldBaseTranslateId="forms.common.fields.series-name" />

              <CommonInputField form={form} fieldName="issn" fieldBaseTranslateId="forms.common.fields.issn" />

              <CommonInputField
                form={form}
                fieldName="volume"
                fieldBaseTranslateId="forms.common.fields.series-volume"
              />
            </CardContent>
          </Card>

          {/* Author information */}
          <Card>
            <CardHeader className="pb-2">{t('forms.monograph-publications.headings.author-information')}</CardHeader>
            <CardContent>
              {/* numberOfAuthors - virtual attribute */}
              <div>
                <CommonSelectField
                  form={form}
                  fieldName="numberOfAuthors"
                  fieldBaseTranslateId="forms.monograph-publications.fields.number-of-authors"
                  selectOptions={showDissertationFields ? ['1'] : ['1', '2', '3', '4']}
                  required
                  hasDescription
                />
              </div>

              <Separator className="w-full mt-8 mb-8" />

              {/* Author #1 */}
              <div id="author-1" className="grid max-lg:gap-y-4 lg:grid-cols-2 lg:gap-x-4">
                <CommonInputField
                  form={form}
                  fieldName="firstName1"
                  fieldBaseTranslateId="forms.monograph-publications.fields.author.firstname"
                  required
                />

                <CommonInputField
                  form={form}
                  fieldName="lastName1"
                  fieldBaseTranslateId="forms.monograph-publications.fields.author.lastname"
                  required
                />

                <div className="lg:pt-6 lg:col-span-2">
                  <Controller
                    name="role1"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="role1">
                          {t('forms.monograph-publications.fields.author.role')} *
                        </FieldLabel>
                        <MultiSelect
                          id="role1"
                          ref={field.ref}
                          defaultValue={getValues('role1')}
                          options={MONOGRAPH_PUBLICATION_AUTHOR_ROLE_MULTISELECT.map(({ translationId, value }) => ({
                            value,
                            label: t(translationId),
                          }))}
                          onValueChange={field.onChange}
                          placeholder={t('forms.monograph-publications.fields.author.role.placeholder')}
                          hideSelectAll
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </div>
              </div>

              {!showDissertationFields &&
                [2, 3, 4].map((authorNumber) => {
                  if (Number(watchNumAuthors) >= authorNumber) {
                    return (
                      <div key={`author-${authorNumber}-fields`}>
                        <Separator className="w-full mt-8" />

                        <div
                          id={`author-${authorNumber}`}
                          className="grid max-lg:gap-y-4 lg:grid-cols-2 lg:gap-x-4 mt-4"
                        >
                          {/* Author #n */}
                          <CommonInputField
                            form={form}
                            // @ts-expect-error dynamically assigned attribute
                            fieldName={`firstName${authorNumber}`}
                            fieldBaseTranslateId={'forms.monograph-publications.fields.author.firstname'}
                          />

                          <CommonInputField
                            form={form}
                            // @ts-expect-error dynamically assigned attribute
                            fieldName={`lastName${authorNumber}`}
                            fieldBaseTranslateId={'forms.monograph-publications.fields.author.lastname'}
                          />

                          <div className="lg:col-span-2">
                            <Controller
                              control={control}
                              // @ts-expect-error dynamically assigned attribute
                              name={`role${authorNumber}`}
                              render={({ field, fieldState }) => (
                                <Field>
                                  <FieldLabel htmlFor={field.name}>
                                    {t('forms.monograph-publications.fields.author.role')}
                                  </FieldLabel>
                                  <MultiSelect
                                    id={field.name}
                                    ref={field.ref}
                                    // @ts-expect-error dynamically assigned attribute
                                    defaultValue={getValues(
                                      // @ts-expect-error dynamically assigned attribute
                                      `role${authorNumber}`,
                                    )}
                                    options={MONOGRAPH_PUBLICATION_AUTHOR_ROLE_MULTISELECT.map(
                                      ({ translationId, value }) => ({
                                        value,
                                        label: t(translationId),
                                      }),
                                    )}
                                    onValueChange={field.onChange}
                                    placeholder={t('forms.monograph-publications.fields.author.role.placeholder')}
                                    hideSelectAll
                                  />
                                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}
            </CardContent>
          </Card>

          {/* Additional information */}
          <Card>
            <CardHeader className="pb-2">{t('forms.monograph-publications.headings.other-information')}</CardHeader>
            <CardContent>
              <CommonInputField
                form={form}
                fieldName="comments"
                fieldBaseTranslateId="forms.monograph-publications.fields.comments"
              />
            </CardContent>
          </Card>

          {/* Buttons */}
          <div className="flex gap-8">
            {/* type="button" required - see https://stackoverflow.com/a/47848508 */}
            <Button type="button" className="max-w-3xs" onClick={() => setConditionsAccepted(false)}>
              {t('components.form-terms-and-conditions.show')}
            </Button>
            <Button className="max-w-3xs" type="submit" variant={'submit'}>
              {t('forms.submit')}
            </Button>
          </div>
        </form>
      </div>
    </ContentWrapper>
  );
}

export default MonographPublicationForm;
