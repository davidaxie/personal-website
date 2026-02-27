export interface CityMarker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  country: string;
}

export const cities: CityMarker[] = [
  { id: 'boston', name: 'Boston', lat: 42.3601, lng: -71.0589, country: 'US' },
  { id: 'new-york', name: 'New York', lat: 40.7128, lng: -74.006, country: 'US' },
  { id: 'san-francisco', name: 'San Francisco', lat: 37.7749, lng: -122.4194, country: 'US' },
  { id: 'dc', name: 'Washington DC', lat: 38.9072, lng: -77.0369, country: 'US' },
  { id: 'chicago', name: 'Chicago', lat: 41.8781, lng: -87.6298, country: 'US' },
  { id: 'shanghai', name: 'Shanghai', lat: 31.2304, lng: 121.4737, country: 'CN' },
  { id: 'havana', name: 'Havana', lat: 23.1136, lng: -82.3666, country: 'CU' },
];
