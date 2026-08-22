import type { Item } from './items';
import { statusLabels } from './items';
import { ContactOptions } from './contact-options';

export function ItemDetailBody({ item }: { item: Item }) {
  return (
    <div className="detail-body">
      <div className="detail-visual">
        <img src={item.image} alt={item.imageAlt} />
      </div>
      <div className="detail-copy">
        <div className="detail-title">
          <p>{item.kicker}</p>
          <h2>{item.name}</h2>
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
            <p>
              {item.pickupNote ? `${item.pickupNote} ` : ''}
              Bellevue Downtown, by arrangement. Available through August 31,
              2026.
            </p>
          </div>
        </div>
        <ContactOptions />
      </div>
    </div>
  );
}

