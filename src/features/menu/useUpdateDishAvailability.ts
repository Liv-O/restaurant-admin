import { updateDishAvailability } from '@/api/dishes';
import type { Dish } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useUpdateDishAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isAvailable }: { id: string; isAvailable: boolean }) =>
      updateDishAvailability(id, isAvailable),
    onMutate: async ({ id, isAvailable }) => {
      await queryClient.cancelQueries({ queryKey: ['dishes'] });
      const previous = queryClient.getQueryData<Dish[]>(['dishes']);
      queryClient.setQueryData<Dish[]>(['dishes'], (old = []) =>
        old.map((d) => (d.id === id ? { ...d, isAvailable } : d)),
      );
      return { previous };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(['dishes'], context?.previous);
      toast.error('Error updating dish');
    },
    onSuccess: () => {
      toast.success('Dish updated successfully');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
    },
  });
}
