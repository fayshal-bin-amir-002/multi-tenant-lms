import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Settings,
  LogOut,
  Bell,
  GraduationCap,
  ChevronRight,
  Home,
  UserCircle,
} from 'lucide-react';
import { ReactNode, useEffect, useMemo, useState } from 'react';

interface Props {
  children: ReactNode;
}

const TenantDashboardLayout = ({ children }: Props) => {
  const [path, setPath] = useState('');
  const { school, auth } = usePage<any>().props;

  const role = auth.tenant?.role;
  const isAdmin = role === 'admin';
  const isTeacher = role === 'teacher';
  const isStudent = role === 'student';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPath(window.location.href);
    }
  }, []);

  const menuItems = useMemo(() => {
    const items = [
      { label: 'Home', icon: Home, href: route('tenant.home'), show: true },
      {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: route(`tenant.${role}.dashboard`),
        show: true,
      },

      {
        label: 'Users',
        icon: Users,
        href: route(`tenant.admin.user.index`),
        show: isAdmin,
      },
      // { label: 'Students', icon: Users, href: '#', show: isAdmin || isTeacher },

      { label: 'Courses', icon: BookOpen, href: '#', show: true },

      { label: 'Academics', icon: GraduationCap, href: '#', show: isAdmin },
      {
        label: 'Brand Settings',
        icon: Settings,
        href: route('tenant.admin.branding-settings.index'),
        show: isAdmin,
      },
    ];

    return items.filter((item) => item.show);
  }, [isAdmin, isTeacher, isStudent]);

  const initials = auth.tenant?.user?.name?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 flex-col border-r bg-white lg:flex">
        {/* School Identity */}
        <div className="flex h-16 items-center border-b px-6">
          <Link
            href="/"
            className="flex items-center gap-2 overflow-hidden font-bold text-primary"
          >
            <div className="shrink-0 rounded-lg bg-primary p-1.5 text-white">
              <GraduationCap size={20} />
            </div>
            <span className="text-sm leading-tight text-wrap uppercase">
              {school?.school_name || 'NBSoft LMS'}
            </span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                path == item.href
                  ? 'bg-indigo-50 text-primary'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  size={18}
                  className={
                    path == item.href
                      ? 'text-parimary'
                      : 'text-slate-400 group-hover:text-slate-600'
                  }
                />
                {item.label}
              </div>
              {path == item.href && <ChevronRight size={14} />}
            </Link>
          ))}
        </nav>

        {/* User Profile & Logout Section */}
        <div className="mt-auto space-y-3 border-t p-4">
          <div className="flex items-center gap-3 px-2 py-1">
            <Avatar className="h-9 w-9 border border-indigo-200">
              <AvatarFallback className="bg-primary/10 font-bold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col">
              <p className="truncate text-sm font-semibold text-slate-900">
                {auth.tenant?.user?.name}
              </p>
              <p className="truncate text-xs text-slate-500">
                {auth.tenant?.user?.email}
              </p>
              <span className="mt-0.5 w-fit rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary uppercase">
                {auth.tenant?.role}
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700"
            asChild
          >
            <Link
              href={route('tenant.logout')}
              method="post"
              as="button"
              className="w-full"
            >
              <LogOut size={18} />
              Logout
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
};

export default TenantDashboardLayout;
