import CentralCommonLayout from '@/layouts/CentralCommonLayout';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Database, School } from 'lucide-react';

interface Tenant {
  id: string;
  school_name: string;
  tenancy_db_name: string;
  created_at: string;
  domains: {
    domain: string;
  }[];
}

const Dashboard = ({ tenents }: { tenents: Tenant[] }) => {
  console.log(tenents);
  return (
    <>
      <Head title="Dashboard | NBSoft LMS" />

      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Tenants Overview
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <School className="h-5 w-5 text-blue-600" />
              Registered Schools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="font-semibold">School Name</TableHead>
                  <TableHead className="font-semibold">Tenant ID</TableHead>
                  <TableHead className="font-semibold">Domain</TableHead>
                  <TableHead className="font-semibold">Database</TableHead>
                  <TableHead className="text-right font-semibold">
                    Created At
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenents.length > 0 ? (
                  tenents.map((tenant) => (
                    <TableRow
                      key={tenant.id}
                      className="transition-colors hover:bg-slate-50/50"
                    >
                      <TableCell className="font-medium text-slate-900">
                        {tenant.school_name}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="font-mono text-xs"
                        >
                          {tenant.id}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-blue-600">
                          <Globe className="h-4 w-4" />
                          <a
                            href={`http://${tenant.domains[0]?.domain}:8000`}
                            target="_blank"
                            className="font-medium hover:underline"
                          >
                            {tenant.domains[0]?.domain}
                          </a>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-slate-500 italic">
                          <Database className="h-3.5 w-3.5" />
                          {tenant.tenancy_db_name}
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-slate-500">
                        {new Date(tenant.created_at).toLocaleDateString(
                          'en-GB',
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-slate-500"
                    >
                      No tenants found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

Dashboard.layout = (page: ReactNode) => (
  <CentralCommonLayout>{page}</CentralCommonLayout>
);

export default Dashboard;
