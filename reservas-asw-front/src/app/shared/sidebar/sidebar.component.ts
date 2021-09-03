import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { MenuItem } from 'primeng/api';
import { RouteFloor, RouteName } from '../../../utils/enums';
import { setSidebarActive, setIsEditingReservation } from '../../reservations/reservation.actions';
import { setSteps } from '../../reservations/reservation.actions';
import { setIsEdit } from '../../reservations/editReservation.actions';
import { AdminsService } from '../../admin/services/admins.service';
import { Administrador, AdminsResponse } from '../../admin/interfaces/admins.interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  admins: Administrador[] = [];

  isEditingReservation!: boolean;
  isBlockedReservation!: boolean;
  items: MenuItem[];
  routeName = RouteName;
  routeNameFloors = RouteFloor;
  adminMenuActive: boolean = false;

  get generateReservationIcon(): string {
    return `assets/images/icons/${this.isBlockedReservation ? 'minus-gray' : this.isEditingReservation ? 'close-red' : 'plus-blue'}.svg`;
  }

  get myReservationIconCalendar(): string {
    return `assets/images/icons/${this.isEditingReservation ? 'calendar-white' : 'calendar-blue'}.svg`;
  }

  get myReservationIconArrow(): string {
    return `assets/images/icons/${this.isEditingReservation ? 'arrow-right-white' : 'arrow-right-blue'}.svg`;
  }

  get myAdminIcon(): string {
    return `assets/images/icons/${this.adminMenuActive ? 'grid-blue' : 'grid-white'}.svg`;
  }
  
  get myAdminArrowIcon(): string {
    return `assets/images/icons/${this.adminMenuActive ? 'arrow-right-blue' : 'arrow-right-white'}.svg`;
  }

  constructor(
    private adminsService: AdminsService,
    private store: Store<AppState>
  ) {
    this.items = [
      {
       label: "Administración",
       items:[
        {
          label: 'Lista de administración',
          routerLink: 'admin/admins/list',
          command: () => this.store.dispatch(setSidebarActive({ sidebarActive : false })),
        },
        {
          label: 'Lista de pisos',
          routerLink: 'admin/floors/list',
          command: () => this.store.dispatch(setSidebarActive({ sidebarActive : false })),
        },
        {
          label: 'Lista de salas',
          routerLink: 'admin/rooms/list',
          command: () => this.store.dispatch(setSidebarActive({ sidebarActive : false })),
        },
        {
          label: 'Lista de sucursales',
          routerLink: 'admin/branches/list',
          command: () => this.store.dispatch(setSidebarActive({ sidebarActive : false })),
        },
        {
          label: 'Lista de puestos de trabajo',
          routerLink: '/admin/workstations/list',
          command: () => this.store.dispatch(setSidebarActive({ sidebarActive : false })),
        },
        {
          label: 'Lista de horarios',
          routerLink: 'admin/schedules/list',
          command: () => this.store.dispatch(setSidebarActive({ sidebarActive : false })),
        },
       ]
            
        
      }
      
    ];
  }

  ngOnInit(): void {
    this.getAdmins();
    this.store.select('reservation').subscribe(
      (reservation) => {
        
        this.isEditingReservation = reservation.sidebar.isEditingReservation;
        this.isBlockedReservation = reservation.sidebar.isBlockedReservation;
        const line = document.getElementById('line_shade');
        if(line){
          if(this.isEditingReservation){
            line.style.display = "flex";
          }else{
            line.style.display = "none";
          }
        }
      }
    );
  }

  getAdmins() {
    this.adminsService.getAdmins()
      .subscribe(
        (adminsResponse: AdminsResponse) => {
          this.admins = adminsResponse.data;
        }
      );
  }

  validateAdmins (email: string): boolean {
    const admin = this.admins.find(x => x.email == email)
    let isAdmin = false;
    admin != null ? isAdmin=true : isAdmin=false;
    return isAdmin;
  }

  changeEditReservation(isEditingReservation: boolean): void {
    this.isEditingReservation = isEditingReservation;
    this.store.dispatch(setSidebarActive({ sidebarActive : false }));
    this.store.dispatch(setIsEditingReservation({ isEditingReservation : isEditingReservation}));
    if(isEditingReservation){
      this.store.dispatch(setSteps({ step : 1 }));
      this.store.dispatch(setIsEdit({ isEdit : false }));
    }
  }

  log(adminMenuActive : boolean):void{
    
    this.adminMenuActive = adminMenuActive ? true : false ;
    
  }

}
