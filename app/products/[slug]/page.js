import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProductView } from "@/components/ProductView";
import { getProduct, products, relatedProducts } from "@/lib/catalog";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductPage({ params }) {
  return (
    <Suspense fallback={<ProductFallback />}>
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductView product={product} related={relatedProducts(product)} />;
}

function ProductFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="h-4 w-48 rounded bg-bg-alt" />
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="aspect-[4/5] rounded-3xl bg-bg-alt" />
        <div>
          <div className="h-4 w-28 rounded bg-bg-alt" />
          <div className="mt-3 h-12 w-2/3 rounded bg-bg-alt" />
          <div className="mt-6 h-8 w-32 rounded bg-bg-alt" />
          <div className="mt-6 h-20 w-full rounded bg-bg-alt" />
        </div>
      </div>
    </div>
  );
}
