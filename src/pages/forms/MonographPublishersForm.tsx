/* This form schema is based on original work by Petteri Kivimäki https://github.com/petkivim/ (Identifier Registry) */

import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Turnstile } from '@marsidev/react-turnstile';

import { Minus, Plus } from 'lucide-react';
import { ClipLoader } from 'react-spinners';

import { Button } from '@/components/shadcn/button';

import { Card, CardContent, CardHeader } from '@/components/shadcn/card';

import { Field, FieldError, FieldLabel, FieldTitle } from '@/components/shadcn/field';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/shadcn/tooltip';

import { Input } from '@/components/shadcn/input';
import { MultiSelect } from '@/components/shadcn-custom/multi-select';

import CommonInputField from '@/components/forms/fields/CommonInputField';
import CommonSelectField from '@/components/forms/fields/CommonSelectField';
import ContentWrapper from '@/components/layout-utils/ContentWrapper';
import NatlibfiHeading from '@/components/text/NatlibfiHeading';

import FormTermsAndConditions from '@/components/forms/terms-and-conditions/FormTermsAndConditions';
import NatlibfiBodyText from '@/components/text/NatlibfiBodyText';

import useAlert from '@/hooks/useAlert';
import useTranslation from '@/hooks/useTranslation';
import useApplicationConfiguration from '@/hooks/useApplicationConfiguration';

import {
  monographPublisherFormV1Schema,
  type MonographPublisherFormV1,
} from '@/schemas/monograph-publisher-form.schema';

import { LANG_CODES, PUBLISHER_CLASSIFICATIONS } from '@/constants';
import { displayLanguageToLangCode } from '@/constants/display-languages';

import { createMonographPublisherRequestV1 } from '@/api/forms';
import { APIError } from '@/api/ApiError';

import { transformMonographPublisherFormDataV1 } from '@/utils/data-transformation/monograph-publisher-form-transformation';
import { getParameterizedLink } from '@/utils/link-utils';

// For development utilize default values that allow fast iteration
// Not included in repo: just craft a similar object locally as the form defaultValues
// import { monographPublisherDevInit } from '@/form-dev-init/monograph-publisher-dev-init';

