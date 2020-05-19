import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class IsAnonymousGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/"]);
      return false;
    }
    return true;
  }
}
