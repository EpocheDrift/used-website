import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ItemDetailBody } from '../../item-detail';
import { items } from '../../items';

type ItemPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: ItemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = items.find((candidate) => candidate.slug === slug);

  if (!item) return {};

  const description = `${item.price}. ${item.description} Available for pickup in Bellevue through August 31, 2026.`;

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
        <Link className="wordmark" href="/" aria-label="Zayn's moving sale home">
          ZAYN
        </Link>
        <span>Available through August 31</span>
        <Link href="/#collection">All items ←</Link>
      </header>
      <main className="standalone-detail">
        <div className="standalone-label">
          <span>Object {item.id}</span>
          <span>Bellevue, Washington</span>
        </div>
        <ItemDetailBody item={item} />
      </main>
    </div>
  );
}
