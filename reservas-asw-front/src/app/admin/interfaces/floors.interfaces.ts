
export interface FloorResponse {
    data:    Floor[];
    success: boolean;
    message: string;
    status:  string;
}

export interface Floor{
    idPiso:      number;
    aforoMaximo: number;
    idSucursal:  number;
    nombre:      string;
    numeroPiso:  number;
}

