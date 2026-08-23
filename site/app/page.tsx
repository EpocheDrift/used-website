'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { items, statusLabels, type Item } from './items';
import { ContactOptions } from './contact-options';
import { ItemDetailBody } from './item-detail';

const currentItems = items.filter((item) => item.status !== 'sold');
const soldItems = items.filter((item) => item.status === 'sold');

function itemFromPath() {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/items\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function ItemCard({
  item,
  selectedSlug,
  onOpen,
}: {
  item: Item;
  selectedSlug: string | null;
  onOpen: (slug: string) => void;
}) {
  return (
    <article className={`item item--${item.status}`}>
      <button
        className="item-trigger"
        type="button"
        onClick={() => onOpen(item.slug)}
        aria-expanded={selectedSlug === item.slug}
        aria-controls="item-detail"
      >
        <span className="item-image">
          <img src={item.image} alt={item.imageAlt} />
          <span className="view-cue">
            View details{' '}
            <span className="view-arrow" aria-hidden="true">
              ↗︎
            </span>
          </span>
        </span>
        <span className="item-caption">
          <span>{item.id}</span>
          <span className="item-name">
            <strong>{item.name}</strong>
            <small>{item.kicker}</small>
          </span>
          <span className="item-price">{item.price}</span>
          <span className="item-status">
            <i aria-hidden="true" /> {statusLabels[item.status]}
          </span>
        </span>
      </button>
    </article>
  );
}

function ActiveItemIndex({
  placement,
  onOpen,
}: {
  placement: 'intro' | 'collection';
  onOpen: (slug: string) => void;
}) {
  const isCollectionIndex = placement === 'collection';

  return (
    <details className={`active-index active-index--${placement}`}>
      <summary className={isCollectionIndex ? 'collection-heading' : undefined}>
        <span>{isCollectionIndex ? 'Current collection' : 'Active item index'}</span>
        <span>
          {currentItems.length} {isCollectionIndex ? 'objects' : 'active items'}
        </span>
        <span className="active-index-action" aria-hidden="true">
          <span>View index +</span>
          <span>Close index −</span>
        </span>
      </summary>
      <nav className="active-index-list" aria-label="Active item index">
        {currentItems.map((item) => (
          <button
            className="active-index-item"
            type="button"
            key={item.id}
            onClick={() => onOpen(item.slug)}
            aria-label={`View ${item.name} details`}
          >
            <span>{item.id}</span>
            <span>{item.name}</span>
            <span>{item.price}</span>
            <span className={`active-index-status status--${item.status}`}>
              <i aria-hidden="true" /> {statusLabels[item.status]}
            </span>
          </button>
        ))}
      </nav>
    </details>
  );
}

export default function Home() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const detailPanelRef = useRef<HTMLElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const wasDetailOpenRef = useRef(false);
  const selectedItem = useMemo(
    () => items.find((item) => item.slug === selectedSlug) ?? null,
    [selectedSlug],
  );

  useEffect(() => {
    const syncFromHistory = () => setSelectedSlug(itemFromPath());
    syncFromHistory();
    window.addEventListener('popstate', syncFromHistory);
    return () => window.removeEventListener('popstate', syncFromHistory);
  }, []);

  useEffect(() => {
    if (!selectedItem) {
      if (wasDetailOpenRef.current) {
        wasDetailOpenRef.current = false;
        window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
      }
      return;
    }

    wasDetailOpenRef.current = true;
    detailPanelRef.current?.scrollTo({ top: 0 });
    closeButtonRef.current?.focus();
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeItem();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedItem]);

  function openItem(slug: string) {
    if (!selectedItem && document.activeElement instanceof HTMLElement) {
      lastTriggerRef.current = document.activeElement;
    }
    const historyMethod = selectedItem ? 'replaceState' : 'pushState';
    window.history[historyMethod]({}, '', `/items/${slug}`);
    setSelectedSlug(slug);
  }

  function closeItem() {
    window.history.back();
  }

  return (
    <div className={`page-shell ${selectedItem ? 'detail-open' : ''}`}>
      <div className="site-content">
        <header className="site-header">
          <a className="wordmark" href="#top" aria-label="Zayn's moving sale home">
            ZAYN
          </a>
          <span>Bellevue / through August 31</span>
          <a href="#collection">View items ↓</a>
        </header>

        <main>
          <section className="intro" id="top">
            <p className="eyebrow">Bellevue, Washington</p>
            <h1>Moving Sale</h1>
            <div className="intro-copy">
              <p>
                {currentItems.length} current items from Zayn, including
                instruments, electronics, furniture, and everyday objects,
                available or reserved locally while listed.
              </p>
              <dl className="availability">
                <div>
                  <dt>Availability</dt>
                  <dd>Through August 31, 2026</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>Bellevue Downtown</dd>
                </div>
                <div>
                  <dt>Delivery</dt>
                  <dd>Greater Seattle · scheduled</dd>
                </div>
                <div>
                  <dt>Contact</dt>
                  <dd>Zayn · text, call, or Instagram</dd>
                </div>
              </dl>
            </div>
            <ActiveItemIndex placement="intro" onOpen={openItem} />
          </section>

          <section
            className="collection"
            id="collection"
            aria-label="Current and sold items"
          >
            <ActiveItemIndex placement="collection" onOpen={openItem} />

            <div className="item-grid">
              {currentItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  selectedSlug={selectedSlug}
                  onOpen={openItem}
                />
              ))}
            </div>

            {soldItems.length > 0 && (
              <details className="sold-archive">
                <summary>
                  <span>Sold archive</span>
                  <span>
                    {soldItems.length} sold{' '}
                    {soldItems.length === 1 ? 'object' : 'objects'}
                  </span>
                  <span className="sold-archive-action" aria-hidden="true">
                    <span>View archive +</span>
                    <span>Close archive −</span>
                  </span>
                </summary>
                <div className="item-grid sold-grid">
                  {soldItems.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      selectedSlug={selectedSlug}
                      onOpen={openItem}
                    />
                  ))}
                </div>
              </details>
            )}
          </section>

          <footer className="site-footer">
            <p>Zayn / Bellevue</p>
            <div className="footer-message">
              <p>Interested in something?</p>
              <p>
                Contact Zayn to arrange pickup in Bellevue Downtown by August
                31. Delivery within greater Seattle may be possible by
                arrangement.
              </p>
            </div>
            <nav aria-label="Contact links">
              <ContactOptions compact />
              <a href="#top">Back to top ↑</a>
            </nav>
          </footer>
        </main>
      </div>

      <button
        className="detail-scrim"
        type="button"
        onClick={closeItem}
        aria-label="Close item details"
        tabIndex={selectedItem ? 0 : -1}
      />

      <aside
        className="detail-panel"
        id="item-detail"
        ref={detailPanelRef}
        aria-label={selectedItem ? `${selectedItem.name} details` : 'Item details'}
        aria-hidden={!selectedItem}
      >
        {selectedItem && (
          <>
            <div className="detail-toolbar">
              <span>
                Object {selectedItem.id} / {String(items.length).padStart(2, '0')}
              </span>
              <button type="button" onClick={closeItem} ref={closeButtonRef}>
                Close ×
              </button>
            </div>
            <ItemDetailBody item={selectedItem} />
          </>
        )}
      </aside>
    </div>
  );
}
