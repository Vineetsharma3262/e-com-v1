import { Suspense } from "react";
import { OrderView } from "@/components/OrderView";

export const metadata = { title: "Order placed" };

export default function OrderPage() {
  return (
    <Suspense fallback={null}>
      <OrderView />
    </Suspense>
  );
}
