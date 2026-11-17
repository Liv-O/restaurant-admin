import { seatReservation } from '@/api/reservations';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export type SeatReservationData = { reservationId: string; waiter: string };

export default function useSeatReservation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reservationId, waiter }: SeatReservationData) =>
      seatReservation(reservationId, { waiter }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['tables'] });
      toast.success('Reservation seated successfully');
    },
    onError: () => {
      toast.error('Error seating reservation');
    },
  });
}
