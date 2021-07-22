export interface EnterprisesResponse {
    data:    Enterprise[];
    success?: boolean;
    message?: string;
    status?:  string;
}

export interface Enterprise {
    nit:                string;
    alias:              string;
    codigoVerificacion: string;
    nombre:             string;
}