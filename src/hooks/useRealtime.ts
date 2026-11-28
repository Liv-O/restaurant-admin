import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { SOCKET_URL } from '@/api/socket';
import { useAppDispatch } from '@/store/hooks';
import { setConnected } from '@/store/realtimeSlice';

export function useRealtime() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  useEffect(() => {
    // 1. Відкрити лінію. withCredentials — щоб браузер надіслав cookie (як в axios)
    const socket = io(SOCKET_URL, { withCredentials: true });

    // 2. Підписатися на події:
    socket.on('order.created', () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    });
    socket.on('order.updated', () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    });
    socket.on('reservation.created', () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    });
    socket.on('reservation.updated', () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    });
    socket.on('dish.availabilityChanged', () => {
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
    });

    socket.on('connect', () => {
      dispatch(setConnected(true));
      queryClient.invalidateQueries();
    }); // лінія відкрилась (і після кожного перепідключення теж)
    socket.on('disconnect', () => {
      dispatch(setConnected(false));
    }); // лінія обірвалась

    // 3. Прибирання: коли компонент зникає — покласти слухавку
    return () => {
      socket.disconnect();
    };
  }, [queryClient, dispatch]);
}
