import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import { SimpleMultiSelect } from '../ui/multi-select'
import PasswordInput from './password-input'
import { cn } from '@/lib/utils'
import type { Path } from 'react-hook-form'
import { DatePicker } from '../ui/date-picker'
import { DateTimePicker } from '../ui/date-time-picker'
import { Combobox, Options } from '../ui/combobox'

export type FormInputType<T> = {
  name: Path<T>
  label: string
  inputVariant: 'date' | 'time' | 'date-time' | 'textarea' | 'select' | 'multi-select' | 'text' | 'number' | 'password' | 'file-dropzone'
  inputOptions?: Options[]
  placeholder: string
  isRequired?: boolean
}

type FormInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  inputList: FormInputType<T>
  isLoading?: boolean
  isInModal?: boolean
}

const FormInput = <T extends FieldValues>({
  form,
  inputList,
  isLoading = false,
}: FormInputProps<T>) => {
  const {
    name,
    label,
    inputVariant,
    inputOptions,
    placeholder,
    isRequired = true,
  } = inputList

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            htmlFor={name}
            className={cn(isRequired && "after:content-['*'] after:text-red-500 gap-1")}
          >
            {label}
          </FormLabel>
          <FormControl>
            {inputVariant === 'time' ? (
              <Input
                id={name}
                type="time"
                placeholder={placeholder}
                {...field}
              />
            ) : inputVariant === 'textarea' ? (
              <Textarea
                id={name}
                placeholder={placeholder}
                {...field}
              />
            ) : inputVariant === 'select' ? (
              <Combobox
                options={inputOptions}
                value={field.value}
                onValueChange={field.onChange}
                placeholder={placeholder}
              />
            ) : inputVariant === 'multi-select' ? (
              <SimpleMultiSelect
                options={inputOptions}
                value={field.value}
                onChange={field.onChange}
                placeholder={placeholder}
              />
            ) : inputVariant === 'date' ? (
              <DatePicker
                date={field.value}
                setDate={field.onChange}
              />
            ) : inputVariant === 'date-time' ? (
              <DateTimePicker
                date={field.value}
                setDate={field.onChange}
              />
            ) : inputVariant === 'password' ? (
              <PasswordInput
                id={name}
                placeholder={placeholder}
                disabled={isLoading}
                {...field}
              />
            ) : inputVariant === 'number' ? (
              <Input
                id={name}
                type="number"
                placeholder={placeholder}
                disabled={isLoading}
                {...field}
                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
              />
            ) : (
              <Input
                id={name}
                type="text"
                placeholder={placeholder}
                autoComplete="on"
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormInput