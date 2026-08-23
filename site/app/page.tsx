'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { items, statusLabels, type Item } from './items';
import { ContactOptions } from './contact-options';
import { ItemDetailBody } from './item-detail';

const currentItems = items.filter((item) => item.status !== 'sold');
const soldItems = items.filter((item) => item.status === 'sold');
const mobileDrawerQuery = '(max-width: 760px)';
const drawerTransitionMs = 700;

type PageScrollLock = {
  scrollX: number;
  scrollY: number;
  position: string;
  top: string;
  left: string;
  right: string;
  width: string;
  overflow: string;
};

type ScrollAnchor = {
  element: HTMLElement;
  viewportTop: number;
};

function restorePageScroll(lock: PageScrollLock) {
  const body = document.body;
  body.style.position = lock.position;
  body.style.top = lock.top;
  body.style.left = lock.left;
  body.style.right = lock.right;
  body.style.width = lock.width;
  body.style.overflow = lock.overflow;

  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  window.scrollTo({
    top: lock.scrollY,
    left: lock.scrollX,
    behavior: 'auto',
  });
  root.style.scrollBehavior = previousScrollBehavior;
}

function itemFromPath() {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/items\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function isMobileDrawer() {
  return window.matchMedia(mobileDrawerQuery).matches;
}

function ItemCard({
  item,
  selectedSlug,
  onOpen,
}: {
  item: Item;
  selectedSlug: string | null;
  onOpen: (slug: string, trigger: HTMLButtonElement) => void;
}) {
  return (
    <article className={`item item--${item.status}`}>
      <button
        className="item-trigger"
        type="button"
        data-scroll-anchor
        onClick={(event) => onOpen(item.slug, event.currentTarget)}
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
  onOpen: (slug: string, trigger: HTMLButtonElement) => void;
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
            data-scroll-anchor
            onClick={(event) => onOpen(item.slug, event.currentTarget)}
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
  const selectedSlugRef = useRef<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const detailPanelRef = useRef<HTMLElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);
  const wasDetailOpenRef = useRef(false);
  const pageScrollLockRef = useRef<PageScrollLock | null>(null);
  const pendingScrollAnchorRef = useRef<ScrollAnchor | null>(null);
  const scrollAnchorCleanupRef = useRef<(() => void) | null>(null);
  const selectedItem = useMemo(
    () => items.find((item) => item.slug === selectedSlug) ?? null,
    [selectedSlug],
  );

  const lockPageScroll = useCallback(() => {
    if (pageScrollLockRef.current) return;

    const body = document.body;
    const bodyWidth = body.getBoundingClientRect().width;
    const lock = {
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    pageScrollLockRef.current = lock;
    body.style.position = 'fixed';
    body.style.top = `-${lock.scrollY}px`;
    body.style.left = `-${lock.scrollX}px`;
    body.style.right = '0';
    body.style.width = `${bodyWidth}px`;
    body.style.overflow = 'hidden';
  }, []);

  const unlockPageScroll = useCallback(() => {
    const lock = pageScrollLockRef.current;
    if (!lock) return;

    pageScrollLockRef.current = null;
    restorePageScroll(lock);
  }, []);

  const stopScrollAnchoring = useCallback(() => {
    const cleanup = scrollAnchorCleanupRef.current;
    scrollAnchorCleanupRef.current = null;
    cleanup?.();
  }, []);

  const stabilizeScrollAnchor = useCallback(
    (anchor: ScrollAnchor) => {
      stopScrollAnchoring();
      if (!anchor.element.isConnected) return;

      const root = document.documentElement;
      const previousScrollBehavior = root.style.getPropertyValue('scroll-behavior');
      const previousOverflowAnchor = root.style.getPropertyValue('overflow-anchor');
      const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 80
        : drawerTransitionMs + 80;
      const scrollKeys = new Set([
        'ArrowDown',
        'ArrowUp',
        'PageDown',
        'PageUp',
        'Home',
        'End',
        ' ',
      ]);
      const startedAt = performance.now();
      let animationFrame = 0;
      let finished = false;

      root.style.setProperty('scroll-behavior', 'auto');
      root.style.setProperty('overflow-anchor', 'none');

      const restoreRootProperty = (property: string, value: string) => {
        if (value) root.style.setProperty(property, value);
        else root.style.removeProperty(property);
      };

      const finish = () => {
        if (finished) return;
        finished = true;
        window.cancelAnimationFrame(animationFrame);
        window.removeEventListener('wheel', finish);
        window.removeEventListener('touchmove', finish);
        window.removeEventListener('pointerdown', finish);
        window.removeEventListener('keydown', cancelForScrollKey);
        restoreRootProperty('scroll-behavior', previousScrollBehavior);
        restoreRootProperty('overflow-anchor', previousOverflowAnchor);
        if (scrollAnchorCleanupRef.current === finish) {
          scrollAnchorCleanupRef.current = null;
        }
      };

      const cancelForScrollKey = (event: KeyboardEvent) => {
        if (scrollKeys.has(event.key)) finish();
      };

      const correctPosition = () => {
        if (!anchor.element.isConnected) {
          return false;
        }

        const delta = anchor.element.getBoundingClientRect().top - anchor.viewportTop;
        if (Math.abs(delta) > 0.25) {
          window.scrollTo({
            top: Math.max(0, window.scrollY + delta),
            left: window.scrollX,
            behavior: 'auto',
          });
        }

        return true;
      };

      const keepPosition = (now: number) => {
        if (!correctPosition()) {
          finish();
          return;
        }

        if (now - startedAt < duration) {
          animationFrame = window.requestAnimationFrame(keepPosition);
        } else {
          finish();
        }
      };

      window.addEventListener('wheel', finish, { passive: true });
      window.addEventListener('touchmove', finish, { passive: true });
      window.addEventListener('pointerdown', finish, { passive: true });
      window.addEventListener('keydown', cancelForScrollKey);
      scrollAnchorCleanupRef.current = finish;
      correctPosition();
      animationFrame = window.requestAnimationFrame(keepPosition);
    },
    [stopScrollAnchoring],
  );

  const captureViewportAnchor = useCallback((): ScrollAnchor | null => {
    const headerOffset = 58;
    const candidates = document.querySelectorAll<HTMLElement>('[data-scroll-anchor]');
    let closest: ScrollAnchor | null = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    candidates.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.bottom <= headerOffset || rect.top >= window.innerHeight) return;

      const distance = Math.abs(rect.top - headerOffset);
      if (distance < closestDistance) {
        closest = { element, viewportTop: rect.top };
        closestDistance = distance;
      }
    });

    return closest;
  }, []);

  const openItem = useCallback(
    (slug: string, trigger: HTMLButtonElement) => {
      stopScrollAnchoring();
      lastTriggerRef.current = trigger;
      const drawerAlreadyOpen = Boolean(selectedSlugRef.current);

      if (isMobileDrawer()) {
        if (!drawerAlreadyOpen) {
          lockPageScroll();
        }
      } else {
        pendingScrollAnchorRef.current = {
          element: trigger,
          viewportTop: trigger.getBoundingClientRect().top,
        };
      }

      const historyMethod = drawerAlreadyOpen ? 'replaceState' : 'pushState';
      selectedSlugRef.current = slug;
      window.history[historyMethod]({}, '', `/items/${slug}`);
      setSelectedSlug(slug);
    },
    [lockPageScroll, stopScrollAnchoring],
  );

  const closeItem = useCallback(() => {
    stopScrollAnchoring();

    if (!isMobileDrawer()) {
      const anchor = captureViewportAnchor();
      pendingScrollAnchorRef.current = anchor;
      if (anchor) lastTriggerRef.current = anchor.element;
    } else {
      pendingScrollAnchorRef.current = null;
    }

    window.history.back();
  }, [captureViewportAnchor, stopScrollAnchoring]);

  useEffect(() => {
    const syncFromHistory = () => {
      const nextSlug = itemFromPath();
      const drawerWasOpen = Boolean(selectedSlugRef.current);
      const drawerWillOpen = Boolean(nextSlug);

      if (
        drawerWasOpen !== drawerWillOpen &&
        !isMobileDrawer() &&
        !pendingScrollAnchorRef.current
      ) {
        const anchor = captureViewportAnchor();
        pendingScrollAnchorRef.current = anchor;
        if (!drawerWillOpen && anchor) lastTriggerRef.current = anchor.element;
      }

      selectedSlugRef.current = nextSlug;
      setSelectedSlug(nextSlug);
    };
    syncFromHistory();
    window.addEventListener('popstate', syncFromHistory);
    return () => window.removeEventListener('popstate', syncFromHistory);
  }, [captureViewportAnchor]);

  useLayoutEffect(() => {
    const drawerWasOpen = wasDetailOpenRef.current;

    if (!selectedItem) {
      if (drawerWasOpen) {
        wasDetailOpenRef.current = false;
        unlockPageScroll();
        const anchor = pendingScrollAnchorRef.current;
        pendingScrollAnchorRef.current = null;
        if (anchor && !isMobileDrawer()) stabilizeScrollAnchor(anchor);
        window.requestAnimationFrame(() =>
          lastTriggerRef.current?.focus({ preventScroll: true }),
        );
      }
      return;
    }

    detailPanelRef.current?.scrollTo({ top: 0, behavior: 'auto' });

    if (!drawerWasOpen) {
      wasDetailOpenRef.current = true;

      if (isMobileDrawer()) {
        pendingScrollAnchorRef.current = null;
        lockPageScroll();
        closeButtonRef.current?.focus({ preventScroll: true });
      } else {
        unlockPageScroll();
        const anchor = pendingScrollAnchorRef.current;
        pendingScrollAnchorRef.current = null;
        if (anchor) stabilizeScrollAnchor(anchor);
      }
    } else {
      const anchor = pendingScrollAnchorRef.current;
      pendingScrollAnchorRef.current = null;
      if (anchor && !isMobileDrawer()) stabilizeScrollAnchor(anchor);
    }
  }, [
    lockPageScroll,
    selectedItem,
    stabilizeScrollAnchor,
    unlockPageScroll,
  ]);

  useEffect(() => {
    if (!selectedItem) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeItem();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [closeItem, selectedItem]);

  useEffect(
    () => () => {
      stopScrollAnchoring();
      const lock = pageScrollLockRef.current;
      if (lock) restorePageScroll(lock);
    },
    [stopScrollAnchoring],
  );

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
