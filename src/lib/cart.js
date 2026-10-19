"use client";

import { useSyncExternalStore } from "react";

// Chhota cart store (provider ki zaroorat nahi). Items localStorage me save hote hain.
// Checkout abhi nahi hai, wo e-commerce phase me jodenge.

const STORAGE_KEY = "auwoods-cart-v1";
const SERVER_STATE = { items: [], open: false };

let state = { items: [], open: false };
let hydrated = false;
const listeners = new Set();

const isValid = (i) =>
  i && typeof i.key === "string" && typeof i.price === "number" && i.qty > 0;

function emit() {
  listeners.forEach((l) => l());
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  } catch {
    // private mode: cart bas is session me rahega
  }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const items = raw ? JSON.parse(raw) : [];
    return Array.isArray(items) ? items.filter(isValid) : [];
  } catch {
    return [];
  }
}

function set(next) {
  state = { ...state, ...next };
  if (next.items) save();
  emit();
}

function subscribe(cb) {
  if (!hydrated) {
    hydrated = true;
    state = { ...state, items: load() };
  }
  listeners.add(cb);
  // Doosre tab me cart badle to yahan bhi sync ho
  const onStorage = (e) => {
    if (e.key === STORAGE_KEY) {
      state = { ...state, items: load() };
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  cb();
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => state;
const getServerSnapshot = () => SERVER_STATE;

export function useCart() {
  const s = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const count = s.items.reduce((n, i) => n + i.qty, 0);
  const subtotal = s.items.reduce((n, i) => n + i.price * i.qty, 0);
  return { items: s.items, open: s.open, count, subtotal };
}

export const openCart = () => set({ open: true });
export const closeCart = () => set({ open: false });

// product: catalog item. opts: { finish, size, price, qty }
export function addItem(product, { finish, size, price, qty = 1 } = {}) {
  const key = [product.slug, finish ?? "", size ?? ""].join("|");
  const unit = typeof price === "number" ? price : product.price;
  const existing = state.items.find((i) => i.key === key);

  const items = existing
    ? state.items.map((i) =>
        i.key === key ? { ...i, qty: Math.min(i.qty + qty, 20) } : i
      )
    : [
        ...state.items,
        {
          key,
          slug: product.slug,
          name: product.name,
          image: product.image ?? product.images?.[0],
          price: unit,
          finish: finish ?? null,
          size: size ?? null,
          qty,
        },
      ];

  set({ items, open: true });
}

export function setQty(key, qty) {
  if (qty < 1) return removeItem(key);
  set({
    items: state.items.map((i) =>
      i.key === key ? { ...i, qty: Math.min(qty, 20) } : i
    ),
  });
}

export function removeItem(key) {
  set({ items: state.items.filter((i) => i.key !== key) });
}

export function clearCart() {
  set({ items: [] });
}