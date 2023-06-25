import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from 'types/store.type';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
