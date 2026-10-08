import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
//import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

// import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import FloorPage from '@/pages/floor/FloorPage';
import KitchenPage from '@/pages/kitchen/KitchenPage';
import MenuPage from '@/pages/menu/MenuPage';
import ReservationsPage from '@/pages/reservations/ReservationsPage';
import LoginPage from '@/pages/login/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import AppLayout from './layouts/AppLayout';

export default function App() {
  return (
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
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="floor" element={<FloorPage />} />
          <Route path="kitchen" element={<KitchenPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="reservations" element={<ReservationsPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
