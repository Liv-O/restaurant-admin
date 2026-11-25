import { createOrder } from '@/api/orders';
import { useAppDispatch } from '@/store/hooks';
import { clearDraft } from '@/store/orderDraftsSlice';
import type { CreateOrderBody } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useCreateOrder() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (body: CreateOrderBody) => createOrder(body),
    onSuccess: (_order, variables) => {
      dispatch(clearDraft(variables.tableId));
      queryClient.invalidateQueries({ queryKey: ['tables'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order sent to kitchen');
    },
    onError: (error) => toast.error(error.message),
  });
}
