'use client'

import { Form } from '@/components/ui/form'
import { useLogin } from '../hooks/useLogin'
import { getFormInputList } from '../constants/form-input-list-login'
import { LoginFormValues } from '../validations/login.validation'
import FormInput from '@/components/common/form-input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { LoadingButton } from '@/components/common/loading-button'

export const LoginForm = () => {
  const { isLoading, form, onSubmit } = useLogin()
  const FormInputList = getFormInputList<LoginFormValues>()

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Masukkan email dan password untuk login</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {FormInputList.map(input => (
                <FormInput<LoginFormValues>
                  key={input.name}
                  form={form}
                  inputList={input}
                />
              ))}
              <LoadingButton
                isLoading={isLoading}
                loadingText="Memproses..."
                text="Masuk"
                className="w-full"
                type="submit"
                disabled={!form.formState.isValid || isLoading}
              />
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Belum punya akun?{' '}
            <Link href="/register" className="text-primary underline-offset-4 hover:underline">
              Daftar sekarang
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
