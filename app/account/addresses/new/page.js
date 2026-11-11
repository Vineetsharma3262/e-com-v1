import { Suspense } from "react";
import { AddressEditor } from "@/components/AddressEditor";

export const metadata = { title: "Add address" };

export default function NewAddressPage() {
  return (
    <Suspense fallback={null}>
      <AddressEditor />
    </Suspense>
  );
}
