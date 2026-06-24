import CentralCommonLayout from '@/layouts/CentralCommonLayout';

interface Usage {
  id: number;
  tenant_id: string;
  tokens: number;
  created_at: string;
  updated_at: string;
}

const AiUsages = ({ usages }: { usages: Usage[] }) => {
  return (
    <CentralCommonLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            AI Usage Overview
          </h1>
          <p className="text-sm text-gray-500">
            Monitor all tenants AI token consumption
          </p>
        </div>

        {/* Stats Card */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Tenants</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {usages.length}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Tokens</p>
            <p className="mt-2 text-2xl font-bold text-indigo-600">
              {usages.reduce((acc, u) => acc + u.tokens, 0)}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Avg Tokens</p>
            <p className="mt-2 text-2xl font-bold text-green-600">
              {usages.length
                ? Math.round(
                    usages.reduce((acc, u) => acc + u.tokens, 0) /
                      usages.length,
                  )
                : 0}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="border-b px-5 py-4">
            <h2 className="font-semibold text-gray-900">Tenant Usage List</h2>
          </div>

          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tenant
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tokens
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Last Updated
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {usages.length > 0 ? (
                usages.map((usage) => (
                  <tr key={usage.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium text-gray-900">
                      {usage.tenant_id}
                    </td>

                    <td className="px-5 py-4 text-gray-700">
                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600">
                        {usage.tokens.toLocaleString()}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-500">
                      {new Date(usage.updated_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-5 py-10 text-center text-gray-500"
                  >
                    No usage data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </CentralCommonLayout>
  );
};

export default AiUsages;
