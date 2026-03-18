"use client";

import Button from "@components/Button/Button";
import Input from "@components/Input/Input";
import Text from "@components/Text/Text";
import { useStore } from "@stores/global/RootStore";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./login.module.scss";

const LoginPage = observer(() => {
  const router = useRouter();
  const { authStore, cartStore } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    let result;
    if (isLogin) {
      result = await authStore.login(email, password);
    } else {
      result = await authStore.register(email.split("@")[0], email, password);
    }

    if (!result.isError) {
      await cartStore.loadCart();
      router.push("/products");
    } else {
      setError(result.error || "Ошибка авторизации");
    }
    setLoading(false);
  };

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit} className={styles["root__form"]}>
        <Text view="title" className={styles["root__form--title"]}>
          {isLogin ? "Sing In" : "Sing Up"}
        </Text>

        <Input
          value={email}
          onChange={setEmail}
          placeholder="Email"
          type="email"
          required
          className={styles["root__input"]}
          afterSlot={null}
        />

        <Input
          value={password}
          onChange={setPassword}
          placeholder="Password"
          type="password"
          required
          className={styles["root__input"]}
          afterSlot={null}
        />

        {error && (
          <Text view="p-14" color="danger">
            {error}
          </Text>
        )}

        <Button
          type="submit"
          disabled={loading}
          className={styles["root__button"]}
        >
          {loading ? "Loading..." : isLogin ? "Sing In" : "Sing Up"}
        </Button>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className={styles["root__toggle"]}
        >
          {isLogin
            ? "Don't have an account? Sing up"
            : "Already have an account? Sing in"}
        </button>
      </form>
    </div>
  );
});

export default LoginPage;
