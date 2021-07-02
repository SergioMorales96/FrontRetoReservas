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
