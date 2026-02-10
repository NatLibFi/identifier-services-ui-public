import { Controller, type FieldValues, type FieldPath, type UseFormReturn } from 'react-hook-form';

import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/shadcn/field';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/select';

import useTranslation from '@/hooks/useTranslation';

interface CommonSelectFieldProps<T extends FieldValues> {
  doNotTranslateOptions?: boolean;
  form: UseFormReturn<T>;
  fieldBaseTranslateId: string;
  fieldName: FieldPath<T>;
  hasDescription?: boolean;
  required?: boolean;
  selectOptions: string[];
}

function CommonSelectField<T extends FieldValues>(props: CommonSelectFieldProps<T>) {
  const { doNotTranslateOptions, form, fieldBaseTranslateId, fieldName, hasDescription, required, selectOptions } =
    props;
  const { translate: t } = useTranslation();

  return (
    <Controller
      name={fieldName}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel htmlFor={field.name}>
            {t(fieldBaseTranslateId)} {required && '*'}
          </FieldLabel>
          {hasDescription && <FieldDescription>{t(`${fieldBaseTranslateId}.description`)}</FieldDescription>}
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger ref={field.ref} id={field.name} className="flex w-full overflow-hidden overflow-ellipsis">
              <SelectValue placeholder={t('forms.common.fields.select.placeholder')} />
            </SelectTrigger>
            <SelectContent id={field.name}>
              <SelectGroup>
                {selectOptions.map((selectOption) => (
                  <SelectItem
                    title={doNotTranslateOptions ? selectOption : t(`${fieldBaseTranslateId}.${selectOption}`)}
                    key={`${fieldBaseTranslateId}.${selectOption}`}
                    value={selectOption}
                  >
                    {!doNotTranslateOptions && t(`${fieldBaseTranslateId}.${selectOption}`)}
                    {doNotTranslateOptions && selectOption}
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

export default CommonSelectField;
