"use client";

import { Plus } from "lucide-react";
import { useShop } from "@/components/ShopProvider";

export function FaqList() {
  const { faqs } = useShop();

  return (
    <div className="space-y-2.5">
      {faqs.map((item) => (
        <details key={item.q} className="group rounded-xl border border-line bg-card px-4 open:border-accent/40">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3.5 font-bold [&::-webkit-details-marker]:hidden">
            {item.q}
            <Plus className="h-5 w-5 shrink-0 text-accent transition group-open:rotate-45" />
          </summary>
          <p className="pb-4 leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
