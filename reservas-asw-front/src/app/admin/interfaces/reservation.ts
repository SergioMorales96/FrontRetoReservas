export interface ReservationResponse {
    data:    DatesReservation[];
    success?: boolean;
    message?: string;
    status?:  string;
}

export interface DatesReservation {
    numeroReserva:       number;
    dia:                 string;
    horaInicio:          string;
    horaFin:             string;
    dominioEstado:       string;
    dominioTipoVehiculo: string;
    placa:               string;
    nombreSala:          string;
    nombrePuesTrabajo:   string;
    numeroAsistentes:    number;
    idPiso:              number;
    idSala:              number;   
    idPuestoTrabajo:     number;   
}
