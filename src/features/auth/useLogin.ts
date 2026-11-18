import { login } from '@/api/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) => login(credentials),
    onSuccess: (user) => {
      queryClient.setQueryData(['me'], user);
      navigate('/', { replace: true });
    },
  });
}
