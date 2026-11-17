import { seatTable } from '@/api/tables';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export type SeatTableData = { id: string; guests: number; waiter: string };

export default function useSeatTable() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, guests, waiter }: SeatTableData) => seatTable(id, { guests, waiter }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tables'] });
      toast.success('Table seated successfully');
    },
    onError: () => {
      toast.error('Error seating table');
    },
  });
}
