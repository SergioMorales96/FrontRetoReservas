import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PruebacAGuard implements CanActivate {

  constructor(private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
    
    const hora = new Date().getHours();
    
    // Comparamos la hora con el maximo permitido
    // Esto sería en caso de que no queremos que 
    // pueda entrar a la página después de las 10:00 pm  
    console.log(hora);
    
    if (hora >= 13) {
      console.log("FUNCIONO!");
      
      // Si la hora es mayor o igual redireccionamos al homeComponent
      this.router.navigate(['']);
      // Si devolvemos FALSE no de permitirá el acceso
      return false;
    }
      return true;
  }
  
}
