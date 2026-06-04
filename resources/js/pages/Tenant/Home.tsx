import TenantLayout from '@/layouts/TenantLayout';
import { Head, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, GraduationCap, ArrowRight } from 'lucide-react';

export default function Home({ school }: { school: any }) {
  // const { tenant_branding } = usePage<any>().props;
  // console.log(tenant_branding);
  return (
    <TenantLayout school={school || 'X'}>
      <Head title={`Welcome to ${school?.school_name || 'XXX'}`} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-5xl leading-tight font-extrabold text-slate-900">
              Grow Your Future at{' '}
              <span className="text-primary">
                {school?.school_name || 'XXX'}
              </span>
            </h1>
            <p className="text-lg leading-relaxed text-slate-600">
              Welcome to our advanced Learning Management System. Explore
              courses, connect with teachers, and track your academic progress
              all in one place.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="h-12 bg-primary px-8">
                Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8">
                Learn More
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="flex flex-col gap-4 rounded-3xl border bg-white p-8 shadow-2xl">
              <div className="flex items-center gap-4 rounded-2xl bg-green-50 p-4">
                <GraduationCap className="h-8 w-8 text-green-600" />
                <div>
                  <div className="font-bold">Global Certification</div>
                  <div className="text-sm text-slate-500">
                    Verified by NBSoft
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-orange-50 p-4">
                <Users className="h-8 w-8 text-orange-600" />
                <div>
                  <div className="font-bold">Active Community</div>
                  <div className="text-sm text-slate-500">
                    Join 1000+ Students
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Why Study With Us?
            </h2>
            <p className="mt-2 text-slate-500">
              Excellence in every step of your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<BookOpen className="h-6 w-6 text-primary" />}
              title="Modern Curriculum"
              desc="Up-to-date learning materials designed by industry experts for the best results."
            />
            <FeatureCard
              icon={<Users className="h-6 w-6 text-purple-600" />}
              title="Expert Teachers"
              desc="Get guidance from dedicated educators who are passionate about teaching."
            />
            <FeatureCard
              icon={<GraduationCap className="h-6 w-6 text-emerald-600" />}
              title="Track Progress"
              desc="Real-time analytics and reporting for students and guardians to monitor success."
            />
          </div>
        </div>
      </section>
    </TenantLayout>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <Card className="border-none bg-slate-50/50 shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="space-y-4 pt-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{desc}</p>
      </CardContent>
    </Card>
  );
}
