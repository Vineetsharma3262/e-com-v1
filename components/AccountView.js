"use client";

import Link from "next/link";
import { ChevronRight, MapPin, Plus } from "lucide-react";
import { useShop } from "@/components/ShopProvider";
import { formatINR } from "@/lib/site";

function formatWhen(value, lang) {
  return new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function AccountView() {
  const { t, lang, ready, addresses, orders, removeAddress, setDefaultAddress } = useShop();

  if (!ready) {
    return <p className="mx-auto max-w-5xl px-4 py-16 text-muted">{t("lookingUp")}</p>;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li className="flex items-center gap-1.5">
            <Link href="/" className="hover:text-accent">{t("home")}</Link>
          </li>
          <li className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-ink">{t("profile")}</span>
          </li>
        </ol>
      </nav>
      <h1 className="mt-6 font-serif text-4xl font-semibold sm:text-5xl">{t("yourAccount")}</h1>
      <p className="mt-2 max-w-xl text-muted">{t("accountNote")}</p>

      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-serif text-3xl font-semibold">{t("savedAddresses")}</h2>
          <Link href="/account/addresses/new" className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-bg">
            <Plus className="h-4 w-4" />
            {t("addAddress")}
          </Link>
        </div>
        {addresses.length === 0 ? (
          <p className="mt-4 text-muted">{t("noAddresses")}</p>
        ) : (
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {addresses.map((address) => (
              <li key={address.id} className="rounded-2xl border border-line bg-card p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold">{address.fullName}</p>
                  {address.isDefault && (
                    <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-accent">
                      {t("defaultBadge")}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {address.address}
                  {address.landmark ? `, ${address.landmark}` : ""}
                  <br />
                  {[address.locality, address.city, address.state, address.pincode].filter(Boolean).join(", ")}
                  <br />
                  {address.phone}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
                  <Link href={`/account/addresses/${address.id}`} className="rounded-full border border-line px-3 py-1.5 hover:border-ink">
                    {t("edit")}
                  </Link>
                  {!address.isDefault && (
                    <button type="button" onClick={() => setDefaultAddress(address.id)} className="rounded-full border border-line px-3 py-1.5 hover:border-ink">
                      {t("makeDefault")}
                    </button>
                  )}
                  <button type="button" onClick={() => removeAddress(address.id)} className="rounded-full px-3 py-1.5 text-accent hover:bg-accent/10">
                    {t("deleteAddress")}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-3xl font-semibold">{t("yourOrders")}</h2>
        {orders.length === 0 ? (
          <p className="mt-4 text-muted">{t("noOrders")}</p>
        ) : (
          <ul className="mt-5 space-y-4">
            {orders.map((order) => (
              <li key={order.id}>
                <Link href={`/orders/${order.id}`} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-card p-5 hover:border-accent/50">
                  <span>
                    <span className="block font-semibold">{order.id}</span>
                    <span className="mt-1 block text-sm text-muted">
                      {formatWhen(order.createdAt, lang)} · {order.items.length} {t("items")} · {order.payment === "cod" ? t("cod") : t("payOnline")}
                    </span>
                  </span>
                  <span className="flex items-center gap-2 font-semibold">
                    {formatINR(order.total)}
                    <MapPin className="h-4 w-4 text-accent" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
