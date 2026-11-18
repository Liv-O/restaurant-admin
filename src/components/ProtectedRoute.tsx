import useMe from '@/features/auth/useMe';
import { Navigate, Outlet } from 'react-router';
import FullPageSpinner from './ui/FullPageSpinner';
import type { Role } from '@/types';
import { HOME_BY_ROLE } from '@/features/auth/constants';

type ProtectedRouteProps = {
  allowedRoles?: Role[];
};

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { data: user, isPending } = useMe();

  if (isPending) return <FullPageSpinner />;
  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={HOME_BY_ROLE[user.role]} replace />;
  }

  return <Outlet />;
}

export function HomeRedirect() {
  const { data: user } = useMe();
  if (!user) return null;
  return <Navigate to={HOME_BY_ROLE[user.role]} replace />;
}
