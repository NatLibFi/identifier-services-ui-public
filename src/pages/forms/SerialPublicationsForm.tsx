/* This form schema is based on original work by Petteri Kivimäki https://github.com/petkivim/ (Identifier Registry) */

import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Turnstile } from '@marsidev/react-turnstile';

import { Plus } from 'lucide-react';
import { ClipLoader } from 'react-spinners';

import { Button } from '@/components/shadcn/button';

import { Card, CardContent, CardHeader } from '@/components/shadcn/card';
import SerialPublicationCard from '@/components/forms/cards/SerialPublicationCard';

import CommonInputField from '@/components/forms/fields/CommonInputField';
import CommonSelectField from '@/components/forms/fields/CommonSelectField';
import ContentWrapper from '@/components/layout-utils/ContentWrapper';

import FormTermsAndConditions from '@/components/forms/terms-and-conditions/FormTermsAndConditions';

import NatlibfiBodyText from '@/components/text/NatlibfiBodyText';
import NatlibfiHeading from '@/components/text/NatlibfiHeading';

import useAlert from '@/hooks/useAlert';
import useTranslation from '@/hooks/useTranslation';
import useApplicationConfiguration from '@/hooks/useApplicationConfiguration';

import { LANG_CODES } from '@/constants';
import { serialPublicationFormV1Schema, type SerialPublicationFormV1 } from '@/schemas/serial-publication-form.schema';

import { displayLanguageToLangCode } from '@/constants/display-languages';

import { createSerialPublicationRequestV1 } from '@/api/forms';
import { APIError } from '@/api/ApiError';
import { deepCopy } from '@/utils/generic-utils';
import { transformSerialPublicationFormDataV1 } from '@/utils/data-transformation/serial-publication-form-transformation';
import { getParameterizedLink } from '@/utils/link-utils';

// For development utilize default values that allow fast iteration
// Not included in repo: just craft a similar object locally as the form defaultValues
// import { serialPublicationDevInit } from '@/form-dev-init/serial-publication-dev-init';

const publicationDefaultValues = {
  title: '',
  subtitle: '',
  placeOfPublication: '',
  printer: '',
  issuedFromYear: '',
  issuedFromNumber: '',
  frequency: '',
  frequencyOther: '',
  language: '',
  publicationType: '',
  publicationTypeOther: '',
  medium: '',
  mediumOther: '',
  url: '',
  previous: {
    title: '',
    issn: '',
    lastIssue: '',
  },
  mainSeries: {
    title: '',
    issn: '',
  },
  subseries: {
    title: '',
    issn: '',
  },
  anotherMedium: {
    title: '',
    issn: '',
  },
  additionalInfo: '',
  // Virtual attributes
  hasPrevious: false,
  hasMainSeries: false,
  hasSubseries: false,
  hasAnotherMedium: false,
};

