import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CollectionView } from "@/components/CollectionView";
import { collectionStats, collections, getCollection, productsIn } from "@/lib/catalog";

export function generateStaticParams() {
  return [...collections.map((collection) => ({ slug: collection.slug })), { slug: "all" }];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return { title: collection.title };
}

export default function CollectionPage({ params }) {
  return (
    <Suspense fallback={<CollectionFallback />}>
      <CollectionContent params={params} />
    </Suspense>
  );
}

async function CollectionContent({ params }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();
  const list = productsIn(slug);
  const stats = collectionStats(slug);
  return <CollectionView collection={collection} products={list} count={stats.count} from={stats.from} />;
}

function CollectionFallback() {
  return (
    <>
      <section className="bg-night">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:px-8">
          <div className="h-4 w-32 rounded bg-white/15" />
          <div className="mt-4 h-12 w-72 max-w-full rounded bg-white/15" />
          <div className="mt-4 h-5 w-80 max-w-full rounded bg-white/10" />
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="h-4 w-40 rounded bg-bg-alt" />
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="aspect-[4/5] rounded-2xl bg-bg-alt" />
          ))}
        </div>
      </div>
    </>
  );
}
