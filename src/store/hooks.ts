import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

// Ті самі хуки з react-redux, але з "вшитими" типами.
// .withTypes<...>() — "запам'ятай цей тип, щоб не писати його щоразу".
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
