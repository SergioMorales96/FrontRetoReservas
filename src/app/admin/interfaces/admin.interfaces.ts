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

export interface FloorResponse {
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

export interface BranchesResponse{
    data:    Branch[];
    success: boolean;
    message: string;
    status:  string;
}

export interface Branch{
    idSucursal:     number;
    nombre:         string;
    direccion:      string;
    nit:            number;
    aforoMaximoBranches:    number;
}
