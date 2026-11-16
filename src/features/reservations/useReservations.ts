import { getReservations } from '@/api/reservations';
import { useQuery } from '@tanstack/react-query';

export default function useReservations() {
  return useQuery({ queryKey: ['reservations'], queryFn: getReservations });
}
