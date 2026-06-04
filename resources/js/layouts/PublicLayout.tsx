import React, { ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

export default function PublicLayout({ children }: Props) {
  const { auth } = usePage().props;

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link
              href={route('central.home')}
              className="text-2xl font-bold tracking-tight text-primary"
            >
              NB<span className="text-blue-600">Soft</span>
            </Link>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium transition-colors hover:text-blue-600"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium transition-colors hover:text-blue-600"
            >
              Pricing
            </Link>
            {auth?.admin ? (
              <Link
                href={route('central.logout')}
                method="post"
                className="text-sm font-medium transition-colors hover:text-blue-600"
              >
                Logout
              </Link>
            ) : (
              <Link
                href={route('central.login')}
                className="text-sm font-medium transition-colors hover:text-blue-600"
              >
                Login
              </Link>
            )}
            {auth?.admin && (
              <Link href={route('central.dashboard')}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Dashboard
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-slate-50">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 NBSoft. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
