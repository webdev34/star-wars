export interface Vehicle {
  id:number;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: number;
  length: number;
  max_atmosphering_speed: number;
  crew: number;
  passengers: number;
  consumables: string;
  vehicle_class: number;
  films: Array<string>;
  pilots: Array<string>;
  created: string;
  edited: string;
  url: string;
}
