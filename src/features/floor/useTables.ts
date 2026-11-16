import { getTables } from '@/api/tables';
import { useQuery } from '@tanstack/react-query';

export default function useTables() {
  return useQuery({ queryKey: ['tables'], queryFn: getTables });
}
