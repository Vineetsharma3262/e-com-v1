"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, X } from "lucide-react";
import { useShop } from "@/components/ShopProvider";
import { saveCheckout } from "@/lib/checkout";
import { formatINR } from "@/lib/site";

export function CartDrawer() {
  const router = useRouter();
  const { t, cart, subtotal, shipping, total, cartOpen, setCartOpen, changeQty, removeItem } = useShop();

  function checkout() {
    saveCheckout({ source: "cart" });
    setCartOpen(false);
    router.push("/checkout");
  }

  return (
    <div className={`fixed inset-0 z-50 ${cartOpen ? "" : "pointer-events-none"}`} aria-hidden={!cartOpen}>
      <button
        type="button"
        aria-label={t("closeCart")}
        className={`absolute inset-0 bg-ink/40 transition-opacity ${cartOpen ? "opacity-100" : "opacity-0"}`}
        onClick={() => setCartOpen(false)}
      />
      <aside
        role="dialog"
        aria-label={t("cart")}
        className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-line bg-bg shadow-2xl transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line p-5">
          <h2 className="font-serif text-2xl font-semibold">{t("cart")}</h2>
          <button type="button" onClick={() => setCartOpen(false)} aria-label={t("closeCart")} className="rounded-full p-2 hover:bg-card">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div>
              <p className="text-muted">{t("cartEmpty")}</p>
              <Link
                href="/collections/all"
                onClick={() => setCartOpen(false)}
                className="mt-4 inline-block font-semibold text-accent underline underline-offset-2"
              >
                {t("browse")}
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <Link href={`/products/${item.product.slug}`} onClick={() => setCartOpen(false)} className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-bg-alt">
                    <img src={item.product.image} alt="" className="h-full w-full object-cover" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/products/${item.product.slug}`} onClick={() => setCartOpen(false)} className="text-sm font-semibold leading-snug hover:text-accent">
                        {item.product.name}
                      </Link>
                      <button type="button" onClick={() => removeItem(item.id)} aria-label={t("remove")} className="text-muted hover:text-ink">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-muted">
                      {t("size")}: {item.size === "One size" ? t("oneSize") : item.size}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-line">
                        <button type="button" aria-label={t("decrease")} className="grid h-8 w-8 place-items-center" onClick={() => changeQty(item.id, -1)}>
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                        <button type="button" aria-label={t("increase")} className="grid h-8 w-8 place-items-center" onClick={() => changeQty(item.id, 1)}>
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-semibold">{formatINR(item.lineTotal)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-auto border-t border-line p-5">
          <dl className="mb-4 space-y-1.5">
            <div className="flex justify-between text-sm text-muted">
              <dt>{t("subtotal")}</dt>
              <dd>{formatINR(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-sm text-muted">
              <dt>{t("shipping")}</dt>
              <dd>{shipping === 0 ? t("free") : formatINR(shipping)}</dd>
            </div>
            <div className="flex justify-between font-semibold">
              <dt>{t("total")}</dt>
              <dd>{formatINR(total)}</dd>
            </div>
          </dl>
          <button
            type="button"
            disabled={cart.length === 0}
            onClick={checkout}
            className="w-full rounded-full bg-ink py-3 font-semibold text-bg transition hover:bg-accent hover:text-white disabled:opacity-40"
          >
            {t("checkout")}
          </button>
          <p className="mt-3 text-center text-xs text-muted">{t("cartNote")}</p>
        </div>
      </aside>
    </div>
  );
}
