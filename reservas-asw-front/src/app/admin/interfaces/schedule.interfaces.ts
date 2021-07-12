export interface SchedulesResponse {
    data:    Schedule[];
    success?: boolean;
    message?: string;
    status?:  string;
}

export interface ScheduleResponse {
    data:    Schedule;
    success?: boolean;
    message?: string;
    status?:  string;
}

export interface Schedule {
    idHorario?:      number;
    idSucursal?:     number;
    numeroHoras:    number;
    nombre:         string;
    horaFin:        string;
    horaInicio:     string;
    nombreSucursal?: NombreSucursal;
}

export class ScheduleClass {
    idHorario!:      number;
    idSucursal!:     number;
    numeroHoras!:    number;
    nombre!:         string;
    horaFin!:        string;
    horaInicio!:     string;
    nombreSucursal!: NombreSucursal;
    constructor(){}
}

export enum NombreSucursal {
    TorreSigma = "TORRE SIGMA",
}