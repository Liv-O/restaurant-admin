import { getCategories } from '@/api/dishes';
import { useQuery } from '@tanstack/react-query';

export default function useCategories() {
  return useQuery({ queryKey: ['categories'], queryFn: getCategories, staleTime: 5 * 60 * 1000 });
}
