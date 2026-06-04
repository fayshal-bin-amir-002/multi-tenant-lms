import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { FormEvent } from 'react';

const Login = () => {
  const { data, setData, post, processing, errors } = useForm({
    email: 'admin@gmail.com',
    password: '111111',
  });

  function submit(e: FormEvent) {
    e.preventDefault();
    post('/login');
  }

  return (
    <>
      <Head title="Login | NBSoft LMS" />

      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <Card className="w-full max-w-md border-none shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <div className="mb-2 flex justify-center">
              <div className="rounded-xl bg-blue-50 p-3">
                <ShieldCheck className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">NBSoft Admin</CardTitle>
            <CardDescription>
              Enter your credentials to access the central panel
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={submit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@nbsoft.jp"
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
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={processing}
              >
                {processing && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
