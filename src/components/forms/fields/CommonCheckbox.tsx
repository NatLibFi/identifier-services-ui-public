import { Controller, type FieldValues, type FieldPath, type UseFormReturn } from 'react-hook-form';

import { FieldError, FieldLabel } from '@/components/shadcn/field';

import { Checkbox } from '@/components/shadcn/checkbox';

import useTranslation from '@/hooks/useTranslation';

interface CommonCheckboxProps<T extends FieldValues> {
  autoComplete?: string;
  disabled?: boolean;
  fieldBaseTranslateId: string;
  fieldName: FieldPath<T>;
  form: UseFormReturn<T>;
  hasDescription?: boolean;
  required?: boolean;
}

function CommonCheckbox<T extends FieldValues>(props: CommonCheckboxProps<T>) {
  const { fieldBaseTranslateId, fieldName, form } = props;
  const { translate: t } = useTranslation();

  return (
    <Controller
      name={fieldName}
      control={form.control}
      render={({ field, fieldState }) => (
        <div className="flex item-start gap-3">
          <FieldLabel htmlFor={field.name}>{t(fieldBaseTranslateId)}</FieldLabel>
          <Checkbox
            id={field.name}
            aria-label={t(fieldBaseTranslateId)}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </div>
      )}
    />
  );
}

export default CommonCheckbox;
