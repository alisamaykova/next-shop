'use client';

import "@/shared/config/configureMobX";
import { ReactNode } from 'react';
import { RootStoreContext } from '@/shared/stores/global/RootStore';
import { useCreateRootStore } from '@/shared/stores/global/useCreateRootStore';

export const RootStoreProvider = ({ children }: { children: ReactNode }) => {
  const store = useCreateRootStore();
  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
};