function MonographPublishersForm() {
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

  const form = useForm<MonographPublisherFormV1>({
    resolver: zodResolver(monographPublisherFormV1Schema),
    mode: 'onTouched', // trigger validation on first onBlur and afterwards every onChange
    defaultValues: {
      officialName: '',
      otherNames: [],
      contactPerson: '',
      address: '',
      zip: '',
      city: '',
      phone: '',
      email: '',
      www: '',
      langCode: displayLanguageToLangCode(currentLanguage),
      frequencyCurrent: '',
      frequencyNext: '',
      affiliateOf: '',
      affiliates: '',
      distributorOf: '',
      distributors: '',
      classification: [],
      classificationOther: '',
    },

    // defaultValues: monographPublisherDevInit,
  });

  const {
    fields: otherNameFields,
    append: appendOtherName,
    remove: removeOtherName,
  } = useFieldArray({
    name: 'otherNames',
    control: form.control,
  });

  // Display terms and conditions before entering the form if not in development environment
  const displayTermsAndConditions = isProductionLikeEnvironment && !conditionsAccepted;

  // Display terms and conditions before entering the form
  // Note: turnstile widget is not loaded at this point
  if (displayTermsAndConditions) {
    return (
      <ContentWrapper>
        <NatlibfiHeading size={'l'}>{t('forms.monograph-publishers.title')}</NatlibfiHeading>
        <FormTermsAndConditions type="monographPublisher" />
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
        <NatlibfiHeading size={'l'}>{t('forms.monograph-publishers.title')}</NatlibfiHeading>
        <div>
          <Turnstile siteKey={turnstileSiteKey} />
        </div>
        <div className="mt-10">
          <ClipLoader size={60} speedMultiplier={0.75} color="blue" />
        </div>
      </ContentWrapper>
    );
  }

  const onSubmitHandler = async (data: MonographPublisherFormV1) => {
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

      const dataApiV1 = transformMonographPublisherFormDataV1(data, turnstileToken);
      await createMonographPublisherRequestV1(dataApiV1);

      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

      // eslint-disable-next-line react-hooks/rules-of-hooks
      return navigate(useLink('/form-success?form=monograph-publisher'));
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
      <NatlibfiHeading size={'l'}>{t('forms.monograph-publishers.title')}</NatlibfiHeading>
      <NatlibfiBodyText>{t('forms.guide.star')}</NatlibfiBodyText>

      <div>
        <form
          className="grid grid-cols-1 [&_input]:w-[100%] [&_[data-slot=form-item]]:pt-4 [&_[data-slot=card]]:mb-6 [&_[data-slot=card]]:gap-0"
          onSubmit={form.handleSubmit(onSubmitHandler)}
        >
          <Card>
            <CardHeader className="pb-2">{t('forms.monograph-publishers.headings.name')}</CardHeader>
            <CardContent className="grid gap-y-4 lg:gap-y-6 lg:gap-x-4">
              {/* Official name */}
              <CommonInputField
                form={form}
                fieldName="officialName"
                fieldBaseTranslateId="forms.common.fields.official-name"
                required
              />

              {/* Other names - dynamic field */}
              <Field>
                <div className="flex gap-4 items-center">
                  <FieldTitle>{t('forms.monograph-publishers.fields.other-name')}</FieldTitle>

                  {/* Other names - add new */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        aria-label={t('forms.monograph-publishers.fields.other-name.add-guide')}
                        type="button"
                        className="w-[16px] h-[1em]"
                        onClick={() => {
                          appendOtherName({ value: '' });
                        }}
                        disabled={otherNameFields.length > 3}
                      >
                        <Plus size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t('forms.monograph-publishers.fields.other-name.add-guide')}</TooltipContent>
                  </Tooltip>
                </div>
                {otherNameFields.map((otherNameField, idx) => (
                  <div key={otherNameField.id}>
                    <div className="flex gap-2">
                      <Input
                        {...form.register(`otherNames.${idx}.value`)}
                        defaultValue={otherNameField.value}
                        placeholder={t('forms.monograph-publishers.fields.other-name.placeholder')}
                        className={`max-wd-md ${
                          form.formState.errors.otherNames?.[idx]?.value?.message && 'border border-destructive'
                        }`}
                      />

                      <Button type="button" className="" onClick={() => removeOtherName(idx)}>
                        <Minus />
                      </Button>
                    </div>
                    <p className="text-destructive text-sm self-center">
                      {form.formState.errors.otherNames?.[idx]?.value?.message}
                    </p>
                  </div>
                ))}
              </Field>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">{t('forms.monograph-publishers.headings.basic-information')}</CardHeader>
            <CardContent className="grid gap-y-4 lg:gap-y-6 lg:gap-x-4">
              {/* classification - multiselect */}
              <Controller
                control={form.control}
                name="classification"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="classification">
                      {/* Note: required star icon is placed here manually */}
                      {t('forms.monograph-publishers.fields.classification')} *
                    </FieldLabel>
                    <MultiSelect
                      id="classification"
                      ref={field.ref}
                      options={PUBLISHER_CLASSIFICATIONS.map(({ translationId, value }) => ({
                        value,
                        label: t(translationId),
                      }))}
                      onValueChange={field.onChange}
                      placeholder={t('forms.monograph-publishers.fields.classification')}
                      hideSelectAll
                      closeOnSelect
                      responsive={{
                        mobile: {
                          maxCount: 2,
                          compactMode: true,
                        },
                        tablet: {
                          maxCount: 3,
                          compactMode: true,
                        },
                        desktop: {
                          maxCount: 4,
                          compactMode: false,
                        },
                      }}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* classificationOther */}
              <CommonInputField
                form={form}
                fieldName="classificationOther"
                fieldBaseTranslateId="forms.monograph-publishers.fields.classification-other"
              />

              {/* frequencyCurrent */}
              <CommonInputField
                form={form}
                fieldName="frequencyCurrent"
                fieldBaseTranslateId="forms.monograph-publishers.fields.frequency-current"
                required
              />

              {/* frequencyNext */}
              <CommonInputField
                form={form}
                fieldName="frequencyNext"
                fieldBaseTranslateId="forms.monograph-publishers.fields.frequency-next"
                required
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">{t('forms.monograph-publishers.headings.contact-information')}</CardHeader>
            <CardContent className="grid gap-y-4 lg:gap-y-6 lg:gap-x-4">
              {/* langCode */}
              <CommonSelectField
                form={form}
                fieldName="langCode"
                fieldBaseTranslateId="forms.common.fields.language-code"
                selectOptions={Object.keys(LANG_CODES)}
                required
              />

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

              {/* www */}
              <CommonInputField
                form={form}
                fieldName="www"
                fieldBaseTranslateId="forms.monograph-publishers.fields.www"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              {t('forms.monograph-publishers.headings.organization-information')}
            </CardHeader>

            <CardContent className="grid gap-y-4 lg:gap-y-6 lg:gap-x-4">
              <div className="flex items-baseline mt-2 pt-4 pl-2 pr-2 border-2 gap-2">
                <NatlibfiBodyText>{t('forms.monograph-publishers.notes.affiliates')}</NatlibfiBodyText>
              </div>

              <div className="flex items-baseline mt-2 pt-4 pl-2 pr-2 border-2 gap-2">
                <NatlibfiBodyText>{t('forms.monograph-publishers.notes.affiliate-of')}</NatlibfiBodyText>
              </div>

              {/* affiliateOf */}
              <CommonInputField
                form={form}
                fieldName="affiliateOf"
                fieldBaseTranslateId="forms.monograph-publishers.fields.affiliate-of"
              />

              {/* affiliates */}
              <CommonInputField
                form={form}
                fieldName="affiliates"
                fieldBaseTranslateId="forms.monograph-publishers.fields.affiliates"
              />

              {/* distributors */}
              <CommonInputField
                form={form}
                fieldName="distributors"
                fieldBaseTranslateId="forms.monograph-publishers.fields.distributors"
              />

              {/* distributorOf */}
              <CommonInputField
                form={form}
                fieldName="distributorOf"
                fieldBaseTranslateId="forms.monograph-publishers.fields.distributor-of"
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

export default MonographPublishersForm;
