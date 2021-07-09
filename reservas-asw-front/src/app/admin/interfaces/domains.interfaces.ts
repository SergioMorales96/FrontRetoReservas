///DOMINIO
export interface DomainsResponse {
    data:    Domain[];
    success?: boolean;
    message?: string;
    status?:  string;
}

export interface DomainResponse {
    data:    Domain;
    success?: boolean;
    message?: string;
    status?:  string;
}

export interface Domain {
    codigoDominio: string;
    valorDominio:  string;
    descripcion:   string;
}

export class DomainClass{
    codigoDominio!: string;
    valorDominio!:  string;
    descripcion!:   string;

    constructor(){ }
}
