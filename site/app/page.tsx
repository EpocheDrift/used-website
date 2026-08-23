'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { items, statusLabels } from './items';
import { ContactOptions } from './contact-options';
import { ItemDetailBody } from './item-detail';

function itemFromPath() {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/items\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]) : null;
}

export default function Home() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
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
    if (!selectedItem) return;
    closeButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeItem();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selectedItem]);

  function openItem(slug: string) {
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
                {items.length} instruments, electronics, furniture, and
                everyday objects from Zayn, available locally while listed.
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
          </section>

          <section
            className="collection"
            id="collection"
            aria-label="Items for sale"
          >
            <div className="collection-heading">
              <p>Current collection</p>
              <p>{items.length} objects</p>
              <p>Select an item to view details</p>
            </div>

            <div className="item-grid">
              {items.map((item) => (
                <article
                  className={`item ${item.layout} item--${item.status}`}
                  key={item.id}
                >
                  <button
                    className="item-trigger"
                    type="button"
                    onClick={() => openItem(item.slug)}
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
              ))}
            </div>
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
