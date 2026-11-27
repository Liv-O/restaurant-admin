import { addOrderItems } from '@/api/orders';
import { useAppDispatch } from '@/store/hooks';
import { clearDraft } from '@/store/orderDraftsSlice';
import type { CreateOrderBody } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useAddOrderItems() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: ({
      orderId,
      items,
    }: {
      orderId: string;
      tableId: string;
      items: CreateOrderBody['items'];
    }) => addOrderItems(orderId, items),
    onSuccess: (_order, variables) => {
      dispatch(clearDraft(variables.tableId));
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order update sent to kitchen');
    },
    onError: (error) => toast.error(error.message),
  });
}
