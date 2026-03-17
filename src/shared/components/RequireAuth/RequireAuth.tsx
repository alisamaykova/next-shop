"use client";

import { useStore } from "@stores/global/RootStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const store = useStore();

  useEffect(() => {
    if (!store.authStore.isAuthenticated) {
      router.push("/login");
    }
  }, [store.authStore.isAuthenticated, router]);

  return store.authStore.isAuthenticated ? <>{children}</> : null;
};
