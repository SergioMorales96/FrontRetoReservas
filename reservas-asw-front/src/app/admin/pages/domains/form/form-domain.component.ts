import { Component } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Domain } from '../../../interfaces/admin.interfaces';

@Component({
  selector: 'app-form-domain',
  templateUrl: './form-domain.component.html',
  styles: [
  ]
})
export class FormDomainComponent  {
  domainForm = this.fb.group({
    codigoDominio: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    valorDominio: ['',[Validators.required]],
    descripcion: ['',[Validators.required]]

  });
  domains: Domain[]=[
    {
        "codigoDominio": "ESTADO_RESERVA",
        "valorDominio": "R",
        "descripcion": "RESERVADO"
    },
    {
        "codigoDominio": "ESTADO_RESERVA",
        "valorDominio": "U",
        "descripcion": "UTILIZADO"
    },
    {
        "codigoDominio": "ESTADO_RESERVA",
        "valorDominio": "NU",
        "descripcion": "NO UTILIZADO"
    },
    {
        "codigoDominio": "TIPO_VEHICULO",
        "valorDominio": "M",
        "descripcion": "MOTO"
    },
    {
        "codigoDominio": "TIPO_VEHICULO",
        "valorDominio": "C",
        "descripcion": "CARRO"
    },
    {
        "codigoDominio": "TIPO_VEHICULO",
        "valorDominio": "B",
        "descripcion": "BICICLETA"
    },
    {
        "codigoDominio": "TIPO_VEHICULO",
        "valorDominio": "NA",
        "descripcion": "N/A"
    },
    {
        "codigoDominio": "TIEMPO_ESPERA_SALA",
        "valorDominio": "30",
        "descripcion": "30 MIN"
    },
    {
        "codigoDominio": "MAXIMO_HORAS_RESERVA",
        "valorDominio": "8",
        "descripcion": "8 HORAS"
    },
    {
        "codigoDominio": "MAXIMO_HORAS_SALAS",
        "valorDominio": "2",
        "descripcion": "2 HORAS"
    },
    {
        "codigoDominio": "NUMERO_PARQUEADEROS_CARRO",
        "valorDominio": "20",
        "descripcion": "20 Parqueaderos"
    },
    {
        "codigoDominio": "NUMERO_PARQUEADEROS_MOTO",
        "valorDominio": "20",
        "descripcion": "20 Parqueaderos"
    },
    {
        "codigoDominio": "NUMERO_PARQUEADEROS_BICICLETA",
        "valorDominio": "50",
        "descripcion": "50 Parqueaderos"
    },
    {
        "codigoDominio": "ESTADO_PUESTO_TRABAJO",
        "valorDominio": "I",
        "descripcion": "INACTIVO"
    },
    {
        "codigoDominio": "ESTADO_PUESTO_TRABAJO",
        "valorDominio": "A",
        "descripcion": "ACTIVO"
    },
    {
        "codigoDominio": "ESTADO_SALA",
        "valorDominio": "I",
        "descripcion": "INACTIVO"
    },
    {
        "codigoDominio": "ESTADO_SALA",
        "valorDominio": "A",
        "descripcion": "ACTIVO"
    },
    {
        "codigoDominio": "TIPO_PUESTO_TRABAJO",
        "valorDominio": "G",
        "descripcion": "GERENTE"
    },
    {
        "codigoDominio": "TIPO_PUESTO_TRABAJO",
        "valorDominio": "PT",
        "descripcion": "PUESTO TRABAJO"
    }
  ];
  isEditing: boolean = false;
  domain!: Domain;

  get formTitle(): string {
    return this.isEditing ? ( this.domain.codigoDominio ?? 'Editar dominio' ) : 'Crear dominio';
  }

  get buttonLabel(): string {
    return this.isEditing ? 'Actualizar' : 'Crear';
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  saveDomain(): void {
    console.log('save domain', this.domainForm.value);
  }
}
