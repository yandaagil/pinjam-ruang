import { RegisterForm } from '@/features/auth/components/register-form'
import { checkAuthSession } from '@/hooks/useSession'

export default async function RegisterPage() {
  await checkAuthSession()

  return <RegisterForm />
}
