export interface StarShip {
  map(arg0: (item: any) => void): StarShip;
  id:number;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: any;
  length: any;
  max_atmosphering_speed: number;
  crew: string;
  passengers: any;
  cargo_capacity: number;
  consumables: string;
  hyperdrive_rating: number;
  MGLT: number;
  starship_class: string;
  pilots: Array<string>;
  films: Array<string>;
  created: string;
  edited: string;
  url: string;
}
