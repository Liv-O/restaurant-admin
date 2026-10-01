import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
//import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { Toaster } from 'react-hot-toast';

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
