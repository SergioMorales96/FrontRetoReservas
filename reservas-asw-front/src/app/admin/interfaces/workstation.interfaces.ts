
export interface WorkstationsResponse {
    data:    Workstation[];
    success?: boolean;
    message?: string;
    status?:  string;
}
export interface WorkstationResponse {
    data:    Workstation;
    success?: boolean;
    message?: string;
    status?:  string;
}

export interface Workstation {
    idPuestoTrabajo?: number;
    dominioEstado:   DominioEstado;
    dominioTipo:     DominioTipo;
    idPiso:          number;
    nombre:          string;
    nombrePiso?:      NombrePiso;
}


export enum DominioTipo {
    A = "A",
    G = "G",
    Pt = "PT",
}

export enum NombrePiso {
    Piso18 = "Piso 18",
    Piso19 = "Piso 19",
    Piso20 = "Piso 20",
}

export class WorkstationClass {

    idPuestoTrabajo!: number;
    dominioEstado!:   DominioEstado;
    dominioTipo!:     DominioTipo;
    idPiso!:          number;
    nombre!:          string;
    nombrePiso!:      NombrePiso;

    constructor() {}
}
export enum DominioEstado {
    A = "A",
    QqA = "qqA"
}
