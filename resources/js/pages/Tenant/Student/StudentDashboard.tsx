import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  BookOpen,
  Mail,
  User,
  Calendar,
  Clock,
  GraduationCap,
  CheckCircle2,
} from 'lucide-react';
import TenantDashboardLayout from '@/layouts/TenantDashboardLayout';

export default function StudentDashboard() {
  const { auth } = usePage().props;
  const student = auth?.tenant?.user;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <TenantDashboardLayout>
      <Head title="Student Dashboard" />

      <div className="space-y-6">
        {/* Profile Welcome Section */}
        <div className="flex flex-col justify-between gap-4 rounded-xl border bg-white p-6 shadow-sm md:flex-row md:items-center">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-blue-100">
              <AvatarFallback className="bg-blue-600 text-lg font-bold text-white">
                {getInitials(student.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {student.name}!
              </h1>
              <div className="mt-1 flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="border-none bg-blue-50 text-blue-700 hover:bg-blue-50"
                >
                  Student ID: #{student.id.toString().padStart(4, '0')}
                </Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="mr-1 h-3 w-3" /> {student.email}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden text-right md:block">
            <p className="text-sm font-medium text-gray-500">
              Academic Session
            </p>
            <p className="text-lg font-bold text-gray-900">2025-2026</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Enrolled Courses
                </p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
              <div className="rounded-full bg-blue-50 p-2 text-blue-600">
                <BookOpen className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Attendance</p>
                <h3 className="text-2xl font-bold">92%</h3>
              </div>
              <div className="rounded-full bg-green-50 p-2 text-green-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Upcoming Exams
                </p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
              <div className="rounded-full bg-orange-50 p-2 text-orange-600">
                <Calendar className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Credits
                </p>
                <h3 className="text-2xl font-bold">48</h3>
              </div>
              <div className="rounded-full bg-purple-50 p-2 text-purple-600">
                <GraduationCap className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent Lessons */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Clock className="mr-2 h-5 w-5 text-blue-600" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Advanced React Component Architecture
                        </p>
                        <p className="text-xs text-gray-500">
                          Lesson completed on 24 April 2026
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Course
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Support / Notice */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Announcements</CardTitle>
              <CardDescription>Latest updates from your school</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-yellow-100 bg-yellow-50 p-4">
                <p className="text-xs font-bold text-yellow-800 uppercase">
                  Reminder
                </p>
                <p className="mt-1 text-sm text-yellow-900">
                  Mid-term project submission deadline is approaching.
                </p>
              </div>
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                <p className="text-xs font-bold text-blue-800 uppercase">
                  Holiday
                </p>
                <p className="mt-1 text-sm text-blue-900">
                  School will be closed on 1st May for Labor Day.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TenantDashboardLayout>
  );
}
