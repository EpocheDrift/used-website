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
  description: string;
  condition: string;
  specs: Array<[string, string]>;
  included?: string[];
  additionalImages?: Array<{
    image: string;
    imageAlt: string;
    caption?: string;
  }>;
  pickupNote?: string;
};

export const items: Item[] = [
  {
    id: '01',
    slug: 'martin-d-x2-guitar',
    name: 'Martin D-X2',
    kicker: 'Acoustic guitar · 2021',
    price: '$350',
    status: 'sold',
    image: '/items/martin-guitar.png',
    imageAlt: 'Martin D-X2 acoustic guitar on a stand',
    description:
      'A full-size Martin D-X2 acoustic guitar from 2021 with a warm sunburst finish.',
    condition: 'Used and in good working condition.',
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
    status: 'sold',
    image: '/items/dell-monitor.png',
    imageAlt: 'Black Dell monitor on its original stand',
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
    status: 'sold',
    image: '/items/gaming-pc.png',
    imageAlt: 'Black custom gaming PC on a wheeled stand',
    description:
      'A complete gaming and workstation tower with generous memory and mixed solid-state and hard-drive storage.',
    condition: 'Used and functional.',
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
    status: 'sold',
    image: '/items/omen-monitor.png',
    imageAlt: 'Omen gaming monitor attached to a silver monitor arm',
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
    status: 'reserved',
    image: '/items/gaming-chair.png',
    imageAlt: 'Black and magenta gaming chair with cushions',
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
    status: 'sold',
    image: '/items/desk-lamp.png',
    imageAlt: 'Minimal black LED desk lamp',
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
    status: 'sold',
    image: '/items/floor-lamp.png',
    imageAlt: 'Tall black floor reading lamp',
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
  {
    id: '09',
    slug: 'darkglass-microtubes-x7',
    name: 'Darkglass Microtubes X7',
    kicker: 'Bass preamp · distortion · crossover',
    price: '$200',
    status: 'available',
    image: '/items/bass-effects.png',
    imageAlt: 'Darkglass Microtubes X7 bass preamp and distortion pedal',
    description:
      'A flexible bass preamp and distortion pedal that keeps the low end compressed and solid while adding aggressive Microtubes drive to the upper range.',
    condition: 'Used; please inspect and test at pickup.',
    specs: [
      ['Brand', 'Darkglass Electronics'],
      ['Model', 'Microtubes X7'],
      ['Type', 'Bass preamp · distortion'],
      ['Crossover', 'Adjustable low-pass · high-pass'],
    ],
  },
  {
    id: '10',
    slug: 'soprano-saxophone',
    name: 'Soprano Saxophone',
    kicker: 'Case · two mouthpieces',
    price: '$250',
    status: 'available',
    image: '/items/soprano-saxophone.png',
    imageAlt: 'Soprano saxophone in an open padded gig bag',
    description:
      'A soprano saxophone set with its fitted carrying case and two mouthpieces.',
    condition: 'Used; please inspect and play-test at pickup.',
    specs: [
      ['Type', 'Soprano saxophone'],
      ['Finish', 'Gold-tone'],
      ['Mouthpieces', '2 included'],
    ],
    included: [
      'Padded carrying case',
      'Two mouthpieces',
      'Moriyasu handmade gold-tone metal mouthpiece',
    ],
    additionalImages: [
      {
        image: '/items/gold-saxophone-mouthpiece.png',
        imageAlt:
          'Moriyasu handmade gold-tone metal soprano saxophone mouthpiece and ligature',
        caption: 'Moriyasu handmade metal mouthpiece · included',
      },
    ],
  },
  {
    id: '11',
    slug: 'strandberg-grey-gig-bag',
    name: 'Strandberg Gig Bag',
    kicker: 'Grey · 90 cm',
    price: '$30',
    status: 'available',
    image: '/items/strandberg-gig-bag.png',
    imageAlt: 'Grey Strandberg electric guitar gig bag',
    description:
      'A grey Strandberg gig bag for an electric guitar, with a structured profile, front accessory pocket, and carry straps.',
    condition: 'Used; please inspect at pickup.',
    specs: [
      ['Brand', 'Strandberg'],
      ['Height', '90 cm'],
      ['Color', 'Grey'],
      ['Type', 'Electric guitar gig bag'],
    ],
    pickupNote:
      'Please confirm the 90 cm height works for your instrument before pickup.',
  },
  {
    id: '12',
    slug: 'uniden-r7-radar-detector',
    name: 'Uniden R7 Radar Detector',
    kicker: 'Dual antenna · directional arrows',
    price: '$250',
    status: 'available',
    image: '/items/uniden-r7-radar-detector.png',
    imageAlt:
      'Black Uniden R7 radar detector with suction mount and coiled power cable',
    description:
      'A Uniden R7 radar detector with front and rear antennas, directional alerts, and Ka/K/X band detection.',
    condition: 'Used; please inspect and test at pickup.',
    specs: [
      ['Brand', 'Uniden'],
      ['Model', 'R7'],
      ['Antennas', 'Front + rear'],
      ['Bands', 'Ka/K/X'],
      ['Alerts', 'Directional arrows'],
    ],
    included: [
      'Suction-cup windshield mount',
      'Coiled vehicle power cable',
    ],
  },
];

export const statusLabels: Record<ItemStatus, string> = {
  available: 'Available',
  reserved: 'Reserved',
  sold: 'Sold',
};
