import type { Metadata } from "next"
import OfflineClientPage from "./OfflineClientPage"

export const metadata: Metadata = {
  title: "Offline - DCF Logistics",
  description: "You're currently offline. Some features are still available.",
}

export default function OfflinePage() {
  return <OfflineClientPage />
}
