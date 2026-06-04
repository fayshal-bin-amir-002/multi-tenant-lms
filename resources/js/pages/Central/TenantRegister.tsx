import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  School,
  User,
  Mail,
  Lock,
  Loader2,
  ArrowRight,
  Globe,
} from 'lucide-react';
import { FormEvent, useEffect } from 'react';
import CentralCommonLayout from '@/layouts/CentralCommonLayout';

const TenantRegister = () => {
  const { data, setData, post, processing, errors } = useForm({
    school_name: '',
    school_email: '',
    domain: '', // New Field
    admin_name: '',
    admin_email: '',
    password: '',
    password_confirmation: '',
  });

  // School name likhle domain automatic generate hobe, kintu user edit korte parbe
  useEffect(() => {
    const slug = data.school_name
      .toLowerCase()
      .replace(/ /g, '_') // Space ke underscore korbe
      .replace(/[^\w-]+/g, ''); // Special characters remove korbe

    setData('domain', slug);
  }, [data.school_name]);

  function submit(e: FormEvent) {
    e.preventDefault();
    post(route('central.tenant.register.store'));
  }

  return (
    <CentralCommonLayout>
      <Head title="School Registration | NBSoft LMS" />

      <div className="flex min-h-[80vh] items-center justify-center py-10">
        <Card className="w-full max-w-4xl border-none shadow-xl">
          <CardHeader className="mb-6 space-y-1 border-b pb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-blue-600 p-4 shadow-lg shadow-blue-200">
                <School className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-slate-800">
              Register School
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={submit} className="space-y-6">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Institution Details */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
                    Institution Details
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="school_name">School Name</Label>
                    <div className="relative">
                      <School className="absolute top-3 left-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="school_name"
                        placeholder="e.g. Tokyo International School"
                        value={data.school_name}
                        onChange={(e) => setData('school_name', e.target.value)}
                        className={`pl-10 ${errors.school_name ? 'border-red-500' : ''}`}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="domain">Desired Subdomain</Label>
                    <div className="relative">
                      <Globe className="absolute top-3 left-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="domain"
                        placeholder="tokyo_school"
                        value={data.domain}
                        onChange={(e) => setData('domain', e.target.value)}
                        className={`pr-20 pl-10 ${errors.domain ? 'border-red-500' : ''}`}
                        required
                      />
                      <span className="absolute top-2.5 right-3 text-sm font-medium text-slate-400">
                        .localhost
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      You can edit the auto-generated slug above.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="school_email">Official School Email</Label>
                    <div className="relative">
                      <Mail className="absolute top-3 left-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="school_email"
                        type="email"
                        placeholder="contact@school.com"
                        value={data.school_email}
                        onChange={(e) =>
                          setData('school_email', e.target.value)
                        }
                        className={`pl-10 ${errors.school_email ? 'border-red-500' : ''}`}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Administrator Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
                    Administrator Info
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="admin_name">Admin Full Name</Label>
                    <div className="relative">
                      <User className="absolute top-3 left-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="admin_name"
                        placeholder="Principal Name"
                        value={data.admin_name}
                        onChange={(e) => setData('admin_name', e.target.value)}
                        className={`pl-10 ${errors.admin_name ? 'border-red-500' : ''}`}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin_email">Admin Personal Email</Label>
                    <div className="relative">
                      <Mail className="absolute top-3 left-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="admin_email"
                        type="email"
                        placeholder="admin@example.com"
                        value={data.admin_email}
                        onChange={(e) => setData('admin_email', e.target.value)}
                        className={`pl-10 ${errors.admin_email ? 'border-red-500' : ''}`}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className={errors.password ? 'border-red-500' : ''}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password_confirmation">Confirm</Label>
                      <Input
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                          setData('password_confirmation', e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 py-6 text-lg font-semibold hover:bg-blue-700"
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Creating
                      Instance...
                    </>
                  ) : (
                    <>
                      Complete Registration{' '}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
          <div className="rounded-b-xl border-t bg-slate-50 py-4 text-center text-xs text-slate-400">
            NBSoft LMS Infrastructure • Domain will be: {data.domain || '...'}
            .localhost
          </div>
        </Card>
      </div>
    </CentralCommonLayout>
  );
};

export default TenantRegister;
