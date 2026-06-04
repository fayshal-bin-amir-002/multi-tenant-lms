import { Head, useForm } from '@inertiajs/react';
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
import { School, Loader2 } from 'lucide-react';
import { FormEvent } from 'react';

interface TenantProps {
  school: {
    id: string;
    school_name: string;
    [key: string]: any;
  };
}

const Login = ({ school }: TenantProps) => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '111111',
    remember: false,
  });

  function submit(e: FormEvent) {
    e.preventDefault();
    post(route('tenant.authenticate'));
  }

  return (
    <>
      <Head title={`Login | ${school.school_name}`} />

      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <Card className="w-full max-w-md border-none shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <div className="mb-2 flex justify-center">
              <div className="rounded-xl bg-indigo-50 p-3">
                <School className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800 italic">
              {school.school_name}
            </CardTitle>
            <CardDescription>
              Please enter your student or staff credentials
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={submit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={data.email}
                  required
                  onChange={(e) => setData('email', e.target.value)}
                  className={
                    errors.email
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : ''
                  }
                />
                {errors.email && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={data.password}
                  required
                  onChange={(e) => setData('password', e.target.value)}
                  className={
                    errors.password
                      ? 'border-red-500 focus-visible:ring-red-500'
                      : ''
                  }
                />
                {errors.password && (
                  <p className="text-xs font-medium text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary"
                disabled={processing}
              >
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </CardContent>
          <div className="pb-6 text-center text-xs text-slate-400">
            Powered by NBSoft LMS
          </div>
        </Card>
      </div>
    </>
  );
};

export default Login;
