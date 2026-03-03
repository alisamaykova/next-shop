'use client';

import { ReactNode } from 'react';
import { RootStoreContext, useStore } from '@/shared/stores/global/RootStore'; // импортируем контекст и хук (хотя хук тут не нужен)
import { useCreateRootStore } from '@/shared/stores/global/useCreateRootStore';

export const RootStoreProvider = ({ children }: { children: ReactNode }) => {
  const store = useCreateRootStore();
  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
};