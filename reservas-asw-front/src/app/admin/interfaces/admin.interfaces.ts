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

export interface ScheduleResponse {
    data:    Schedule[];
    success: boolean;
    message: string;
    status:  string;
}

export interface Schedule {
    idHorario:      number;
    idSucursal:     number;
    numeroHoras:    number;
    nombre:         string;
    horaFin:        string;
    horaInicio:     string;
    nombreSucursal: NombreSucursal;
}

export enum NombreSucursal {
    TorreSigma = "TORRE SIGMA",
}

export interface BrancheResponse {
    data:    Branch[];
    success: boolean;
    message: string;
    status:  string;
}

export interface Branch {
    idSucursal:    number;
    aforoMaximo:   number;
    direccion:     string;
    nit:           string;
    nombre:        string;
    nombreEmpresa: string;
}
