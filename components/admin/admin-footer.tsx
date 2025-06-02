import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, Shield, Database, Wifi } from "lucide-react"

export default function AdminFooter() {
  return (
    <footer className="border-t bg-white/50 backdrop-blur">
      <div className="flex h-12 items-center justify-between px-6">
        {/* Left - System Status */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Activity className="h-3 w-3 text-green-500" />
            <span>System Healthy</span>
          </div>
          <div className="flex items-center gap-1">
            <Database className="h-3 w-3 text-green-500" />
            <span>DB Connected</span>
          </div>
          <div className="flex items-center gap-1">
            <Wifi className="h-3 w-3 text-green-500" />
            <span>API Online</span>
          </div>
        </div>

        {/* Center - Version */}
        <div className="text-xs text-muted-foreground">DCF Logistics Admin v2.1.0</div>

        {/* Right - Quick Links */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 text-xs" asChild>
            <Link href="/admin/support">Support</Link>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-xs" asChild>
            <Link href="/admin/docs">Docs</Link>
          </Button>
          <Badge variant="outline" className="text-xs">
            <Shield className="mr-1 h-3 w-3" />
            Secure
          </Badge>
        </div>
      </div>
    </footer>
  )
}
