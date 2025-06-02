import type { Metadata } from "next"
import RegisterForm from "@/components/account/register-form"
import { Truck } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Register | DCF Logistics",
  description: "Create a new account with DCF Logistics",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Truck className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl text-gray-900">DCF Logistics</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Create an Account</h1>
          <p className="text-gray-600 mt-1">Join DCF Logistics to manage your shipments</p>
        </div>

        <RegisterForm />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/account/login" className="text-primary hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
