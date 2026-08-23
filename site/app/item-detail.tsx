import type { Item } from './items';
import { statusLabels } from './items';
import { ContactOptions } from './contact-options';

function pickupCopy(item: Item) {
  if (item.status === 'sold') return 'This item has been sold.';

  const itemNote = item.pickupNote ? `${item.pickupNote} ` : '';
  const availability =
    item.status === 'reserved'
      ? 'This item is currently reserved. '
      : 'Available through August 31, 2026. ';

  return `${itemNote}${availability}Pickup in Bellevue Downtown, by arrangement.`;
}

export function ItemDetailBody({
  item,
  titleLevel = 'h2',
}: {
  item: Item;
  titleLevel?: 'h1' | 'h2';
}) {
  const Title = titleLevel;

  return (
    <div className="detail-body">
      <div className="detail-visual">
        <img src={item.image} alt={item.imageAlt} />
      </div>
      <div className="detail-copy">
        <div className="detail-title">
          <p>{item.kicker}</p>
          <Title>{item.name}</Title>
        </div>
        <div className="detail-price-row">
          <p>{item.price}</p>
          <p className={`detail-status status--${item.status}`}>
            <i aria-hidden="true" /> {statusLabels[item.status]}
          </p>
        </div>
        <p className="detail-description">{item.description}</p>
        <dl className="spec-list">
          {item.specs.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        {item.additionalImages?.map((image) => (
          <figure className="detail-secondary-visual" key={image.image}>
            <img src={image.image} alt={image.imageAlt} />
            {image.caption && <figcaption>{image.caption}</figcaption>}
          </figure>
        ))}
        <div className="detail-notes">
          <div>
            <h3>Condition</h3>
            <p>{item.condition}</p>
          </div>
          {item.included && (
            <div>
              <h3>Included</h3>
              <p>{item.included.join(' · ')}</p>
            </div>
          )}
          <div>
            <h3>Pickup</h3>
            <p>{pickupCopy(item)}</p>
          </div>
        </div>
        {item.status !== 'sold' && <ContactOptions />}
      </div>
    </div>
  );
}
