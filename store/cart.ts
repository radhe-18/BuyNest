import { create } from "zustand";
import { Product } from "@/data/products";

export type CartItem = Product & { qty: number };

type CartStore = {
  items: CartItem[];
  add: (product: Product) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  remove: (id: number) => void;
  totalQty: () => number;
  totalAmount: () => number;
};

export const useCart = create<CartStore>((set, get) => ({
  items: [],

  add: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...product, qty: 1 }] };
    }),

  increase: (id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, qty: i.qty + 1 } : i
      ),
    })),

  decrease: (id) =>
    set((state) => ({
      items: state.items
        .map((i) =>
          i.id === id ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0),
    })),

  remove: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  totalQty: () =>
    get().items.reduce((sum, item) => sum + item.qty, 0),

  totalAmount: () =>
    get().items.reduce(
      (sum, item) => sum + item.qty * item.price,
      0
    ),
}));
