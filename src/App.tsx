import { BrowserRouter, Route, Routes } from 'react-router';
import { Toaster } from 'react-hot-toast';

import DashboardPage from '@/pages/dashboard/DashboardPage';
import FloorPage from '@/pages/floor/FloorPage';
import KitchenPage from '@/pages/kitchen/KitchenPage';
import MenuPage from '@/pages/menu/MenuPage';
import ReservationsPage from '@/pages/reservations/ReservationsPage';
import LoginPage from '@/pages/login/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import AppLayout from './layouts/AppLayout';
import Providers from './app/providers';
import ProtectedRoute, { HomeRedirect } from './components/ProtectedRoute';

export default function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2500,
            style: {
              background: 'var(--color-surface)',
              color: 'var(--color-ink)',
              border: '1px solid var(--color-line)',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: 600,
              boxShadow: '0 12px 32px rgba(28, 27, 25, 0.12)',
            },
            success: {
              iconTheme: { primary: '#2f5d50', secondary: '#ffffff' },
            },
            error: {
              iconTheme: { primary: '#a33a2e', secondary: '#ffffff' },
            },
          }}
        />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route index element={<HomeRedirect />} />
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="dashboard" element={<DashboardPage />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={['admin', 'waiter']} />}>
                <Route path="floor" element={<FloorPage />} />
                <Route path="reservations" element={<ReservationsPage />} />
              </Route>

              <Route path="kitchen" element={<KitchenPage />} />
              <Route path="menu" element={<MenuPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}
