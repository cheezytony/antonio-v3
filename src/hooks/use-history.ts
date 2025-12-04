import { useContext } from 'react';
import { HistoryContext } from '@/contexts/history';

export function useHistory() {
  return useContext(HistoryContext);
}