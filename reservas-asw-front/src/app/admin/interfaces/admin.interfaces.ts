export interface RoomsResponse {
    data:    Room[];
    success: boolean;
    message: string;
    status:  string;
}

export interface Room {
    idSala:        number;
    aforoMax:      number;
    dominioEstado: DominioEstado;
    idPiso:        number;
    nombre:        string;
}

export enum DominioEstado {
    A = "A",
}
// Generated by https://quicktype.io

export interface AdminsResponse {
    data:    Administrador[];    
    success?: boolean;
    message?: string;
    status?:  string;
}

export interface AdminResponse {
    data:    Administrador;    
    success?: boolean;
    message?: string;
    status?:  string;
}

export interface FloorResponse {
    data:    Floor[];
    success: boolean;
    message: string;
    status:  string;
}

export interface Administrador {
    idAdministrador?: number;
    email:           string;
    idSucursal:      number;
    nombreSucursal?: string;
}
export class AdminClass{
    idAdministrador!: number;
    email!:           string;
    idSucursal!:      number;
    nombreSucursal!: string;

    constructor(){}
}
export interface Floor {
    idPiso:      number;
    aforoMaximo: number;
    idSucursal:  number;
    nombre:      string;
    numeroPiso:  number;
}

export interface Branch {
    idSucursal:  number;
    nombre:      string;
    direccion:   string;
    nit:         string;
    aforoMaximo: number;
}
