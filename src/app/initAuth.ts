"use client";

import { useEffect } from "react";

import { useStore } from "@/shared/stores/global/RootStore";

export const InitAuth = () => {
  const { authStore, cartStore } = useStore();

  useEffect(() => {
    const init = async () => {
      if (authStore.isAuthenticated) {
        await cartStore.loadCart();
        return;
      }

      const email = `Alice${Date.now()}@test.com`;
      const password = "Test123";

      const registerResult = await authStore.register("Alice", email, password);

      if (!registerResult.isError) {
        console.log("Регистрация успешна");
        await cartStore.loadCart();
        return;
      }

      console.log("Регистрация не удалась, пробуем логин");
      const loginResult = await authStore.login(email, password);

      if (!loginResult.isError) {
        console.log("Логин успешен");
        await cartStore.loadCart();
      } else {
        console.error("Ошибка авторизации", loginResult.error);
      }
    };

    init();
  }, [authStore, cartStore]);

  return null;
};
