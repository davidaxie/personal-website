export interface MemoryPhoto {
  src: string;
  alt: string;
  caption?: string;
  city: string;
}

export const memories: MemoryPhoto[] = [
  // San Francisco
  {
    src: '/memories/san-francisco/golden-gate.jpg',
    alt: 'Golden Gate Bridge',
    caption: 'Golden Gate Bridge',
    city: 'san-francisco',
  },
  {
    src: '/memories/san-francisco/fishermans-wharf.jpg',
    alt: "Fisherman's Wharf at Night",
    caption: "Fisherman's Wharf",
    city: 'san-francisco',
  },
  {
    src: '/memories/san-francisco/calhacks-team.jpg',
    alt: 'CalHacks Team',
    caption: 'CalHacks Hackathon',
    city: 'san-francisco',
  },
  {
    src: '/memories/san-francisco/berkeley-campanile.jpg',
    alt: 'UC Berkeley Campanile',
    caption: 'Sather Tower at Night',
    city: 'san-francisco',
  },
  {
    src: '/memories/san-francisco/hilltop-night.jpg',
    alt: 'Bay Area City Lights',
    caption: 'Hilltop Overlook',
    city: 'san-francisco',
  },
  {
    src: '/memories/san-francisco/hilltop-coding.jpg',
    alt: 'Coding Over City Lights',
    caption: 'Late Night Coding Session',
    city: 'san-francisco',
  },
  {
    src: '/memories/san-francisco/coding-city-lights.jpg',
    alt: 'Laptop Over the Bay',
    caption: 'Code & City Lights',
    city: 'san-francisco',
  },
  {
    src: '/memories/san-francisco/coding-on-the-go.jpg',
    alt: 'Coding on the Go',
    caption: 'Coding on the Go',
    city: 'san-francisco',
  },

  // Washington DC
  {
    src: '/memories/dc/capitol.jpg',
    alt: 'At the Capitol',
    caption: 'US Capitol',
    city: 'dc',
  },
  {
    src: '/memories/dc/capitol-avenue.jpg',
    alt: 'Pennsylvania Avenue',
    caption: 'Pennsylvania Avenue',
    city: 'dc',
  },
  {
    src: '/memories/dc/washington-monument.jpg',
    alt: 'Washington Monument',
    caption: 'Washington Monument in Snow',
    city: 'dc',
  },
  {
    src: '/memories/dc/georgetown-healy.jpg',
    alt: 'Georgetown University',
    caption: 'Healy Hall',
    city: 'dc',
  },
  {
    src: '/memories/dc/healy-hall-bw.jpg',
    alt: 'Healy Hall',
    caption: 'Georgetown University',
    city: 'dc',
  },
  {
    src: '/memories/dc/georgetown-sign.jpg',
    alt: 'Georgetown',
    caption: 'Georgetown',
    city: 'dc',
  },
  {
    src: '/memories/dc/georgetown-bakery.jpg',
    alt: 'Georgetown Bakery',
    caption: 'French Pastries',
    city: 'dc',
  },
  {
    src: '/memories/dc/georgetown-selfie.jpg',
    alt: 'Georgetown Summer',
    caption: 'Summer in Georgetown',
    city: 'dc',
  },
  {
    src: '/memories/dc/group-retreat.jpg',
    alt: 'Group Retreat',
    caption: 'Georgetown Retreat',
    city: 'dc',
  },
  {
    src: '/memories/dc/hoyahacks-coding.jpg',
    alt: 'HoyaHacks',
    caption: 'HoyaHacks Hackathon',
    city: 'dc',
  },
  {
    src: '/memories/dc/hoyahacks-team.jpg',
    alt: 'HoyaHacks Team',
    caption: 'HoyaHacks Team',
    city: 'dc',
  },
  {
    src: '/memories/dc/winter-campus.jpg',
    alt: 'Winter Campus',
    caption: 'Georgetown in Winter',
    city: 'dc',
  },
  {
    src: '/memories/dc/winter-campus-group.jpg',
    alt: 'Campus Group Photo',
    caption: 'Summer Group Photo',
    city: 'dc',
  },
  {
    src: '/memories/dc/dca-takeoff.jpg',
    alt: 'Takeoff at Sunset',
    caption: 'DCA at Sunset',
    city: 'dc',
  },
  {
    src: '/memories/dc/dca-takeoff-sunset.jpg',
    alt: 'Plane Taking Off',
    caption: 'DCA Runway Sunset',
    city: 'dc',
  },
  {
    src: '/memories/dc/airplane-window.jpg',
    alt: 'Above the Clouds',
    caption: 'Above the Clouds',
    city: 'dc',
  },

  // Shanghai
  {
    src: '/memories/shanghai/bund-skyline.jpg',
    alt: 'The Bund Skyline',
    caption: 'Pudong Skyline at Night',
    city: 'shanghai',
  },
  {
    src: '/memories/shanghai/bund-jumping.jpg',
    alt: 'Jumping at the Bund',
    caption: 'The Bund at Night',
    city: 'shanghai',
  },
  {
    src: '/memories/shanghai/lujiazui-towers.jpg',
    alt: 'Lujiazui Skyscrapers',
    caption: 'Shanghai Towers',
    city: 'shanghai',
  },
  {
    src: '/memories/shanghai/nanjing-road.jpg',
    alt: 'Nanjing Road',
    caption: 'Nanjing Road',
    city: 'shanghai',
  },
  {
    src: '/memories/shanghai/car-museum.jpg',
    alt: 'Car Museum',
    caption: 'Shanghai Auto Museum',
    city: 'shanghai',
  },
  {
    src: '/memories/shanghai/porsche-exhibit.jpg',
    alt: 'Porsche 911 RSR',
    caption: 'Porsche Exhibition',
    city: 'shanghai',
  },
  {
    src: '/memories/shanghai/porsche-exhibit-wall.jpg',
    alt: 'Porsche History Wall',
    caption: 'Porsche Museum Wall',
    city: 'shanghai',
  },
  {
    src: '/memories/shanghai/dinner.jpg',
    alt: 'Japanese Dinner',
    caption: 'Dinner in Shanghai',
    city: 'shanghai',
  },
  {
    src: '/memories/shanghai/selfie.jpg',
    alt: 'Shanghai Selfie',
    caption: 'Shanghai Adventures',
    city: 'shanghai',
  },
  {
    src: '/memories/shanghai/brother-selfie.jpg',
    alt: 'Brothers in Shanghai',
    caption: 'Family in Shanghai',
    city: 'shanghai',
  },

  // New York
  {
    src: '/memories/new-york/empire-state.jpg',
    alt: 'Empire State Building',
    caption: 'Empire State Building',
    city: 'new-york',
  },
  {
    src: '/memories/new-york/empire-state-bw.jpg',
    alt: 'Empire State in Black & White',
    caption: 'Midtown Manhattan',
    city: 'new-york',
  },
  {
    src: '/memories/new-york/soho.jpg',
    alt: 'SoHo Street',
    caption: 'SoHo, NYC',
    city: 'new-york',
  },
  {
    src: '/memories/new-york/soho-snow.jpg',
    alt: 'SoHo in the Snow',
    caption: 'Snowy SoHo',
    city: 'new-york',
  },
  {
    src: '/memories/new-york/one-wtc.jpg',
    alt: 'One World Trade Center',
    caption: 'One World Trade Center',
    city: 'new-york',
  },
  {
    src: '/memories/new-york/coworking.jpg',
    alt: 'Coworking Space',
    caption: 'NYC Coworking',
    city: 'new-york',
  },
  {
    src: '/memories/new-york/east-village.jpg',
    alt: 'East Village',
    caption: 'East Village',
    city: 'new-york',
  },
  {
    src: '/memories/new-york/east-village-street.jpg',
    alt: 'East Village Brownstones',
    caption: 'East Village Walk',
    city: 'new-york',
  },
  {
    src: '/memories/new-york/edge-observation.jpg',
    alt: 'Edge Observation Deck',
    caption: 'Above Manhattan',
    city: 'new-york',
  },
  {
    src: '/memories/new-york/grand-central.jpg',
    alt: 'Grand Central Terminal',
    caption: 'Grand Central',
    city: 'new-york',
  },
  {
    src: '/memories/new-york/restaurant.jpg',
    alt: 'NYC Restaurant',
    caption: 'Dinner in NYC',
    city: 'new-york',
  },

  // Boston
  {
    src: '/memories/boston/hangout.jpg',
    alt: 'Friends Hangout',
    caption: 'Weekend Hangout',
    city: 'boston',
  },
  {
    src: '/memories/boston/squash-match.jpg',
    alt: 'Squash Match',
    caption: 'Squash Match',
    city: 'boston',
  },
  {
    src: '/memories/boston/squash-trophy.jpg',
    alt: 'Championship Trophy',
    caption: 'NEPSAC Champions',
    city: 'boston',
  },
  {
    src: '/memories/boston/squash-team-champions.jpg',
    alt: 'Championship Team',
    caption: 'Squash Team Champions',
    city: 'boston',
  },
  {
    src: '/memories/boston/friends-hangout.jpg',
    alt: 'Friends Get-Together',
    caption: 'Friends Night',
    city: 'boston',
  },

  // Chicago
  {
    src: '/memories/chicago/millennium-park.jpg',
    alt: 'Millennium Park',
    caption: 'Chicago in Autumn',
    city: 'chicago',
  },

  // Havana
  {
    src: '/memories/havana/classic-car.jpg',
    alt: 'Classic Car on the Malecon',
    caption: 'Havana Classic Car',
    city: 'havana',
  },
  {
    src: '/memories/havana/revolution-square.jpg',
    alt: 'Revolution Square',
    caption: 'Plaza de la Revolucion',
    city: 'havana',
  },
];
