import { Controller, type FieldValues, type FieldPath, type UseFormReturn } from 'react-hook-form';

import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/shadcn/field';

import { Textarea } from '@/components/shadcn/textarea';

import useTranslation from '@/hooks/useTranslation';

interface CommonTextAreaFieldProps<T extends FieldValues> {
  autoComplete?: string;
  className?: string;
  readOnly?: boolean; // Note: disabled would return undefined value
  fieldBaseTranslateId: string;
  fieldName: FieldPath<T>;
  form: UseFormReturn<T>;
  hasDescription?: boolean;
  required?: boolean;
}

function CommonTextAreaField<T extends FieldValues>(props: CommonTextAreaFieldProps<T>) {
  const { autoComplete, className, readOnly, fieldBaseTranslateId, fieldName, form, hasDescription, required } = props;
  const { translate: t } = useTranslation();

  return (
    <Controller
      name={fieldName}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field className={className}>
          <FieldLabel htmlFor={field.name}>
            {t(fieldBaseTranslateId)} {required && '*'}
          </FieldLabel>
          {hasDescription && <FieldDescription>{t(`${fieldBaseTranslateId}.description`)}</FieldDescription>}
          <Textarea
            id={field.name}
            readOnly={readOnly}
            autoComplete={autoComplete}
            className={readOnly ? 'h-auto bg-brand-gray-20' : 'h-auto'}
            {...field}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export default CommonTextAreaField;
