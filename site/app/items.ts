export type ItemStatus = 'available' | 'reserved' | 'sold';

export type Item = {
  id: string;
  slug: string;
  name: string;
  kicker: string;
  price: string;
  status: ItemStatus;
  image: string;
  imageAlt: string;
  layout: string;
  description: string;
  condition: string;
  specs: Array<[string, string]>;
  included?: string[];
  pickupNote?: string;
};

export const items: Item[] = [
  {
    id: '01',
    slug: 'martin-d-x2-guitar',
    name: 'Martin D-X2',
    kicker: 'Acoustic guitar · 2021',
    price: '$350',
    status: 'available',
    image: '/items/martin-guitar.png',
    imageAlt: 'Martin D-X2 acoustic guitar on a stand',
    layout: 'item--hero',
    description:
      'A full-size Martin D-X2 acoustic guitar from 2021 with a warm sunburst finish.',
    condition: 'Used and in good working condition. Please inspect at pickup.',
    specs: [
      ['Brand', 'Martin'],
      ['Model', 'D-X2'],
      ['Year', '2021'],
      ['Finish', 'Sunburst'],
    ],
    included: ['Guitar stand shown in the photo'],
  },
  {
    id: '02',
    slug: 'dell-4k-monitor',
    name: 'Dell 4K Monitor',
    kicker: '4K · 60 Hz',
    price: '$100',
    status: 'available',
    image: '/items/dell-monitor.png',
    imageAlt: 'Black Dell monitor on its original stand',
    layout: 'item--right',
    description:
      'A clean, practical 4K Dell display for a desk, studio, or home-office setup.',
    condition: 'Used and functional. Screen condition can be checked in person.',
    specs: [
      ['Resolution', '4K'],
      ['Refresh rate', '60 Hz'],
      ['USB', '2 × USB-A'],
      ['Video', '1 × HDMI · 1 × DisplayPort'],
    ],
  },
  {
    id: '03',
    slug: 'rtx-3060ti-gaming-pc',
    name: 'Gaming PC',
    kicker: 'RTX 3060 Ti · Intel i7',
    price: '$450',
    status: 'available',
    image: '/items/gaming-pc.png',
    imageAlt: 'Black custom gaming PC on a wheeled stand',
    layout: 'item--small',
    description:
      'A complete gaming and workstation tower with generous memory and mixed solid-state and hard-drive storage.',
    condition: 'Used and functional. Available to inspect and test by arrangement.',
    specs: [
      ['GPU', 'NVIDIA RTX 3060 Ti'],
      ['CPU', '12th-gen Intel Core i7'],
      ['Memory', '32 GB DDR4'],
      ['Storage', '1 TB SSD + 4 TB HDD'],
    ],
    included: [
      'Wheeled PC stand shown in the photo',
      'DisplayPort cable',
      'HDMI cable',
    ],
  },
  {
    id: '04',
    slug: 'omen-2k-monitor',
    name: 'Omen Monitor',
    kicker: '2K · 165 Hz',
    price: '$150',
    status: 'available',
    image: '/items/omen-monitor.png',
    imageAlt: 'Omen gaming monitor attached to a silver monitor arm',
    layout: 'item--wide',
    description:
      'A high-refresh Omen gaming display with a minimal floating desk mount.',
    condition: 'Used and functional. Screen condition can be checked in person.',
    specs: [
      ['Resolution', '2K'],
      ['Refresh rate', '165 Hz'],
      ['Mount', 'Floating monitor arm'],
    ],
    included: ['Monitor arm at no additional cost'],
  },
  {
    id: '05',
    slug: 'gaming-chair',
    name: 'Gaming Chair',
    kicker: 'Black · magenta',
    price: 'Free',
    status: 'available',
    image: '/items/gaming-chair.png',
    imageAlt: 'Black and magenta gaming chair with cushions',
    layout: 'item--mid-left',
    description:
      'A generously padded gaming chair with adjustable arms, back cushion, and headrest.',
    condition: 'Well used with visible wear. Free to a new home.',
    specs: [
      ['Color', 'Black · magenta'],
      ['Base', 'Five-wheel swivel'],
      ['Support', 'Headrest + lumbar cushion'],
    ],
    pickupNote: 'Please make sure it will fit in your vehicle.',
  },
  {
    id: '06',
    slug: 'clothes-basket',
    name: 'Clothes Basket',
    kicker: 'Soft-sided storage',
    price: 'Free',
    status: 'available',
    image: '/items/clothes-basket.png',
    imageAlt: 'Taupe soft-sided clothes basket with a white liner',
    layout: 'item--small-right',
    description:
      'A lightweight, neutral fabric basket for clothes, laundry, or everyday storage.',
    condition: 'Used and ready to take away.',
    specs: [
      ['Material', 'Fabric'],
      ['Color', 'Taupe · white'],
      ['Format', 'Soft-sided'],
    ],
  },
  {
    id: '07',
    slug: 'desk-lamp',
    name: 'Desk Lamp',
    kicker: 'LED task light',
    price: '$5',
    status: 'available',
    image: '/items/desk-lamp.png',
    imageAlt: 'Minimal black LED desk lamp',
    layout: 'item--portrait-left',
    description:
      'A slim black task lamp with a round weighted base and an adjustable light bar.',
    condition: 'Used and functional.',
    specs: [
      ['Type', 'LED desk lamp'],
      ['Color', 'Black'],
      ['Control', 'Base-mounted button'],
    ],
  },
  {
    id: '08',
    slug: 'floor-lamp',
    name: 'Floor Lamp',
    kicker: 'Black reading light',
    price: '$10',
    status: 'available',
    image: '/items/floor-lamp.png',
    imageAlt: 'Tall black floor reading lamp',
    layout: 'item--portrait-right',
    description:
      'A tall, understated floor lamp with a flexible neck and a focused reading light.',
    condition: 'Used and functional.',
    specs: [
      ['Type', 'Floor reading lamp'],
      ['Color', 'Black'],
      ['Head', 'Flexible neck'],
    ],
    pickupNote: 'Tall item; check vehicle clearance before pickup.',
  },
];

export const statusLabels: Record<ItemStatus, string> = {
  available: 'Available',
  reserved: 'Reserved',
  sold: 'Sold',
};
