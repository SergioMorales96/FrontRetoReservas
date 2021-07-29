import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';

@Injectable()
export class CLoadService implements CanLoad {
  constructor(private router: Router) {
  }
 
 
  canLoad(route: Route): boolean {
    let url = route.path;
    console.log('Url:'+ url);
    if (url=='admins') {
      alert('You are not authorised to visit this page');
      return false;
    }
 
    //det
    
    return true; 
  }
  
}
