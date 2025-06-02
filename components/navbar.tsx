"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, User } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2 md:gap-10">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Navigate to different sections of our logistics platform.</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  Services
                </Link>
                <Link
                  href="/tracking"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  Tracking
                </Link>
                <Link
                  href="/quote"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  Get a Quote
                </Link>

                <Link
                  href="/blog"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  Contact
                </Link>
                <Link
                  href="/account/login"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  Login
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo_dcf.png" alt="DCF Logistics" width={120} height={40} className="h-8 w-auto" />
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/logistic-consultancy"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Logistic Consultancy</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Professional guidance and strategic insights
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/air-freight"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Air Freight</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Swift and secure air cargo solutions
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/haulage-transportation"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Haulage & Transportation</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Comprehensive transportation services
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/regulatory-compliance"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Regulatory Compliance</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Expert assistance with regulations
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/cross-border-logistics"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Cross Border Logistics</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Seamless management of international shipments
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/customs-clearance"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Customs Clearance</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Expert assistance with customs processes
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/freight-forwarding"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Freight Forwarding</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Comprehensive freight forwarding solutions
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/warehousing"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Warehousing</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Strategic warehousing and distribution
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/customs-brokerage"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Customs Brokerage</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Expert customs brokerage services
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/tracking" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Tracking</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/quote" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Get a Quote</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Blog</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account/login">
              <User className="h-5 w-5" />
            </Link>
          </Button>
          <Button className="hidden md:inline-flex" asChild>
            <Link href="/quote">Get a Quote</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
