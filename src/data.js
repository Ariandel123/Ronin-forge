// Catalog. `img` points to optimized WebP photos in /public.
export const katanas = [
  {
    id: 'ryu',
    name: 'RYŪ',
    kanji: '龍',
    subtitle: 'Dragon',
    steel: 'Tamahagane',
    hrc: '60 HRC',
    length: '104 CM',
    hamon: 'Notare',
    price: '$2,480',
    accent: '#c0392b',
    img: '/ryu.webp',
  },
  {
    id: 'yuki',
    name: 'YUKI',
    kanji: '雪',
    subtitle: 'Snow',
    steel: 'T10 Tool Steel',
    hrc: '58 HRC',
    length: '101 CM',
    hamon: 'Gunome',
    price: '$1,960',
    accent: '#5b6f8c',
    img: '/yuki.webp',
  },
  {
    id: 'kaen',
    name: 'KAEN',
    kanji: '火炎',
    subtitle: 'Flame',
    steel: 'Folded 1095',
    hrc: '61 HRC',
    length: '106 CM',
    hamon: 'Choji',
    price: '$3,120',
    accent: '#d97b29',
    img: '/kaen.webp',
  },
  {
    id: 'kage',
    name: 'KAGE',
    kanji: '影',
    subtitle: 'Shadow',
    steel: 'Kurouchi Damascus',
    hrc: '59 HRC',
    length: '103 CM',
    hamon: 'Suguha',
    price: '$2,740',
    accent: '#3a3f4b',
    img: '/kage.webp',
  },
]

export const steps = [
  {
    n: '01',
    title: 'CHOOSE THE BLADE',
    body: 'Browse the forged collection. Each katana lists its steel, hardness, and hamon — pick the one whose spirit matches yours.',
  },
  {
    n: '02',
    title: 'FORGE TO ORDER',
    body: 'A master smith folds, clay-tempers and polishes your blade by hand. Choose the tsuka wrap, saya lacquer and tsuba fittings.',
  },
  {
    n: '03',
    title: 'DELIVERED WORLDWIDE',
    body: 'Your katana ships insured in a paulownia box with an authenticity certificate. Slow craft, safely to your door.',
  },
]

export const anatomy = [
  { part: 'KISSAKI', jp: '切先', desc: 'the tip — where geometry decides the cut' },
  { part: 'HAMON', jp: '刃文', desc: 'the temper line, drawn in clay and fire' },
  { part: 'SHINOGI', jp: '鎬', desc: 'the ridge that carries the blade’s light' },
  { part: 'TSUBA', jp: '鍔', desc: 'the guard — the smith’s quiet signature' },
  { part: 'TSUKA', jp: '柄', desc: 'the handle, wrapped in silk over rayskin' },
  { part: 'SAYA', jp: '鞘', desc: 'the scabbard, lacquered to hold the calm' },
]
