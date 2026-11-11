import { Suspense } from "react";
import { AddressEditor } from "@/components/AddressEditor";

export const metadata = { title: "Edit address" };

export default function EditAddressPage() {
  return (
    <Suspense fallback={null}>
      <AddressEditor />
    </Suspense>
  );
}
