"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useShop } from "@/components/ShopProvider";

const fieldClass =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 font-normal text-ink placeholder:text-muted/70 focus:border-ink focus:outline-none";

function safeNext(value) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/account";
  return value;
}

export function AddressEditor() {
  const params = useParams();
  const search = useSearchParams();
  const router = useRouter();
  const { t, ready, addresses, saveAddress } = useShop();
  const existing = addresses.find((item) => item.id === params.id);
  const next = safeNext(search.get("next"));
  const [pinTouched, setPinTouched] = useState(false);
  const [lookup, setLookup] = useState("");
  const [localities, setLocalities] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!ready || form) return;
    if (params.id && !existing) return;
    setForm({
      fullName: existing?.fullName || "",
      phone: existing?.phone || "",
      pincode: existing?.pincode || "",
      locality: existing?.locality || "",
      address: existing?.address || "",
      landmark: existing?.landmark || "",
      city: existing?.city || "",
      state: existing?.state || "",
      isDefault: existing ? existing.isDefault : addresses.length === 0,
    });
  }, [ready, existing, params.id, addresses.length, form]);

  useEffect(() => {
    if (!pinTouched || !form || !/^\d{6}$/.test(form.pincode)) return undefined;
    const controller = new AbortController();
    setLookup("loading");
    fetch(`/api/pincode/${form.pincode}`, { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => {
        if (!data.ok) {
          setLookup("miss");
          setLocalities([]);
          return;
        }
        setLookup("ok");
        setLocalities(data.localities || []);
        setForm((current) => ({
          ...current,
          city: data.city || current.city,
          state: data.state || current.state,
          locality: data.localities?.includes(current.locality) ? current.locality : data.localities?.[0] || "",
        }));
      })
      .catch((reason) => {
        if (reason.name !== "AbortError") setLookup("miss");
      });
    return () => controller.abort();
  }, [form?.pincode, pinTouched]);

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function onSubmit(event) {
    event.preventDefault();
    if (!/^\d{6}$/.test(form.pincode)) {
      setError(t("pincodeInvalid"));
      return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError(t("phoneInvalid"));
      return;
    }
    if (form.fullName.trim().length < 2 || form.address.trim().length < 5 || !form.city.trim() || !form.state.trim()) {
      setError(t("addressRequired"));
      return;
    }
    saveAddress({
      id: existing?.id,
      fullName: form.fullName.trim(),
      phone: form.phone,
      pincode: form.pincode,
      locality: form.locality.trim(),
      address: form.address.trim(),
      landmark: form.landmark.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      isDefault: form.isDefault,
    });
    router.push(next);
  }

  const title = existing ? t("editAddress") : t("addAddress");

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
            <span className="font-semibold text-ink">{title}</span>
          </li>
        </ol>
      </nav>
      <h1 className="mt-6 font-serif text-4xl font-semibold">{title}</h1>
      <p className="mt-2 text-muted">{t("pincodeHint")}</p>
      {params.id && ready && !existing ? (
        <p className="mt-8 text-muted">{t("noAddresses")}</p>
      ) : !form ? (
        <p className="mt-8 text-muted">{t("lookingUp")}</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 rounded-3xl border border-line bg-card p-6 sm:p-8">
          <div className="grid gap-4">
            <label className="grid gap-1.5 text-sm font-semibold">
              {t("pincode")}
              <input
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={6}
                required
                value={form.pincode}
                placeholder="110001"
                onChange={(event) => {
                  setPinTouched(true);
                  update("pincode", event.target.value.replace(/\D/g, "").slice(0, 6));
                }}
                className={fieldClass}
              />
            </label>
            <p className="text-sm text-muted" aria-live="polite">
              {lookup === "loading" ? t("lookingUp") : null}
              {lookup === "ok" ? t("filledFromPin") : null}
              {lookup === "miss" ? t("lookupFail") : null}
            </p>
            {localities.length > 0 && (
              <label className="grid gap-1.5 text-sm font-semibold">
                {t("locality")}
                <select value={form.locality} onChange={(event) => update("locality", event.target.value)} className={fieldClass}>
                  {localities.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </label>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-semibold">
                {t("city")}
                <input required value={form.city} onChange={(event) => update("city", event.target.value)} className={fieldClass} />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold">
                {t("state")}
                <input required value={form.state} onChange={(event) => update("state", event.target.value)} className={fieldClass} />
              </label>
            </div>
            <label className="grid gap-1.5 text-sm font-semibold">
              {t("fullName")}
              <input required autoComplete="name" value={form.fullName} onChange={(event) => update("fullName", event.target.value)} className={fieldClass} />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold">
              {t("mobile")}
              <input
                required
                inputMode="numeric"
                autoComplete="tel"
                maxLength={10}
                placeholder="9876543210"
                value={form.phone}
                onChange={(event) => update("phone", event.target.value.replace(/\D/g, "").slice(0, 10))}
                className={fieldClass}
              />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold">
              {t("addressLine")}
              <textarea
                required
                rows={3}
                placeholder={t("addressPlaceholder")}
                value={form.address}
                onChange={(event) => update("address", event.target.value)}
                className={fieldClass}
              />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold">
              {t("landmarkOptional")}
              <input value={form.landmark} onChange={(event) => update("landmark", event.target.value)} className={fieldClass} />
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input
                type="checkbox"
                checked={form.isDefault}
                onChange={(event) => update("isDefault", event.target.checked)}
                className="h-4 w-4 accent-[var(--accent)]"
              />
              {t("makeDefault")}
            </label>
          </div>
          {error && <p className="mt-4 text-sm font-semibold text-accent">{error}</p>}
          <button type="submit" className="mt-6 w-full rounded-full bg-accent py-3.5 font-semibold text-white transition hover:bg-accent-hover sm:w-auto sm:px-8">
            {t("saveAddress")}
          </button>
        </form>
      )}
    </div>
  );
}
