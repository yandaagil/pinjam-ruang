'use client'

import { Form } from '@/components/ui/form'
import { useRegister } from '../hooks/useRegister'
import { getFormInputList } from '../constants/form-input-list-register'
import { RegisterFormValues } from '../validations/register.validation'
import FormInput from '@/components/common/form-input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { LoadingButton } from '@/components/common/loading-button'

export const RegisterForm = () => {
  const { isLoading, form, onSubmit } = useRegister()
  const FormInputList = getFormInputList<RegisterFormValues>()

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Daftar</CardTitle>
          <CardDescription>Buat akun baru untuk menggunakan aplikasi</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {FormInputList.map(input => (
                <FormInput<RegisterFormValues>
                  key={input.name}
                  form={form}
                  inputList={input}
                />
              ))}
              <LoadingButton
                isLoading={isLoading}
                loadingText="Mendaftar..."
                text="Daftar"
                className="w-full"
                type="submit"
                disabled={!form.formState.isValid || isLoading}
              />
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-primary underline-offset-4 hover:underline">
              Masuk disini
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
