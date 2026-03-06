import { useContext } from "react";

export const useStrictContext = <T>(
  context: React.Context<T | null>,
  message?: string,
): T => {
  const value = useContext(context);
  if (value === null) {
    throw new Error(message ?? "Missinf provider");
  }
  return value;
};
