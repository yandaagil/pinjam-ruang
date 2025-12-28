import { LoginForm } from '@/features/auth/components/login-form'
import { checkAuthSession } from '@/hooks/useSession'

export default async function LoginPage() {
  await checkAuthSession()

  return <LoginForm />
}
