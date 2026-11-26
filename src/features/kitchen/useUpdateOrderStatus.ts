import { updateOrderStatus } from '@/api/orders';
import type { OrderStatus } from '@/types';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export type UpdateOrderStatusData = { id: string; status: OrderStatus };

export default function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: UpdateOrderStatusData) => updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['tables'] });
      toast.success('Order status updated successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
