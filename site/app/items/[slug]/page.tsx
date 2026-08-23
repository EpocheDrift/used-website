/* eslint-disable @next/next/no-html-link-for-pages -- Standalone detail exits use native navigation so Vinext cannot intercept them. */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ItemDetailBody } from '../../item-detail';
import { items, type Item } from '../../items';

type ItemPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return items.map((item) => ({ slug: item.slug }));
}

function itemStatusCopy(item: Item) {
  if (item.status === 'sold') return 'This item has been sold.';
  if (item.status === 'reserved') return 'Currently reserved in Bellevue.';
  return 'Available for pickup in Bellevue through August 31, 2026.';
}

function headerStatus(item: Item) {
  if (item.status === 'sold') return 'Sold';
  if (item.status === 'reserved') return 'Currently reserved';
  return 'Available through August 31';
}

export async function generateMetadata({
  params,
}: ItemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = items.find((candidate) => candidate.slug === slug);

  if (!item) return {};

  const description = `${item.price}. ${item.description} ${itemStatusCopy(item)}`;

  return {
    title: `${item.name} — Zayn's Moving Sale`,
    description,
    alternates: { canonical: `/items/${item.slug}` },
    openGraph: {
      title: `${item.name} — Zayn's Moving Sale`,
      description,
      type: 'website',
      url: `/items/${item.slug}`,
      images: [{ url: item.image, alt: item.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${item.name} — Zayn's Moving Sale`,
      description,
      images: [item.image],
    },
  };
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { slug } = await params;
  const item = items.find((candidate) => candidate.slug === slug);

  if (!item) notFound();

  return (
    <div className="standalone-page">
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Zayn's moving sale home">
          ZAYN
        </a>
        <span>{headerStatus(item)}</span>
        <a href="/#collection">All items ←</a>
      </header>
      <main className="standalone-detail">
        <div className="standalone-label">
          <span>Object {item.id}</span>
          <span>Bellevue, Washington</span>
        </div>
        <ItemDetailBody item={item} titleLevel="h1" />
      </main>
    </div>
  );
}
