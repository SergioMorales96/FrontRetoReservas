export interface ReservationResponse {
    data:    DatesReservation[];
    success?: boolean;
    message?: string;
    status?:  string;
}

export interface DatesReservation {
    dia:                 string;
    horaInicio:          string;
    horaFin:             string;
    dominioTipoVehiculo: string;
    placa:               string;
    nombreSala?:          string;
    nombrePuesTrabajo?:   null;
    numeroAsistentes:    number;
    idPiso :             number;
}
