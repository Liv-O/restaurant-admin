import { getDishes } from '@/api/dishes';
import { useQuery } from '@tanstack/react-query';

export default function useDishes() {
  return useQuery({ queryKey: ['dishes'], queryFn: getDishes });
}
