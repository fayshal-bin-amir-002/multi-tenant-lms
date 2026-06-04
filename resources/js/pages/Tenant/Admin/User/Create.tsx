import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Loader2,
  UserPlus,
  Upload,
  FileSpreadsheet,
  Download,
  AlertCircle,
} from 'lucide-react';
import TenantDashboardLayout from '@/layouts/TenantDashboardLayout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Create() {
  const { school } = usePage().props as any;

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '111111',
    role: '',
  });

  const {
    data: bulkData,
    setData: setBulkData,
    post: postBulk,
    processing: bulkProcessing,
    errors: bulkErrors,
    clearErrors: clearBulkErrors,
  } = useForm({
    bulk_file: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('tenant.admin.user.store'), { onSuccess: () => reset() });
  };

  const handleBulkUpload = (e: React.FormEvent) => {
    e.preventDefault();
    clearBulkErrors();
    postBulk(route('tenant.admin.user.bulk-upload'), {
      preserveScroll: true,
    });
  };

  const bulkErrorList = Object.values(bulkErrors);

  return (
    <TenantDashboardLayout>
      <Head title={`Create User | ${school?.school_name}`} />

      <div className="mx-auto max-w-2xl space-y-6">
        <Card className="border-none shadow-md">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div className="rounded-md bg-blue-50 p-2 text-blue-600">
                <UserPlus className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl">Add New User</CardTitle>
                <CardDescription>
                  Enter user details to create a new account manually.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g. John Doe"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">User Role</Label>
                <Select
                  onValueChange={(value) => setData('role', value)}
                  defaultValue={data.role}
                >
                  <SelectTrigger
                    className={errors.role ? 'border-red-500' : ''}
                  >
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.role}
                  </p>
                )}
              </div>

              <div className="rounded-md bg-gray-50 p-3">
                <p className="text-xs text-gray-500">
                  <span className="font-bold text-gray-700">Note:</span> Default
                  password is set to{' '}
                  <code className="rounded bg-gray-200 px-1">111111</code>.
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  disabled={processing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {processing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create User'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div className="rounded-md bg-green-50 p-2 text-green-600">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl">Bulk Upload</CardTitle>
                <CardDescription>
                  Upload CSV/Excel to add multiple users.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleBulkUpload} className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="bulk_file">CSV/Excel File</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="bulk_file"
                    type="file"
                    accept=".csv, .xlsx, .xls"
                    onChange={(e) =>
                      setBulkData('bulk_file', e.target.files?.[0] || null)
                    }
                    className="cursor-pointer"
                  />
                  <Button
                    type="submit"
                    disabled={bulkProcessing || !bulkData.bulk_file}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {bulkProcessing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="mr-2 h-4 w-4" />
                    )}
                    {bulkProcessing ? 'Uploading...' : 'Upload'}
                  </Button>
                </div>
              </div>
              {/* Error Feedback Section */}
              {bulkErrorList.length > 0 && (
                <Alert
                  variant="destructive"
                  className="border-red-200 bg-red-50"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Upload Failed</AlertTitle>
                  <AlertDescription>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-xs">
                      {bulkErrorList.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
              <p className="text-[11px] text-gray-400">
                Supported formats: .csv, .xlsx. Max: 2MB.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </TenantDashboardLayout>
  );
}
