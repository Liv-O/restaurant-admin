import { getOrder } from '@/api/orders';
import { useQuery } from '@tanstack/react-query';

export default function useOrder(id: string) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => {
      return getOrder(id);
    },
  });
}
