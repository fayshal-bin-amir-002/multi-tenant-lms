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
  Users,
  BookOpen,
  ClipboardList,
  Calendar,
  Clock,
  MessageSquare,
  PlusCircle,
  TrendingUp,
} from 'lucide-react';
import TenantDashboardLayout from '@/layouts/TenantDashboardLayout';

export default function TeacherDashboard() {
  const { auth } = usePage().props as any;
  const teacher = auth?.tenant?.user;

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
      <Head title="Teacher Dashboard" />

      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 rounded-xl border bg-white p-6 shadow-sm md:flex-row md:items-center">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-purple-100">
              <AvatarFallback className="bg-purple-600 text-lg font-bold text-white">
                {getInitials(teacher?.name || 'User')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Hello, Prof. {teacher?.name}!
              </h1>
              <div className="mt-1 flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="border-none bg-purple-50 text-purple-700 hover:bg-purple-50"
                >
                  Faculty ID: #{teacher?.id?.toString().padStart(4, '0')}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-gray-200 text-gray-500"
                >
                  {teacher?.email}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-purple-700">
              <PlusCircle className="h-4 w-4" /> New Content
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active Students
                </p>
                <h3 className="text-2xl font-bold">142</h3>
              </div>
              <div className="rounded-full bg-purple-50 p-2 text-purple-600">
                <Users className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Courses</p>
                <h3 className="text-2xl font-bold">4</h3>
              </div>
              <div className="rounded-full bg-blue-50 p-2 text-blue-600">
                <BookOpen className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Pending Grades
                </p>
                <h3 className="text-2xl font-bold">28</h3>
              </div>
              <div className="rounded-full bg-orange-50 p-2 text-orange-600">
                <ClipboardList className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Avg. Performance
                </p>
                <h3 className="text-2xl font-bold">84%</h3>
              </div>
              <div className="rounded-full bg-green-50 p-2 text-green-600">
                <TrendingUp className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Today's Schedule</CardTitle>
                <CardDescription>Your classes for today</CardDescription>
              </div>
              <Calendar className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    time: '09:00 AM',
                    subject: 'Advanced Mathematics',
                    room: 'Room 302',
                    students: 45,
                  },
                  {
                    time: '11:30 AM',
                    subject: 'Computer Networks',
                    room: 'Lab 04',
                    students: 32,
                  },
                  {
                    time: '02:00 PM',
                    subject: 'Software Engineering',
                    room: 'Online',
                    students: 120,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="rounded bg-purple-50 px-2 py-1 text-sm font-bold text-purple-600">
                        {item.time}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {item.subject}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.room} • {item.students} Students
                        </p>
                      </div>
                    </div>
                    <button className="text-xs font-medium text-purple-600 hover:underline">
                      Manage
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Student Queries</CardTitle>
              <CardDescription>Recent messages from students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Rahat Islam', msg: 'Need help with Assignment 2...' },
                { name: 'Sara Khan', msg: 'Is the class tomorrow online?' },
              ].map((q, i) => (
                <div
                  key={i}
                  className="flex items-start space-x-3 rounded-lg border border-gray-100 bg-gray-50 p-3"
                >
                  <div className="rounded-full border bg-white p-1.5 shadow-sm">
                    <MessageSquare className="h-3 w-3 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{q.name}</p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-gray-600">
                      {q.msg}
                    </p>
                  </div>
                </div>
              ))}
              <button className="mt-2 w-full rounded-lg border border-dashed py-2 text-xs font-bold text-gray-500 hover:bg-gray-50">
                View All Messages
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </TenantDashboardLayout>
  );
}
