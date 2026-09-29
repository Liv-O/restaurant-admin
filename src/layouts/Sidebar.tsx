import { Link, NavLink } from 'react-router';

import { LuLayoutDashboard } from 'react-icons/lu';
import { CiBoxes } from 'react-icons/ci';
import { MdOutlineSoupKitchen } from 'react-icons/md';
import { MdMenuBook } from 'react-icons/md';
import { FaRegCalendarCheck } from 'react-icons/fa6';
import logoUrl from '@/assets/favicon-bell.svg';

const links = [
  { to: '/', label: 'Dashboard', icon: <LuLayoutDashboard /> },
  { to: '/floor', label: 'Floor', icon: <CiBoxes /> },
  { to: '/kitchen', label: 'Kitchen', icon: <MdOutlineSoupKitchen /> },
  { to: '/menu', label: 'Menu', icon: <MdMenuBook /> },
  {
    to: '/reservations',
    label: 'Reservations',
    icon: <FaRegCalendarCheck />,
  },
];

export default function Sidebar() {
  return (
    <aside className="flex w-60 shrink-0 flex-col bg-sidebar p-4 text-white">
      <Link to="/" className="mb-8 px-3 font-display text-xl font-semibold">
        <img src={logoUrl} alt="Bellmont" className="mr-2 inline-block h-8 w-8" />
        Bellmont
      </Link>
      <nav className="flex flex-col gap-1" aria-label="Sidebar navigation">
        {links.map((link) => (
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
    </aside>
  );
}
