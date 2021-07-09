import { Branch } from './branches,interfaces';
export interface FloorsResponse {
    data:    Floor[];
    success?: boolean;
    message?: string;
    status?:  string;
}
export interface FloorResponse {
    data:    Floor;
    success?: boolean;
    message?: string;
    status?:  string;
}

export interface Floor {
    idPiso:      number;
    aforoMaximo: number;
    idSucursal:  number;
    nombre:      string;
    numeroPiso:  number;
    sucursalEntity?:Branch; 
    nombreSucursal?: string;
   
}
  export class FloorClass {
    idPiso!:      number;
    aforoMaximo!: number;
    idSucursal!:  number;
    nombre!:      string;
    numeroPiso!:  number;
    nombreSucursal!: string;
    

    constructor(){}
  }