import type { Auth } from '@/types/auth';
import { School } from './school';

declare module '@inertiajs/core' {
  export interface InertiaConfig {
    sharedPageProps: {
      name: string;
      auth: Auth;
      school: School;
      sidebarOpen: boolean;
      [key: string]: unknown;
    };
  }
}
