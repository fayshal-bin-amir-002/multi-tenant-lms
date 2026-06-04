import { Head, usePage } from '@inertiajs/react';
import TenantDashboardLayout from '@/layouts/TenantDashboardLayout';
import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const { school, auth } = usePage<any>().props;

  const stats = [
    {
      title: 'Total Students',
      value: '1,250',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Active Teachers',
      value: '48',
      icon: GraduationCap,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      title: 'Courses',
      value: '12',
      icon: BookOpen,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Attendance Rate',
      value: '94%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <TenantDashboardLayout>
      <Head title={`Dashboard | ${school?.school_name}`} />

      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Welcome back, {auth?.tenant?.user?.name || 'Admin'}!
          </h1>
          <p className="text-slate-500">
            Here is what's happening at{' '}
            <span className="font-medium text-indigo-600">
              {school?.school_name}
            </span>{' '}
            today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bg} rounded-lg p-2`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="mt-1 text-xs text-slate-400">
                  +2.5% from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Secondary Content Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          {/* Recent Activity or Chart Placeholder */}
          <Card className="col-span-4 border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-lg border border-slate-50 p-3 transition-colors hover:bg-slate-50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                      <Clock className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        New student enrollment
                      </p>
                      <p className="text-xs text-slate-500">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions / Notices */}
          <Card className="col-span-3 border-none bg-indigo-600 text-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">System Notice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-indigo-100">
                The annual report for{' '}
                <span className="font-bold underline">
                  {school?.school_name}
                </span>{' '}
                is ready to be generated. Please review student marks before
                finalizing.
              </p>
              <button className="mt-6 w-full rounded-md bg-white py-2 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-50">
                View Reports
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </TenantDashboardLayout>
  );
};

export default Dashboard;
