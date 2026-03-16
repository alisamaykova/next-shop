import { makeAutoObservable } from "mobx";

import type { Product } from "@/shared/types/Product";
import { isServer } from "@/shared/utils/isServer";

export class WishlistStore {
  items: Product[] = [];

  constructor() {
    makeAutoObservable(this);
    if (!isServer) {
      this.loadFromStorage();
    }
  }

  private loadFromStorage() {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      try {
        this.items = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse wishlist", e);
      }
    }
  }

  private saveToStorage() {
    if (!isServer) {
      localStorage.setItem("wishlist", JSON.stringify(this.items));
    }
  }

  addItem(product: Product) {
    if (!this.items.find((item) => item.id === product.id)) {
      this.items.push(product);
      this.saveToStorage();
    }
  }

  removeItem(productId: number) {
    this.items = this.items.filter((item) => item.id !== productId);
    this.saveToStorage();
  }

  toggleItem(product: Product) {
    if (this.items.find((item) => item.id === product.id)) {
      this.removeItem(product.id);
    } else {
      this.addItem(product);
    }
  }

  isInWishlist(productId: number): boolean {
    return this.items.some((item) => item.id === productId);
  }

  get totalItems(): number {
    return this.items.length;
  }
}
