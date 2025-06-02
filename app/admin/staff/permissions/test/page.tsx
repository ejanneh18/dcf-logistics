import type { Metadata } from "next"
import PermissionTestingClientPage from "./PermissionTestingClientPage"

export const metadata: Metadata = {
  title: "Permission Testing | DCF Logistics Admin",
  description: "Test and verify user role permissions and access controls",
}

export default function PermissionTestingPage() {
  return <PermissionTestingClientPage />
}
