import { createContext, useContext } from "react";

import { AuthStore } from "./AuthStore";
import { CartStore } from "./CartStore";
import { QueryParamsStore } from "./QueryParamsStore";
import { WishlistStore } from "./WishlistStore";

export const RootStoreContext = createContext<RootStore | null>(null);

export const useStore = () => {
  const context = useContext(RootStoreContext);
  if (!context) {
    throw new Error("useStore must be used within RootStoreProvider");
  }
  return context;
};

export class RootStore {
  cartStore: CartStore;
  authStore: AuthStore;
  queryParamsStore: QueryParamsStore;
  WishlistStore: WishlistStore;

  constructor() {
    this.queryParamsStore = new QueryParamsStore();
    this.cartStore = new CartStore(this);
    this.authStore = new AuthStore(this);
    this.WishlistStore = new WishlistStore();
  }
}
