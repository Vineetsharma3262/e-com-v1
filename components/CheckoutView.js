"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronRight, MapPin } from "lucide-react";
import { useShop } from "@/components/ShopProvider";
import { clearCheckout, readCheckout, savePendingPayment } from "@/lib/checkout";
import { getProduct } from "@/lib/catalog";
import { formatINR, site } from "@/lib/site";

function resolveBuyLines(draft) {
  return (draft?.lines || [])
    .map((line) => {
      const product = getProduct(line.slug);
      if (!product) return null;
      return { ...line, product, lineTotal: product.price * line.qty };
    })
    .filter(Boolean);
}

export function CheckoutView() {
  const router = useRouter();
  const { t, ready, cart, addresses, placeOrder, clearCart } = useShop();
  const [draft, setDraft] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [payment, setPayment] = useState("cod");

  useEffect(() => {
    setDraft(readCheckout());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const selected = addresses.find((item) => item.isDefault) || addresses[0];
    if (selected) setAddressId((current) => current || selected.id);
  }, [ready, addresses]);

  const hasItems = draft?.source === "cart" ? cart.length > 0 : (draft?.lines?.length || 0) > 0;

  useEffect(() => {
    if (!ready || !loaded) return;
    if (addresses.length === 0 && hasItems) {
      router.replace("/account/addresses/new?next=/checkout");
    }
  }, [ready, loaded, addresses.length, hasItems, router]);

  const lines = draft?.source === "cart" ? cart : resolveBuyLines(draft);
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);
  const shipping = lines.length === 0 ? 0 : subtotal >= site.freeShippingOver ? 0 : site.shippingFee;
  const total = subtotal + shipping;
  const address = addresses.find((item) => item.id === addressId) || null;

  function place() {
    if (!address || lines.length === 0) return;
    if (payment === "online") {
      savePendingPayment({
        source: draft?.source || "buy",
        lines: lines.map((line) => ({ slug: line.product.slug, size: line.size, qty: line.qty })),
        address,
      });
      router.push("/checkout/pay");
      return;
    }
    const order = placeOrder({ lines, address, payment: "cod" });
    if (draft?.source === "cart") clearCart();
    clearCheckout();
    router.push(`/orders/${order.id}`);
  }

  if (!loaded || !ready || (addresses.length === 0 && lines.length > 0)) {
    return <p className="mx-auto max-w-5xl px-4 py-16 text-muted">{t("lookingUp")}</p>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li className="flex items-center gap-1.5">
            <Link href="/" className="hover:text-accent">{t("home")}</Link>
          </li>
          <li className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-ink">{t("checkout")}</span>
          </li>
        </ol>
      </nav>
      <h1 className="mt-6 font-serif text-4xl font-semibold sm:text-5xl">{t("checkoutTitle")}</h1>

      {lines.length === 0 ? (
        <div className="mt-8">
          <p className="text-muted">{t("emptyCheckout")}</p>
          <Link href="/collections/all" className="mt-4 inline-block font-semibold text-accent underline underline-offset-2">
            {t("browse")}
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.8fr]">
          <div className="space-y-8">
            <section>
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-serif text-2xl font-semibold">{t("deliveryTo")}</h2>
                <Link href="/account/addresses/new?next=/checkout" className="text-sm font-semibold text-accent">
                  {t("addNewAddress")}
                </Link>
              </div>
              <ul className="mt-4 space-y-3">
                {addresses.map((item) => {
                  const selected = item.id === address?.id;
                  return (
                    <li key={item.id}>
                      <label className={`flex cursor-pointer gap-3 rounded-2xl border p-4 ${selected ? "border-ink bg-card" : "border-line"}`}>
                        <input
                          type="radio"
                          name="address"
                          className="mt-1 accent-[var(--accent)]"
                          checked={selected}
                          onChange={() => setAddressId(item.id)}
                        />
                        <span className="min-w-0">
                          <span className="flex flex-wrap items-center gap-2 font-semibold">
                            <MapPin className="h-4 w-4 text-accent" />
                            {item.fullName}
                            {item.isDefault && (
                              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-accent">
                                {t("defaultBadge")}
                              </span>
                            )}
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-muted">
                            {item.address}
                            {item.landmark ? `, ${item.landmark}` : ""}
                            {", "}
                            {[item.locality, item.city, item.state, item.pincode].filter(Boolean).join(", ")}
                            {" · "}
                            {item.phone}
                          </span>
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold">{t("paymentLabel")}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ["cod", t("cod"), t("codHint")],
                  ["online", t("payOnline"), t("payOnlineHint")],
                ].map(([id, title, hint]) => (
                  <label key={id} className={`cursor-pointer rounded-2xl border p-4 ${payment === id ? "border-ink bg-card" : "border-line"}`}>
                    <span className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="payment"
                        className="mt-1 accent-[var(--accent)]"
                        checked={payment === id}
                        onChange={() => setPayment(id)}
                      />
                      <span>
                        <span className="block font-semibold">{title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted">{hint}</span>
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-3xl border border-line bg-card p-5 lg:sticky lg:top-36">
            <h2 className="font-serif text-2xl font-semibold">{t("orderSummary")}</h2>
            <ul className="mt-4 space-y-4">
              {lines.map((line) => (
                <li key={`${line.product.slug}-${line.size}`} className="flex gap-3">
                  <img src={line.product.image} alt="" className="h-20 w-16 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-snug">{line.product.name}</p>
                    <p className="mt-1 text-xs text-muted">
                      {t("size")} {line.size} · {t("qty")} {line.qty}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{formatINR(line.product.price * line.qty)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-1.5 border-t border-line pt-4 text-sm">
              <div className="flex justify-between text-muted">
                <dt>{t("subtotal")}</dt>
                <dd>{formatINR(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-muted">
                <dt>{t("shipping")}</dt>
                <dd>{shipping === 0 ? t("free") : formatINR(shipping)}</dd>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <dt>{t("total")}</dt>
                <dd>{formatINR(total)}</dd>
              </div>
            </dl>
            <button
              type="button"
              disabled={!address}
              onClick={place}
              className="mt-5 w-full rounded-full bg-accent py-3.5 font-semibold text-white transition hover:bg-accent-hover disabled:opacity-40"
            >
              {payment === "cod" ? t("placeCod") : t("continuePay")}
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
