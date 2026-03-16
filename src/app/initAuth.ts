"use client";

import { useStore } from "@stores/global/RootStore";
import { useEffect } from "react";

export const InitAuth = () => {
  const { authStore, cartStore } = useStore();

  useEffect(() => {
    if (authStore.isAuthenticated) {
      cartStore.loadCart();
    }
  }, [authStore, cartStore]);

  return null;
};
