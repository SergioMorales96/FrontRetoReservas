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