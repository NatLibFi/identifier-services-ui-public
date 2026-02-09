import { Controller, type FieldValues, type FieldPath, type UseFormReturn } from 'react-hook-form';

import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/shadcn/field';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select';

import useTranslation from '@/hooks/useTranslation';

interface BooleanSelectFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  fieldBaseTranslateId: string;
  fieldName: FieldPath<T>;
  hasDescription?: boolean;
  required?: boolean;
}

function BooleanSelectField<T extends FieldValues>(props: BooleanSelectFieldProps<T>) {
  const { form, fieldBaseTranslateId, fieldName, hasDescription, required } = props;
  const { translate: t } = useTranslation();

  return (
    <Controller
      control={form.control}
      name={fieldName}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel htmlFor={field.name}>
            {t(fieldBaseTranslateId)} {required && '*'}
          </FieldLabel>
          {hasDescription && <FieldDescription>{t(`${fieldBaseTranslateId}.description`)}</FieldDescription>}
          <Select
            name={fieldName}
            onValueChange={(event) => {
              field.onChange(event);
              form.trigger(fieldName);
            }}
            value={field.value}
          >
            <SelectTrigger id={field.name} ref={field.ref} className="flex w-full overflow-hidden overflow-ellipsis">
              <SelectValue placeholder={t(`${fieldBaseTranslateId}.placeholder`)} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {['true', 'false'].map((selectOption) => (
                  <SelectItem key={`${fieldBaseTranslateId}.${selectOption}`} value={selectOption}>
                    {t(`forms.common.fields.boolean.${selectOption}`)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export default BooleanSelectField;
