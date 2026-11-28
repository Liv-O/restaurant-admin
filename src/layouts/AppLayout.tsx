import { Outlet } from 'react-router';

import Sidebar from './Sidebar';
import { useRealtime } from '@/hooks/useRealtime';

export default function AppLayout() {
  useRealtime();
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
