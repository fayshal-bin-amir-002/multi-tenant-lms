// resources/js/Pages/Central/Home.tsx
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
  CheckCircle2,
  GraduationCap,
  LayoutDashboard,
  Globe,
} from 'lucide-react';
import PublicLayout from '@/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <PublicLayout>
      <Head title="Welcome to NBSoft LMS" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Empower Your Institution with <br />
            <span className="text-blue-600">NBSoft Multi-Tenant LMS</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            একই প্ল্যাটফর্মে তৈরি করুন আপনার নিজস্ব অনলাইন স্কুল। ম্যানেজ করুন
            স্টুডেন্ট, কোর্স এবং পেমেন্ট—সবকিছু এক জায়গা থেকে।
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/register-school">
              <Button size="lg" className="h-12 bg-blue-600 px-8 text-lg">
                Create Your School
              </Button>
            </Link>
            <Link
              href="#features"
              className="text-sm leading-6 font-semibold text-gray-900"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need
            </h2>
            <p className="mt-4 text-gray-600">
              পাওয়ারফুল ফিচার যা আপনার লার্নিং ম্যানেজমেন্টকে করবে সহজ।
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<Globe className="h-10 w-10 text-blue-600" />}
              title="Custom Subdomains"
              description="আপনার প্রতিটি টেন্যান্টের জন্য থাকবে আলাদা সাব-ডোমেইন যেমন school1.yourdomain.com"
            />
            <FeatureCard
              icon={<LayoutDashboard className="h-10 w-10 text-blue-600" />}
              title="White Labeling"
              description="আপনার ব্র্যান্ডের লোগো এবং কালার থিম ব্যবহার করার পূর্ণ স্বাধীনতা।"
            />
            <FeatureCard
              icon={<GraduationCap className="h-10 w-10 text-blue-600" />}
              title="Course Management"
              description="সহজেই ভিডিও লেসন, কুইজ এবং অ্যাসাইনমেন্ট আপলোড ও ম্যানেজ করুন।"
            />
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

// Reusable Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-none shadow-md transition-shadow hover:shadow-xl">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
