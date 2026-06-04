import { useState, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  RotateCcw,
  Upload,
  Image as ImageIcon,
  Type,
  Globe,
  Palette,
  Sparkles,
  Check,
  Loader2,
} from 'lucide-react';
import TenantDashboardLayout from '@/layouts/TenantDashboardLayout';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface BrandingConfig {
  theme: string;
  radius: string;
  font: string;
  logo: string | null;
  favicon: string | null;
}

interface PageProps {
  tenant_branding: BrandingConfig | null;
  school: { school_name: string; id: string };
  [key: string]: any;
}

export default function BrandingSettings() {
  const { tenant_branding, school } = usePage<PageProps>().props;

  const defaultBranding: BrandingConfig = {
    theme: 'zinc',
    radius: '0.625',
    font: 'Geist Variable',
    logo: null,
    favicon: null,
  };

  const currentBranding = tenant_branding || defaultBranding;

  const [config, setConfig] = useState<BrandingConfig>(currentBranding);
  const [loading, setLoading] = useState(false);

  const [previewLogo, setPreviewLogo] = useState<string | null>(
    currentBranding.logo,
  );
  const [previewFavicon, setPreviewFavicon] = useState<string | null>(
    currentBranding.favicon,
  );
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  const themes = [
    { name: 'zinc', color: 'bg-zinc-900' },
    { name: 'neutral', color: 'bg-neutral-500' },
    { name: 'stone', color: 'bg-stone-500' },
    { name: 'amber', color: 'bg-amber-500' },
    { name: 'blue', color: 'bg-blue-600' },
    { name: 'cyan', color: 'bg-cyan-500' },
    { name: 'emerald', color: 'bg-emerald-500' },
    { name: 'fuchsia', color: 'bg-fuchsia-500' },
    { name: 'green', color: 'bg-green-600' },
    { name: 'indigo', color: 'bg-indigo-600' },
    { name: 'lime', color: 'bg-lime-500' },
    { name: 'orange', color: 'bg-orange-500' },
    { name: 'pink', color: 'bg-pink-500' },
    { name: 'purple', color: 'bg-purple-600' },
    { name: 'red', color: 'bg-red-600' },
    { name: 'rose', color: 'bg-rose-500' },
    { name: 'sky', color: 'bg-sky-500' },
    { name: 'teal', color: 'bg-teal-500' },
    { name: 'violet', color: 'bg-violet-600' },
    { name: 'yellow', color: 'bg-yellow-400' },
  ];

  const fonts = [
    { name: 'Roboto', label: 'Roboto (Classic)' },
    { name: 'Inter', label: 'Inter (Clean)' },
    { name: 'Geist', label: 'Geist (Modern)' },
    { name: 'Open Sans', label: 'Open Sans (Standard)' },
    { name: 'Merriweather', label: 'Merriweather (Elegant)' },
  ];

  useEffect(() => {
    const body = document.body;
    body.className = body.className.replace(/theme-\S+/g, '');
    body.classList.add(`theme-${config.theme}`);
    document.documentElement.style.setProperty(
      '--radius',
      `${config.radius}rem`,
    );
  }, [config.theme, config.radius]);

  useEffect(() => {
    const fontId = 'dynamic-font-link';
    let link = document.getElementById(fontId) as HTMLLinkElement;

    if (!link) {
      link = document.createElement('link');
      link.id = fontId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    link.href = `https://fonts.googleapis.com/css2?family=${config.font.replace(/\s+/g, '+')}:wght@400;500;700&display=swap`;
    document.body.style.fontFamily = `'${config.font}', sans-serif`;
  }, [config.font]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'logo' | 'favicon',
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'logo') {
          setPreviewLogo(reader.result as string);
          setLogoFile(file);
        } else {
          setPreviewFavicon(reader.result as string);
          setFaviconFile(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('theme', config.theme);
    formData.append('radius', config.radius);
    formData.append('font', config.font);
    formData.append('_method', 'PUT');

    if (logoFile) formData.append('logo_file', logoFile);
    if (faviconFile) formData.append('favicon_file', faviconFile);

    router.post(
      route('tenant.admin.branding-settings.update', { branding_setting: 1 }),
      formData,
      {
        forceFormData: true,
        preserveScroll: true,
        onStart: () => setLoading(true),
        onFinish: () => setLoading(false),
        onSuccess: () => {
          toast.success('Appearance Updated Successfully!');
        },
        onError: () => {
          toast.error('Failed to update settings.');
        },
      },
    );
  };

  return (
    <TenantDashboardLayout>
      <Head title="Branding & Identity" />

      <div className="pb-20">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-bold tracking-widest text-primary uppercase">
              <Sparkles className="h-4 w-4" /> Design System
            </div>
            <h1 className="text-5xl font-black tracking-tight text-slate-900">
              Appearane
            </h1>
            <p className="text-lg font-medium text-muted-foreground">
              Customize how your school looks to students and staff.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border bg-white p-2 shadow-sm">
            <Button
              variant="ghost"
              onClick={() => {
                setConfig(currentBranding);
                setPreviewLogo(currentBranding.logo);
                setPreviewFavicon(currentBranding.favicon);
              }}
              className="rounded-xl"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button
              onClick={handleSave}
              disabled={loading}
              className="rounded-xl bg-primary px-8 shadow-lg shadow-primary/25 transition-transform hover:scale-105 active:scale-95"
            >
              Save Changes
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Controls */}
          <div className="space-y-8 lg:col-span-5">
            <div className="space-y-8 rounded-[2rem] border bg-white p-8 shadow-sm">
              <div className="grid grid-cols-1 gap-8">
                {/* Logo */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2 text-xs font-black tracking-widest text-slate-400 uppercase">
                    <ImageIcon className="h-3.5 w-3.5" /> Corporate Logo
                  </Label>
                  <div className="group relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 transition-colors hover:border-primary/50">
                    <div className="mb-4 flex h-20 w-48 items-center justify-center overflow-hidden rounded-2xl border bg-white shadow-sm">
                      {previewLogo ? (
                        <img
                          src={previewLogo}
                          className="max-h-full max-w-full object-contain p-4"
                          alt="Logo Preview"
                        />
                      ) : (
                        <div className="text-xs font-medium text-slate-300 italic">
                          No Logo Uploaded
                        </div>
                      )}
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="relative rounded-full shadow-sm"
                    >
                      <Upload className="mr-2 h-3.5 w-3.5" /> Choose Logo
                      <input
                        type="file"
                        className="absolute inset-0 cursor-pointer opacity-0"
                        onChange={(e) => handleFileChange(e, 'logo')}
                        accept="image/*"
                      />
                    </Button>
                  </div>
                </div>

                {/* Favicon */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2 text-xs font-black tracking-widest text-slate-400 uppercase">
                    <Globe className="h-3.5 w-3.5" /> Site Icon (Favicon)
                  </Label>
                  <div className="flex items-center gap-6 rounded-3xl border border-slate-100 bg-slate-50/50 p-6">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border bg-white shadow-inner">
                      {previewFavicon ? (
                        <img
                          src={previewFavicon}
                          className="h-8 w-8 object-contain"
                          alt="Favicon Preview"
                        />
                      ) : (
                        <Globe className="h-6 w-6 text-slate-300" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="relative rounded-lg"
                      >
                        Change Icon
                        <input
                          type="file"
                          className="absolute inset-0 cursor-pointer opacity-0"
                          onChange={(e) => handleFileChange(e, 'favicon')}
                          accept="image/x-icon,image/png"
                        />
                      </Button>
                      <p className="text-[10px] font-bold tracking-tighter text-muted-foreground uppercase">
                        Square PNG/ICO • 32x32
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Theme & Style Card */}
            <div className="space-y-10 rounded-[2rem] border bg-white p-8 shadow-sm">
              <div className="space-y-4">
                <Label className="flex items-center gap-2 text-xs font-black tracking-widest text-slate-400 uppercase">
                  <Palette className="h-3.5 w-3.5" /> Brand Palette
                </Label>
                <div className="grid grid-cols-5 gap-3 sm:grid-cols-10">
                  {themes.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => setConfig({ ...config, theme: t.name })}
                      className={cn(
                        'group relative h-6.5 w-full transition-all duration-300',
                        config.theme === t.name
                          ? 'scale-110 ring-2 ring-primary ring-offset-2'
                          : 'hover:scale-110',
                      )}
                    >
                      <div className={cn('h-full w-full shadow-sm', t.color)} />
                      {config.theme === t.name && (
                        <div className="absolute -top-1 -right-1 rounded-full bg-primary p-0.5 text-white shadow-sm">
                          <Check className="h-2 w-2" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="flex items-center gap-2 text-xs font-black tracking-widest text-slate-400 uppercase">
                  <Type className="h-3.5 w-3.5" /> Typography System
                </Label>
                <Select
                  value={config.font}
                  onValueChange={(val) => setConfig({ ...config, font: val })}
                >
                  <SelectTrigger className="border-slate-200 bg-slate-50/30 font-medium shadow-none focus:ring-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-slate-100 shadow-2xl">
                    {fonts.map((f) => (
                      <SelectItem
                        key={f.name}
                        value={f.name}
                        className="py-3 text-base"
                      >
                        <span style={{ fontFamily: f.name }}>{f.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-black tracking-widest text-slate-400 uppercase">
                    Corner Radius
                  </Label>
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-black text-primary">
                    {config.radius} REM
                  </span>
                </div>
                <Slider
                  value={[parseFloat(config.radius)]}
                  min={0}
                  max={1.5}
                  step={0.125}
                  onValueChange={(v) =>
                    setConfig({ ...config, radius: v[0].toString() })
                  }
                  className="py-2"
                />
              </div>
            </div>
          </div>

          {/* Preview Area */}
          <div className="lg:sticky lg:top-8 lg:col-span-7">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-[3rem] bg-gradient-to-tr from-slate-200 to-slate-100 opacity-50 blur-xl transition group-hover:opacity-100" />
              <div
                className="relative overflow-hidden rounded-[2.8rem] border-[12px] border-slate-900 bg-white shadow-2xl transition-all duration-700"
                style={{ fontFamily: config.font }}
              >
                <div className="flex items-center gap-4 bg-slate-900 px-8 py-4">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                    <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                    <div className="h-3 w-3 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="flex flex-1 items-center gap-2 rounded-lg bg-white/10 px-4 py-1.5">
                    {previewFavicon && (
                      <img
                        src={previewFavicon}
                        className="h-3.5 w-3.5"
                        alt="fav"
                      />
                    )}
                    <span className="truncate text-[11px] font-medium tracking-wide text-white/40">
                      https://
                      {school?.school_name
                        ?.toLowerCase()
                        .replace(/\s+/g, '-') || 'myschool'}
                      .edu.bd/dashboard
                    </span>
                  </div>
                </div>

                <div className="relative min-h-[550px] bg-[#F8FAFC]">
                  <header className="sticky top-0 flex items-center justify-between border-b bg-white/80 px-10 py-5 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      {previewLogo ? (
                        <img
                          src={previewLogo}
                          className="h-8 w-auto object-contain"
                          alt="Logo"
                        />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-white uppercase">
                          {school?.school_name?.charAt(0) || 'S'}
                        </div>
                      )}
                      <span className="text-xl font-black tracking-tighter text-primary">
                        {school?.school_name || 'School Name'}
                      </span>
                    </div>
                  </header>

                  <div className="space-y-10 p-10">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold tracking-wider text-primary uppercase">
                        Welcome to {school?.school_name || 'Our School'}
                      </div>
                      <h2 className="text-5xl leading-[1.1] font-black tracking-tight text-slate-900">
                        The Future of{' '}
                        <span className="text-primary italic">Education</span>{' '}
                        Starts Here.
                      </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="rounded-[var(--radius)] border border-slate-100 bg-white p-6 shadow-sm">
                        <div className="mb-1 text-4xl font-black tracking-tighter text-primary">
                          2.4k
                        </div>
                        <div className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                          Students
                        </div>
                      </div>
                      <div className="rounded-[var(--radius)] bg-slate-900 p-6 text-white shadow-xl">
                        <div className="mb-1 text-4xl font-black tracking-tighter">
                          98%
                        </div>
                        <div className="text-xs font-bold tracking-widest text-white/50 uppercase">
                          Success
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button className="h-14 rounded-[var(--radius)] bg-primary px-10 text-lg font-bold shadow-xl shadow-primary/25">
                        Get Started
                      </Button>
                      <Button
                        variant="outline"
                        className="h-14 rounded-[var(--radius)] border-2 px-10 text-lg font-bold"
                      >
                        View Courses
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TenantDashboardLayout>
  );
}
