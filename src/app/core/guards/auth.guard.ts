import { Injectable, inject } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['auth/login']); // go to login if not authenticated
      return false;
    }
    return true;
  }
}

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(PermissionsService).canActivate(next, state);
};
