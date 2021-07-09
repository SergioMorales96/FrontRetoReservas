export interface BranchesResponse {
    data: Branch[];
    success?: boolean;
    message?: string;
    status?: string;
}

export interface BranchResponse {
    data: Branch;
    success?: boolean;
    message?: string;
    status?: string;
}


export interface Branch {
    idSucursal?: number;
    aforoMaximo: number;
    direccion: string;
    nit: string;
    nombre: string;
    nombreEmpresa?: string;
}

export class BranchClass {
    idSucursal!: number;
    aforoMaximo!: number;
    direccion!: string;
    nit!: string;
    nombre!: string;
    nombreEmpresa!: string;

    constructor() { }
}