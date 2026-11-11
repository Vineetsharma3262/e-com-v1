"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BadgeCheck, ChevronRight } from "lucide-react";
import { useShop } from "@/components/ShopProvider";
import { formatINR } from "@/lib/site";

export function OrderView() {
  const params = useParams();
  const { t, ready, orders } = useShop();
  const order = orders.find((item) => item.id === params.id);

  if (!ready) return <p className="mx-auto max-w-3xl px-4 py-16 text-muted">{t("lookingUp")}</p>;

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-muted">{t("noOrders")}</p>
        <Link href="/account" className="mt-4 inline-block font-semibold text-accent underline underline-offset-2">
          {t("backAccount")}
        </Link>
      </div>
    );
  }

  const address = order.address;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li className="flex items-center gap-1.5">
            <Link href="/" className="hover:text-accent">{t("home")}</Link>
          </li>
          <li className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/account" className="hover:text-accent">{t("profile")}</Link>
          </li>
          <li className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-ink">{order.id}</span>
          </li>
        </ol>
      </nav>
      <div className="mt-8 rounded-3xl border border-line bg-card p-6 sm:p-8">
        <BadgeCheck className="h-10 w-10 text-accent" />
        <h1 className="mt-3 font-serif text-4xl font-semibold">{t("orderPlaced")}</h1>
        <p className="mt-2 text-muted">{t("orderThanks")}</p>
        <p className="mt-4 text-sm font-semibold">
          {t("orderId")}: {order.id}
        </p>
        <p className="mt-1 text-sm text-muted">
          {t("paymentLabel")}: {order.payment === "cod" ? t("codPaid") : t("onlinePaid")}
        </p>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {order.items.map((item) => (
            <li key={`${item.slug}-${item.size}`} className="flex items-center gap-3 py-3">
              <img src={item.image} alt="" className="h-16 w-14 rounded-lg object-cover" />
              <span className="min-w-0 flex-1">
                <Link href={`/products/${item.slug}`} className="font-semibold hover:text-accent">{item.name}</Link>
                <span className="block text-xs text-muted">
                  {t("size")} {item.size} · {t("qty")} {item.qty}
                </span>
              </span>
              <span className="font-semibold">{formatINR(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-muted">{t("shippingAddress")}</h2>
            <p className="mt-2 text-sm leading-relaxed">
              {address.fullName}
              <br />
              {address.address}
              {address.landmark ? `, ${address.landmark}` : ""}
              <br />
              {[address.locality, address.city, address.state, address.pincode].filter(Boolean).join(", ")}
              <br />
              {address.phone}
            </p>
          </div>
          <dl className="space-y-1.5 text-sm">
            <div className="flex justify-between text-muted">
              <dt>{t("subtotal")}</dt>
              <dd>{formatINR(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between text-muted">
              <dt>{t("shipping")}</dt>
              <dd>{order.shipping === 0 ? t("free") : formatINR(order.shipping)}</dd>
            </div>
            <div className="flex justify-between font-semibold">
              <dt>{t("total")}</dt>
              <dd>{formatINR(order.total)}</dd>
            </div>
          </dl>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/collections/all" className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white">
            {t("continueShopping")}
          </Link>
          <Link href="/account" className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold">
            {t("backAccount")}
          </Link>
        </div>
      </div>
    </div>
  );
}
