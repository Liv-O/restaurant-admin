import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useLogin from './useLogin';
import FormField from '@/components/ui/FormField';
import Button from '@/components/ui/Button';

const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginValues = z.infer<typeof loginSchema>;

const DEMO_ACCOUNTS = [
  { role: 'Admin', description: 'Full access', email: 'anna@bellmont.example' },
  { role: 'Waiter', description: 'Floor & orders', email: 'waiter@bellmont.example' },
  { role: 'Kitchen', description: 'Tickets only', email: 'kitchen@bellmont.example' },
];

export default function LoginForm() {
  const defaultValues: LoginValues = {
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginValues>({ defaultValues, resolver: zodResolver(loginSchema) });

  const { mutate: login, isPending: isLoginPending, error: loginError } = useLogin();

  function onSubmit(data: LoginValues) {
    login(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormField label="Email" error={errors.email?.message} errorId="email-error">
        <input
          className="h-12 rounded-[10px] border border-input bg-surface px-3.5 text-[15px] font-medium focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 focus-visible:outline-none aria-invalid:border-danger aria-invalid:bg-danger-soft"
          aria-describedby="email-error"
          aria-invalid={!!errors.email}
          placeholder="Enter email"
          autoComplete="username"
          {...register('email')}
        />
      </FormField>
      <FormField label="Password" error={errors.password?.message} errorId="password-error">
        <input
          className="h-12 rounded-[10px] border border-input bg-surface px-3.5 text-[15px] font-medium focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15 focus-visible:outline-none aria-invalid:border-danger aria-invalid:bg-danger-soft"
          aria-describedby="password-error"
          aria-invalid={!!errors.password}
          type="password"
          placeholder="Enter password"
          autoComplete="current-password"
          {...register('password')}
        />
      </FormField>
      {loginError && (
        <div
          role="alert"
          className="rounded-[10px] bg-tone-red px-3.5 py-3 text-sm font-semibold text-tone-red-ink"
        >
          {loginError.message}
        </div>
      )}
      <Button type="submit" size="lg" className="mt-1 w-full" disabled={isLoginPending}>
        {isLoginPending ? 'Sign in...' : 'Sign in'}
      </Button>
      <div className="mt-2 flex items-center gap-3 text-[13px] font-semibold text-muted">
        <span className="h-px flex-1 bg-line" />
        Demo access for reviewers
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {DEMO_ACCOUNTS.map((account) => (
          <button
            key={account.email}
            type="button"
            disabled={isLoginPending}
            onClick={() => {
              setValue('email', account.email);
              setValue('password', 'password');
            }}
            className="flex h-16 flex-col items-center justify-center gap-0.5 rounded-[10px] border border-input bg-surface transition-colors hover:border-primary hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="text-sm font-bold">{account.role}</span>
            <span className="text-xs text-muted">{account.description}</span>
          </button>
        ))}
      </div>
    </form>
  );
}
