export interface Planet {
  id: number;
  name: string;
  rotation_period: number;
  orbital_period: number;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: number;
  population: any; // String when converted with commas
  films: Array<string>;
  residents: Array<string>;
  created: string;
  edited: string;
  url: string;
}
