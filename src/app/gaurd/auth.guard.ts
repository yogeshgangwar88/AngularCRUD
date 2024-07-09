import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginserviceService } from '../services/loginservice.service';

export const authGuard: CanActivateFn = (route, state) => {

  var logser=inject(LoginserviceService)
if (logser.Isloggedin())
  return true;
else
return false;
};