function SerialPublicationForm() {
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

  const form = useForm<SerialPublicationFormV1>({
    resolver: zodResolver(serialPublicationFormV1Schema),
    mode: 'onTouched', // trigger validation on first onBlur and afterwards every onChange
    shouldFocusError: true,
    defaultValues: {
      form: {
        publisher: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        zip: '',
        city: '',
        langCode: displayLanguageToLangCode(currentLanguage),
      },
      publications: [deepCopy(publicationDefaultValues)],
    },

    // defaultValues: serialPublicationDevInit,
  });

  // Read all form values to subscribe to changes
  const { handleSubmit } = form;

  const {
    fields: publications,
    append: appendPublications,
    remove: removePublications,
  } = useFieldArray({
    name: 'publications',
    control: form.control,
  });

  // Watchers that affect which fields should be rendered and allow displaying errors through useEffect
  // See docs at: https://react-hook-form.com/docs/useform/watch

  // Scroll on top after accepting the conditions, useful especially for mobile
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [conditionsAccepted]);

  // Display terms and conditions before entering the form if not in development environment
  const displayTermsAndConditions = isProductionLikeEnvironment && !conditionsAccepted;

  if (displayTermsAndConditions) {
    return (
      <ContentWrapper>
        <NatlibfiHeading size={'l'}>{t('forms.serial-publications.title')}</NatlibfiHeading>
        <FormTermsAndConditions type="serialPublication" />
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
        <NatlibfiHeading size={'l'}>{t('forms.serial-publications.title')}</NatlibfiHeading>

        <div>
          <Turnstile siteKey={turnstileSiteKey} />
        </div>
        <div className="mt-10">
          <ClipLoader size={60} speedMultiplier={0.75} color="blue" />
        </div>
      </ContentWrapper>
    );
  }

  const onSubmitHandler = async (data: SerialPublicationFormV1) => {
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

      const formData = transformSerialPublicationFormDataV1(data, turnstileToken);
      await createSerialPublicationRequestV1(formData);

      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

      // eslint-disable-next-line react-hooks/rules-of-hooks
      return navigate(useLink('/form-success?form=serial-publication'));
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
      <NatlibfiHeading size={'l'}>{t('forms.serial-publications.title')}</NatlibfiHeading>

      <NatlibfiBodyText>{t('forms.guide.star')}</NatlibfiBodyText>

      <div>
        <form
          className="grid grid-cols-1 [&_input]:w-[100%] [&_[data-slot=form-item]]:pt-4 [&_[data-slot=card]]:mb-6 [&_[data-slot=card]]:gap-0"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          {/* Publisher information */}
          <Card>
            <CardHeader className="pb-2">{t('forms.serial-publications.headings.publisher-information')}</CardHeader>
            <CardContent className="grid gap-y-4 lg:gap-y-6 lg:grid-cols-2 lg:gap-x-4">
              {/* officialName */}
              <CommonInputField
                form={form}
                fieldName="form.publisher"
                fieldBaseTranslateId="forms.serial-publications.fields.publisher"
                required
              />

              {/* Contact person */}
              <CommonInputField
                form={form}
                fieldName="form.contactPerson"
                fieldBaseTranslateId="forms.common.fields.contact-person"
                required
              />

              {/* Address */}
              <CommonInputField
                autoComplete="address"
                form={form}
                fieldName="form.address"
                fieldBaseTranslateId="forms.common.fields.address"
                required
              />

              {/* Zip */}
              <CommonInputField
                form={form}
                fieldName="form.zip"
                fieldBaseTranslateId="forms.common.fields.zip"
                required
              />

              {/* City */}
              <CommonInputField
                form={form}
                fieldName="form.city"
                fieldBaseTranslateId="forms.common.fields.city"
                required
              />

              {/* Phone */}
              <CommonInputField
                autoComplete="phone"
                form={form}
                fieldName="form.phone"
                fieldBaseTranslateId="forms.common.fields.phone"
                required
              />

              {/* Email */}
              <CommonInputField
                autoComplete="email"
                form={form}
                fieldName="form.email"
                fieldBaseTranslateId="forms.common.fields.email"
                required
              />

              {/* langCode */}
              <CommonSelectField
                form={form}
                fieldName="form.langCode"
                fieldBaseTranslateId="forms.common.fields.language-code"
                selectOptions={Object.keys(LANG_CODES)}
                required
              />
            </CardContent>
          </Card>

          {/* Publications */}
          {publications.map((publication, idx) => (
            <SerialPublicationCard form={form} key={publication.id} idx={idx} removePublications={removePublications} />
          ))}

          {/* Add publication */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mb-6"
            onClick={() => {
              appendPublications(deepCopy(publicationDefaultValues));
            }}
            disabled={publications.length >= 4}
          >
            <Plus />
            <p>{publications.length < 4 && t('forms.serial-publications.fields.add-publication')}</p>
            <p>{publications.length >= 4 && t('forms.serial-publications.fields.add-publication-disabled')}</p>
          </Button>

          {/* Buttons */}
          <div className="flex gap-8">
            {/* type="button" required - see https://stackoverflow.com/a/47848508 */}
            <Button type="button" className="max-w-3xs" onClick={() => setConditionsAccepted(false)}>
              {t('components.form-terms-and-conditions.show')}
            </Button>
            <Button disabled={publications.length === 0} className="max-w-3xs" type="submit" variant={'submit'}>
              {t('forms.submit')}
            </Button>
          </div>
        </form>
      </div>
    </ContentWrapper>
  );
}

export default SerialPublicationForm;
