import { ReactNode } from 'react';
import { SessionNavBar } from '@/components/ui/sidebar';

const CentralCommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <aside className="w-60 shrink-0">
        <SessionNavBar />
      </aside>
      <main className="flex flex-1 flex-col overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
};

export default CentralCommonLayout;
