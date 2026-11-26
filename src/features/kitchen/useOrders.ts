import { getOrders } from '@/api/orders';
import { useQuery } from '@tanstack/react-query';

export default function useOrders() {
  return useQuery({ queryKey: ['orders'], queryFn: getOrders });
}
