import { Outlet } from 'react-router';

import Sidebar from './Sidebar';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
