export interface DataResponse {
    data: number | any[];
    success?: boolean;
    message?: string;
    status?: string;
}

export interface ReservationsResponse {
    data:    Reservation[];
    success?: boolean;
    message?: string;
    status?:  string;
}

export interface ReservationResponse {
    data:    Reservation;
    success?: boolean;
    message?: string;
    status?:  string;
}
export interface AforoResponse {

    data:    number;
    success?: boolean;
    message?: string;
    status?:  string;

}

export interface Reservation {
    id?: number;
    dia: string;
    dominioEstado?: string;
    dominioTipoVehiculo: string;
    emailUsuario: string;
    horaFin : string;
    horaInicio: string;
    idSala?: number;
    parqueadero?: string;
    placa: string;
    proyecto: string;
    totalHoras: number;
    idRelacion: number;
    tipoReserva: string
    emailsAsistentes?: string;
}

export class ReservationClass {
    id!: number;
    dia!: number;
    dominioEstado!: string;
    dominioTipoVehiculo!: string;
    emailUsuario!: string;
    horaFin !: string;
    horaInicio!: string;
    idSala!: number;
    parqueadero!: string;
    placa!: string;
    proyecto!: string;
    totalHoras!: number;
    constructor(){}
}
