import { ReactNode } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { School, BookOpen, User, Phone } from 'lucide-react';

interface Props {
  children: ReactNode;
  school: any;
}

export default function TenantLayout({ children, school }: Props) {
  const { auth, tenant_branding } = usePage().props as any;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            {tenant_branding?.logo ? (
              <div className="flex items-center gap-3">
                <img
                  src={tenant_branding.logo}
                  alt={school?.school_name}
                  className="h-10 w-auto object-contain"
                />
                <span className="hidden text-xl font-bold tracking-tight text-primary sm:block">
                  {school?.school_name || 'XXX'}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <School className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold tracking-tight text-primary">
                  {school?.school_name || 'XXX'}
                </span>
              </div>
            )}
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <Link
              href="/courses"
              className="transition-colors hover:text-primary"
            >
              Courses
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-primary"
            >
              About Us
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {!auth?.tenant ? (
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
            ) : (
              <form action={route('tenant.logout')} method="POST">
                <button
                  type="submit"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Logout
                </button>
              </form>
            )}
            <Link
              href={
                auth?.tenant?.role
                  ? route(`tenant.${auth?.tenant?.role}.dashboard`)
                  : route('tenant.login')
              }
            >
              <Button size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-slate-300">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2 text-white">
              {tenant_branding?.logo ? (
                <img
                  src={tenant_branding.logo}
                  className="h-8 w-auto object-contain brightness-0 invert"
                />
              ) : (
                <>
                  <School className="h-6 w-6 text-primary" />
                  <span className="text-lg font-bold">
                    {school?.school_name || 'XXX'}
                  </span>
                </>
              )}
            </div>
            <p className="text-sm leading-relaxed">
              Empowering students through quality education and innovative
              learning solutions.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-white">Contact Info</h4>
            <p className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4" /> Support: support@{school?.id || 'X'}
              .com
            </p>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-slate-800 px-4 pt-8 text-center text-xs">
          © 2026 {school?.school_name || 'XXX'}. Powered by NBSoft LMS.
        </div>
      </footer>
    </div>
  );
}
