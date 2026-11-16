import { createReservation } from '@/api/reservations';
import type { Reservation } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useCreateReservation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reservationData: Omit<Reservation, 'id'>) => createReservation(reservationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reservation created successfully');
    },
    onError: () => {
      toast.error('Error creating reservation');
    },
  });
}
