import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthApiService } from '../service/auth-api.service';


export const AuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthApiService);
  const router = inject(Router);

  if(authService.isAuthenticated()) {
    return router.navigate(['/home']);
  }else{
    return true;
  }
};
