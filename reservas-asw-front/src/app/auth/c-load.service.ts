import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';

@Injectable()
export class CLoadService implements CanLoad {
  constructor(private router: Router) {
  }
 
 
  canLoad(route: Route): boolean {
    const hora = new Date().getHours();
    
    if (hora >= 14) {
      
      alert('You are not authorised to visit this page');

      return false;
    }
    return true;
  }
  
}
