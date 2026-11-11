"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { faqs, faqsHi, getProduct } from "@/lib/catalog";
import { translate } from "@/lib/i18n";
import { site } from "@/lib/site";

const ShopContext = createContext(null);

export function useShop() {
  const value = useContext(ShopContext);
  if (!value) throw new Error("useShop must be used within ShopProvider");
  return value;
}

function lineId(slug, size) {
  return `${slug}::${size}`;
}

export function ShopProvider({ children }) {
  const [lang, setLangState] = useState("en");
  const [dark, setDark] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang === "hi" || storedLang === "en") setLangState(storedLang);
    setDark(document.documentElement.classList.contains("dark"));
    try {
      const stored = JSON.parse(localStorage.getItem("cart") || "[]");
      if (Array.isArray(stored)) setCart(stored);
    } catch {
      setCart([]);
    }
    try {
      const storedAddresses = JSON.parse(localStorage.getItem("addresses") || "[]");
      if (Array.isArray(storedAddresses)) setAddresses(storedAddresses);
    } catch {
      setAddresses([]);
    }
    try {
      const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      if (Array.isArray(storedOrders)) setOrders(storedOrders);
    } catch {
      setOrders([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders, ready]);

  useEffect(() => {
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
    if (ready) localStorage.setItem("lang", lang);
  }, [lang, ready]);

  useEffect(() => {
    document.body.style.overflow = cartOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, searchOpen]);

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") {
        setCartOpen(false);
        setSearchOpen(false);
        setMenuOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 1600);
  }

  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  }

  function setLang(next) {
    setLangState(next);
  }

  function addItem(slug, size, qty = 1) {
    setCart((current) => {
      const id = lineId(slug, size);
      const existing = current.find((item) => item.id === id);
      if (existing) {
        return current.map((item) =>
          item.id === id ? { ...item, qty: item.qty + qty } : item,
        );
      }
      return [...current, { id, slug, size, qty }];
    });
    notify(translate(lang, "added"));
  }

  function changeQty(id, delta) {
    setCart((current) =>
      current.flatMap((item) => {
        if (item.id !== id) return [item];
        const qty = item.qty + delta;
        return qty <= 0 ? [] : [{ ...item, qty }];
      }),
    );
  }

  function removeItem(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  function saveAddress(input) {
    setAddresses((current) => {
      const id = input.id || crypto.randomUUID();
      const record = { ...input, id };
      const next = input.id
        ? current.map((item) => (item.id === id ? record : item))
        : [...current, record];
      const makeDefault = input.isDefault || !next.some((item) => item.isDefault && item.id !== id);
      if (makeDefault) return next.map((item) => ({ ...item, isDefault: item.id === id }));
      return next.map((item) => (item.id === id ? { ...item, isDefault: false } : item));
    });
  }

  function removeAddress(id) {
    setAddresses((current) => {
      const next = current.filter((item) => item.id !== id);
      if (next.length && !next.some((item) => item.isDefault)) {
        next[0] = { ...next[0], isDefault: true };
      }
      return next;
    });
  }

  function setDefaultAddress(id) {
    setAddresses((current) => current.map((item) => ({ ...item, isDefault: item.id === id })));
  }

  function placeOrder({ lines, address, payment }) {
    const orderSubtotal = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);
    const orderShipping = orderSubtotal === 0 || orderSubtotal >= site.freeShippingOver ? 0 : site.shippingFee;
    const order = {
      id: `AUR${Date.now().toString().slice(-8)}`,
      items: lines.map((line) => ({
        slug: line.product.slug,
        name: line.product.name,
        image: line.product.image,
        size: line.size,
        qty: line.qty,
        price: line.product.price,
      })),
      address: { ...address },
      payment,
      subtotal: orderSubtotal,
      shipping: orderShipping,
      total: orderSubtotal + orderShipping,
      createdAt: new Date().toISOString(),
    };
    setOrders((current) => [order, ...current]);
    return order;
  }

  const lines = cart
    .map((item) => {
      const product = getProduct(item.slug);
      if (!product) return null;
      return { ...item, product, lineTotal: product.price * item.qty };
    })
    .filter(Boolean);

  const count = lines.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = lines.reduce((sum, item) => sum + item.lineTotal, 0);
  const shipping = lines.length === 0 ? 0 : subtotal >= site.freeShippingOver ? 0 : site.shippingFee;
  const total = subtotal + shipping;

  const value = {
    lang,
    setLang,
    t: (key) => translate(lang, key),
    faqs: lang === "hi" ? faqsHi : faqs,
    dark,
    toggleTheme,
    cart: lines,
    count,
    subtotal,
    shipping,
    total,
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    menuOpen,
    setMenuOpen,
    addItem,
    changeQty,
    removeItem,
    clearCart,
    ready,
    addresses,
    orders,
    saveAddress,
    removeAddress,
    setDefaultAddress,
    placeOrder,
    toast,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
