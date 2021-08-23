import { Injectable} from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RouteName } from 'src/utils/enums';
import { Administrador, AdminsResponse } from '../admin/interfaces/admins.interfaces';
import { AdminsService } from '../admin/services/admins.service';

@Injectable({
  providedIn: 'root'
})
export class CActiveGuard implements CanActivate {

  routeName = RouteName;
  admins!: Administrador[] ;
  
  constructor(
    private adminsService: AdminsService,
    private router:Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
     
    this.adminsService.getAdmins()
    .subscribe(
      (adminsResponse: AdminsResponse) => {
        this.admins = adminsResponse.data;
        console.log(this.admins[0].email);
      }
    );
    
    const hora = new Date().getHours();
    
    // Comparamos la hora con el maximo permitido
    // Esto sería en caso de que no queremos que 
    // pueda entrar a la página después de las 10:00 pm  
    console.log(hora);
    
    if (hora >= 18) {
      console.log("FUNCIONO!");
      
      // Si la hora es mayor o igual redireccionamos al homeComponent
      this.router.navigate(['']);
      // Si devolvemos FALSE no de permitirá el acceso
      return false;
    }

    return true;
  }
  
}
