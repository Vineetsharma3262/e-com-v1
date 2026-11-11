"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BadgeCheck, Lock } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useShop } from "@/components/ShopProvider";
import { clearCheckout, clearPendingPayment, readPendingPayment } from "@/lib/checkout";
import { getProduct } from "@/lib/catalog";
import { formatINR, site } from "@/lib/site";

const fieldClass =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 font-normal text-ink placeholder:text-muted/70 focus:border-ink focus:outline-none";

const banks = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank"];

export function PaymentView() {
  const router = useRouter();
  const { t, placeOrder, clearCart } = useShop();
  const [pending, setPending] = useState(undefined);
  const [method, setMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upi, setUpi] = useState("");
  const [bank, setBank] = useState("");
  const [error, setError] = useState("");
  const [phase, setPhase] = useState("form");

  useEffect(() => {
    setPending(readPendingPayment());
  }, []);

  const summary = useMemo(() => {
    if (!pending) return null;
    const lines = (pending.lines || [])
      .map((line) => {
        const product = getProduct(line.slug);
        if (!product) return null;
        return { ...line, product };
      })
      .filter(Boolean);
    const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);
    const shipping = lines.length === 0 ? 0 : subtotal >= site.freeShippingOver ? 0 : site.shippingFee;
    return { lines, subtotal, shipping, total: subtotal + shipping };
  }, [pending]);

  function pay(event) {
    event.preventDefault();
    if (method === "card") {
      const digits = cardNumber.replace(/\s/g, "");
      const expiryOk = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry);
      if (digits.length !== 16 || !cardName.trim() || !expiryOk || cvv.length < 3) {
        setError(t("invalidCard"));
        return;
      }
    }
    if (method === "upi" && !/^[\w.\-]{2,}@[\w.\-]{2,}$/.test(upi.trim())) {
      setError(t("invalidUpi"));
      return;
    }
    if (method === "bank" && !bank) {
      setError(t("invalidBank"));
      return;
    }
    setError("");
    setPhase("processing");
    window.setTimeout(() => {
      const order = placeOrder({
        lines: summary.lines,
        address: pending.address,
        payment: "online",
      });
      if (pending.source === "cart") clearCart();
      clearCheckout();
      clearPendingPayment();
      setPhase("success");
      window.setTimeout(() => router.push(`/orders/${order.id}`), 700);
    }, 1100);
  }

  if (pending === undefined) {
    return <p className="mx-auto max-w-5xl px-4 py-16 text-muted">{t("lookingUp")}</p>;
  }

  if (!pending || !summary || summary.lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-muted">{t("emptyCheckout")}</p>
        <Link href="/checkout" className="mt-4 inline-block font-semibold text-accent underline underline-offset-2">
          {t("checkout")}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-bg-alt py-8">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-4 rounded-2xl border border-saffron/40 bg-saffron/15 px-4 py-3 text-sm font-semibold text-ink">
          {t("demoBanner")}
        </div>
        <div className="overflow-hidden rounded-3xl border border-line bg-card shadow-xl">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="bg-night px-6 py-8 text-paper">
              <Logo tone="light" />
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-saffron">{t("demoTitle")}</p>
              <p className="mt-3 font-serif text-4xl font-semibold">{formatINR(summary.total)}</p>
              <ul className="mt-6 space-y-3 text-sm text-paper/80">
                {summary.lines.map((line) => (
                  <li key={`${line.slug}-${line.size}`} className="flex justify-between gap-3">
                    <span>
                      {line.product.name}
                      <span className="block text-xs text-paper/55">
                        {line.size} · × {line.qty}
                      </span>
                    </span>
                    <span>{formatINR(line.product.price * line.qty)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-center gap-2 text-xs text-paper/60">
                <Lock className="h-3.5 w-3.5" />
                {t("paySecure")}
              </p>
            </div>
            <div className="p-6 sm:p-8">
              {phase === "success" ? (
                <div className="grid min-h-64 place-items-center text-center">
                  <div>
                    <BadgeCheck className="mx-auto h-12 w-12 text-accent" />
                    <p className="mt-3 font-serif text-3xl font-semibold">{t("paymentOk")}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={pay}>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      ["card", t("cardTab")],
                      ["upi", t("upiTab")],
                      ["bank", t("bankTab")],
                    ].map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setMethod(id);
                          setError("");
                        }}
                        className={`rounded-xl border px-2 py-2.5 text-sm font-semibold ${
                          method === id ? "border-ink bg-ink text-bg" : "border-line"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 grid gap-4">
                    {method === "card" && (
                      <>
                        <label className="grid gap-1.5 text-sm font-semibold">
                          {t("cardNumber")}
                          <input
                            inputMode="numeric"
                            autoComplete="off"
                            placeholder="4242 4242 4242 4242"
                            value={cardNumber}
                            onChange={(event) => {
                              const digits = event.target.value.replace(/\D/g, "").slice(0, 16);
                              setCardNumber(digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim());
                            }}
                            className={fieldClass}
                          />
                        </label>
                        <label className="grid gap-1.5 text-sm font-semibold">
                          {t("nameOnCard")}
                          <input value={cardName} autoComplete="off" onChange={(event) => setCardName(event.target.value)} className={fieldClass} />
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <label className="grid gap-1.5 text-sm font-semibold">
                            {t("expiry")}
                            <input
                              inputMode="numeric"
                              placeholder="MM/YY"
                              value={expiry}
                              onChange={(event) => {
                                const digits = event.target.value.replace(/\D/g, "").slice(0, 4);
                                setExpiry(digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits);
                              }}
                              className={fieldClass}
                            />
                          </label>
                          <label className="grid gap-1.5 text-sm font-semibold">
                            {t("cvv")}
                            <input
                              inputMode="numeric"
                              placeholder="123"
                              value={cvv}
                              onChange={(event) => setCvv(event.target.value.replace(/\D/g, "").slice(0, 4))}
                              className={fieldClass}
                            />
                          </label>
                        </div>
                      </>
                    )}
                    {method === "upi" && (
                      <label className="grid gap-1.5 text-sm font-semibold">
                        {t("upiId")}
                        <input
                          placeholder="name@okbank"
                          autoComplete="off"
                          value={upi}
                          onChange={(event) => setUpi(event.target.value)}
                          className={fieldClass}
                        />
                      </label>
                    )}
                    {method === "bank" && (
                      <label className="grid gap-1.5 text-sm font-semibold">
                        {t("chooseBank")}
                        <select value={bank} onChange={(event) => setBank(event.target.value)} className={fieldClass}>
                          <option value="">{t("chooseBank")}</option>
                          {banks.map((name) => (
                            <option key={name} value={name}>{name}</option>
                          ))}
                        </select>
                      </label>
                    )}
                  </div>
                  {error && <p className="mt-4 text-sm font-semibold text-accent">{error}</p>}
                  <button
                    type="submit"
                    disabled={phase === "processing"}
                    className="mt-6 w-full rounded-full bg-accent py-3.5 font-semibold text-white transition hover:bg-accent-hover disabled:opacity-60"
                  >
                    {phase === "processing" ? t("processing") : `${t("pay")} ${formatINR(summary.total)}`}
                  </button>
                  <Link href="/checkout" className="mt-4 block text-center text-sm font-semibold text-muted hover:text-ink">
                    {t("backToCheckout")}
                  </Link>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
