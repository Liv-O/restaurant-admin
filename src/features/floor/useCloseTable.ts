import { closeTable } from '@/api/tables';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useCloseTable() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: closeTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tables'] });
      toast.success('Table closed successfully');
    },
    onError: () => {
      toast.error('Error closing table');
    },
  });
}
