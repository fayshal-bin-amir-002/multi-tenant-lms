import TenantDashboardLayout from '@/layouts/TenantDashboardLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface Usage {
  id: number;
  name: string;
  tokens: number;
}

export default function AiUsages({ usages }: { usages: Usage[] }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    tokens: '',
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();

    post(route('tenant.admin.ai-usage.store'), {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };

  return (
    <TenantDashboardLayout>
      <Head title="AI Usages" />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            AI Usage Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage AI feature token limits.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Usage List */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="font-semibold text-gray-900">Usage List</h2>
            </div>

            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Name
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Tokens
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {usages.length > 0 ? (
                  usages.map((usage) => (
                    <tr key={usage.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4 text-sm font-medium text-gray-900">
                        {usage.name}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {usage.tokens.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-5 py-8 text-center text-sm text-gray-500"
                    >
                      No usages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Form */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="font-semibold text-gray-900">Add New Usage</h2>
            </div>

            <form onSubmit={submit} className="space-y-5 p-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Name
                </label>

                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  placeholder="Enter usage name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Tokens
                </label>

                <input
                  type="number"
                  value={data.tokens}
                  onChange={(e) => setData('tokens', e.target.value)}
                  placeholder="Enter token limit"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                />

                {errors.tokens && (
                  <p className="mt-1 text-sm text-red-600">{errors.tokens}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={processing}
                  className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {processing ? 'Saving...' : 'Save Usage'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </TenantDashboardLayout>
  );
}
