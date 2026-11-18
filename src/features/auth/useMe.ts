import { getMe } from '@/api/auth';
import type { User } from '@/types';
import { useQuery } from '@tanstack/react-query';

async function getMeOrNull(): Promise<User | null> {
  try {
    return await getMe();
  } catch (error) {
    if (error instanceof Error && 'status' in error && error.status === 401) {
      return null;
    }
    throw error;
  }
}

export default function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMeOrNull,
    retry: false,
    staleTime: Infinity,
  });
}
