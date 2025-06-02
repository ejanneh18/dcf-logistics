import type { Metadata } from "next"
import LoginForm from "@/components/account/login-form"
import { Truck } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Login | DCF Logistics",
  description: "Login to your DCF Logistics client portal",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Truck className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl text-gray-900">DCF Logistics</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Welcome Back</h1>
          <p className="text-gray-600 mt-1">Sign in to access your account</p>
        </div>

        <LoginForm />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/account/register" className="text-primary hover:underline font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
