
export interface ReservationsResponse {
    data:    Reservation[];
    success?: boolean;
    message?: string;
    status?:  string;
}

export interface Reservation {
    numeroReserva: number;
    dia:           string;
    horaInicio:    string;
    horaFin:       string;
}
