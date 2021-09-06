import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain, DomainClass, DomainResponse } from '../../../interfaces/domains.interfaces';
import { RouteName } from '../../../../../utils/enums';
import { DomainsService } from '../../../services/domains.service';
import { ToastsService } from '../../../../services/toasts.service';

@Component({
  selector: 'app-form-domain',
  templateUrl: './form-domain.component.html',
  styleUrls: ['./form-domain.component.scss']
})
export class FormDomainComponent implements OnInit {
  domainForm = this.fb.group({
    codigoDominio: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
    valorDominio: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
    descripcion: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]]

  });

  isEditing: boolean = false;
  domain!: Domain;
  routeName = RouteName;

  get formTitle(): string {
    return this.isEditing ? (this.domain?.codigoDominio ?? 'Editar dominio') : 'Crear dominio';
  }

  get buttonLabel(): string {
    return this.isEditing ? 'Actualizar' : 'Crear';
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private domainsService: DomainsService,
    private router: Router,
    private toastService: ToastsService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ codigoDominio, valorDominio, descripcion }) => {
        if (codigoDominio && valorDominio && descripcion) {
          this.isEditing = true;
          this.getDomain(codigoDominio, valorDominio, descripcion);
        } else {
          this.domain = new DomainClass();
        }
      });
  }

  getDomain(codigoDominio: string, valorDominio: string, descripcion: string): void {
    this.domainsService.getDomain(codigoDominio, valorDominio, descripcion)
      .subscribe(
        (domainResponse: DomainResponse) => {
          this.domain = domainResponse.data;
          this.setDomain(this.domain);
        }
      );
  }

  setDomain(domain: Domain): void {
    this.domainForm.controls['codigoDominio'].setValue(domain.codigoDominio);
    this.domainForm.controls['valorDominio'].setValue(domain.valorDominio);
    this.domainForm.controls['descripcion'].setValue(domain.descripcion);
  }

  getDomainFormValue(): Domain {
    return {
      codigoDominio: this.domainForm.controls['codigoDominio'].value.toUpperCase(),
      valorDominio: this.domainForm.controls['valorDominio'].value.toUpperCase(),
      descripcion: this.domainForm.controls['descripcion'].value.toUpperCase(),
    }
  }

  save(): void {
    if (this.isEditing) {
      this.domainsService.updateDomain({
        ...this.getDomainFormValue(),
        codigoDominio: this.domain.codigoDominio
      })
        .subscribe(
          (domainResponse: DomainResponse) => {
            this.router.navigateByUrl(RouteName.DomainsList);
            this.toastService.showToastSuccess({ summary: 'Dominio actualizado', detail: 'El dominio ha sido actualizado correctamente.' });
          },
          (() => this.domain = new DomainClass())
        );
    } else {
      this.domainsService.createDomain(this.getDomainFormValue())
        .subscribe(
          (domainResponse: DomainResponse) => {
            this.router.navigateByUrl(RouteName.DomainsList);
            this.toastService.showToastSuccess({ summary: 'Dominio creado', detail: 'El dominio ha sido creado correctamente.' });
          },
          (() => this.domain = new DomainClass())
        )

    }
  }
}
