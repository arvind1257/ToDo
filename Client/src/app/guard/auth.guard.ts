import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authData = sessionStorage.getItem("token");
  if(authData!=null){
    return true;
  }
  else{
    alert("Kindly Login to Access the Application.")
    router.navigateByUrl("/login")
    return false;
  }
};
