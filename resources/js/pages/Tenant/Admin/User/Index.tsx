import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  User,
  MoreHorizontal,
  ExternalLink,
  Users as UsersIcon,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import TenantDashboardLayout from '@/layouts/TenantDashboardLayout';

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export default function Index({ users }: { users: UserData[] }) {
  const { school } = usePage().props;

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
      <Head title={`Users List | ${school?.school_name}`} />

      <div>
        {/* Header Section */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              User Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage and view all registered users in the system.
            </p>
          </div>
          <div>
            <Link href={route('tenant.admin.user.create')}>
              <Button>Add User</Button>
            </Link>
          </div>
        </div>

        {/* Users Table Card */}
        <Card className="overflow-hidden border-none shadow-md">
          <CardContent>
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    className="transition-colors hover:bg-gray-50/50"
                  >
                    <TableCell className="font-mono text-xs text-gray-500">
                      #{user.id.toString().padStart(4, '0')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-9 w-9 border">
                          <AvatarFallback className="bg-blue-50 text-xs font-bold text-blue-700">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {user.name}
                          </span>
                          <span className="flex items-center text-xs text-gray-500">
                            <Mail className="mr-1 h-3 w-3" /> {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`border-none capitalize ${
                          user.role === 'admin'
                            ? 'bg-purple-50 text-purple-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                        variant="secondary"
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {user.created_at}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem className="cursor-pointer">
                            <User className="mr-2 h-4 w-4" /> View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-blue-600">
                            <ExternalLink className="mr-2 h-4 w-4" /> Edit User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {users.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-gray-500">No users found.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TenantDashboardLayout>
  );
}
