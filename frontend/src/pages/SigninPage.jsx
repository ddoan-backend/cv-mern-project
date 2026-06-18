import { LoginForm } from "@/components/login-form"

function SigninPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10" style={{backgroundImage:"var(--backgroundImage)"}}>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}

export default SigninPage