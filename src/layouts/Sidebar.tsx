import { Link, NavLink } from 'react-router';
import type { ReactNode } from 'react';

import { LuLayoutDashboard } from 'react-icons/lu';
import { CiBoxes } from 'react-icons/ci';
import { MdOutlineSoupKitchen } from 'react-icons/md';
import { MdMenuBook } from 'react-icons/md';
import { FaRegCalendarCheck } from 'react-icons/fa6';
import logoUrl from '@/assets/favicon-bell.svg';
import useMe from '@/features/auth/useMe';
import { LogOut } from 'lucide-react';
import useLogout from '@/features/auth/useLogout';
import type { Role } from '@/types';

type SidebarLink = {
  to: string;
  label: string;
  icon: ReactNode;
  roles: Role[];
};

const links: SidebarLink[] = [
  { to: '/dashboard', label: 'Dashboard', icon: <LuLayoutDashboard />, roles: ['admin'] },
  { to: '/floor', label: 'Floor', icon: <CiBoxes />, roles: ['admin', 'waiter'] },
  {
    to: '/kitchen',
    label: 'Kitchen',
    icon: <MdOutlineSoupKitchen />,
    roles: ['admin', 'waiter', 'kitchen'],
  },
  { to: '/menu', label: 'Menu', icon: <MdMenuBook />, roles: ['admin', 'waiter', 'kitchen'] },
  {
    to: '/reservations',
    label: 'Reservations',
    icon: <FaRegCalendarCheck />,
    roles: ['admin', 'waiter'],
  },
];

export default function Sidebar() {
  const { data: user } = useMe();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  if (!user) return null;
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <aside className="flex w-60 shrink-0 flex-col bg-sidebar p-4 text-white">
      <Link to="/" className="mb-8 px-3 font-display text-xl font-semibold">
        <img src={logoUrl} alt="Bellmont" className="mr-2 inline-block h-8 w-8" />
        Bellmont
      </Link>
      <nav className="flex flex-col gap-1" aria-label="Sidebar navigation">
        {links
          .filter((link) => link.roles.includes(user.role))
          .map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {link.icon} {link.label}
            </NavLink>
          ))}
      </nav>

      <div className="mt-auto flex items-center gap-3 rounded-xl bg-white/5 p-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-[13px] font-bold text-sidebar">
          {initials}
        </span>

        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-semibold text-white">{user.name}</span>
          <span className="text-xs text-white/60 capitalize">{user.role}</span>
        </div>

        <button
          type="button"
          aria-label="Sign out"
          onClick={() => logout()}
          disabled={isLoggingOut}
          className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
        >
          <LogOut className="size-5" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
