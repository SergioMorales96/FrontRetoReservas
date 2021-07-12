export interface AdminsResponse {
    data:    Administrador[];    
    success?: boolean;
    message?: string;
    status?:  string;
}

export interface AdminResponse {
    data:    Administrador;    
    success?: boolean;
    message?: string;
    status?:  string;
}
export interface Administrador {
    idAdministrador?: number;
    email:           string;
    idSucursal:      number;
    nombreSucursal?: string;
}
export class AdminClass {
    idAdministrador!: number;
    email!:           string;
    idSucursal!:      number;
    nombreSucursal!: string;

    constructor(){}
}