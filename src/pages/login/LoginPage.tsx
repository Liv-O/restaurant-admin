import { CalendarDays, CookingPot, LayoutGrid } from 'lucide-react';
import logoUrl from '@/assets/favicon-bell.svg';
import LoginForm from '@/features/auth/LoginForm';
import { Navigate } from 'react-router';
import useMe from '@/features/auth/useMe';
import FullPageSpinner from '@/components/ui/FullPageSpinner';

const FEATURES = [
  { icon: LayoutGrid, text: 'Live floor plan and table orders' },
  { icon: CookingPot, text: 'Real-time kitchen display' },
  { icon: CalendarDays, text: 'Menu and reservations in one place' },
];

export default function LoginPage() {
  const { data: user, isPending } = useMe();

  if (isPending) return <FullPageSpinner />;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Left: brand panel */}
      <aside className="hidden w-[44%] max-w-160 shrink-0 flex-col justify-between bg-sidebar px-16 py-14 lg:flex">
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt="" className="size-11" />
          <span className="font-display text-2xl font-semibold text-white">Bellmont</span>
        </div>

        <div className="flex flex-col gap-7">
          <h2 className="font-display text-5xl leading-[1.08] font-medium tracking-tight text-white">
            The whole service, from the door to the pass.
          </h2>
          <ul className="flex flex-col gap-4 text-base text-white/75">
            {FEATURES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-accent">
                  <Icon className="size-4.5" aria-hidden="true" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[13px] text-white/50">React + TypeScript + NestJS</p>
      </aside>

      {/* Right: form */}
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="flex w-full max-w-105 flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="font-display text-[38px] font-semibold tracking-tight">Sign in</h1>
            <p className="text-[15px] text-muted">Use your staff account to open the console.</p>
          </div>

          <LoginForm />
        </div>
      </main>
    </div>
  );
}
