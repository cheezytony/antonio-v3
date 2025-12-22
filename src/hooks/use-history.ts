import { HistoryContext } from '@/contexts/history.context';
import { useContext } from 'react';

export function useHistory() {
  return useContext(HistoryContext);
}
