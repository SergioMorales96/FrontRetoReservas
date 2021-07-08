export interface RoomsResponse {
    data:    Room[];
    success?: boolean;
    message?: string;
    status?:  string;
}

export interface RoomResponse {
    data:    Room;
    success?: boolean;
    message?: string;
    status?:  string;
}

export interface Room {
    idSala?:        number;
    aforoMax:      number;
    dominioEstado: DominioEstado;
    idPiso:        number;
    nombre:        string;
}

export enum DominioEstado {
    A = "A",
}

export class RoomClass {
    idSala!:        number;
    aforoMax!:      number;
    dominioEstado!: DominioEstado;
    idPiso!:        number;
    nombre!:        string;

    constructor(){}
}

export interface FloorsResponse {
    data:    Floor[];
    success: boolean;
    message: string;
    status:  string;
}

export interface Floor {
    idPiso:      number;
    aforoMaximo: number;
    idSucursal:  number;
    nombre:      string;
    numeroPiso:  number;
}
