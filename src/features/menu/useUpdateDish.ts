import { updateDish } from '@/api/dishes';
import type { Dish } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useUpdateDish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, changes }: { id: string; changes: Partial<Dish> }) =>
      updateDish(id, changes),
    onMutate: async ({ id, changes }) => {
      await queryClient.cancelQueries({ queryKey: ['dishes'] });
      const previous = queryClient.getQueryData<Dish[]>(['dishes']);
      queryClient.setQueryData<Dish[]>(['dishes'], (old = []) =>
        old.map((d) => (d.id === id ? { ...d, ...changes } : d)),
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
