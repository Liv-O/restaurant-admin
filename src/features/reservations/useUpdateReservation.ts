import { updateReservation } from '@/api/reservations';
import type { Reservation } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useUpdateReservation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      reservationData,
    }: {
      id: string;
      reservationData: Partial<Omit<Reservation, 'id'>>;
    }) => updateReservation(id, reservationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reservation updated successfully');
    },
    onError: () => {
      toast.error('Error updating reservation');
    },
  });
}
