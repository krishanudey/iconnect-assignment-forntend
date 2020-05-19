import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl: string;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.apiUrl = `http://${environment.apiUrl}/v1`;
    console.log("ApiService -> constructor -> this.apiUrl", this.apiUrl);
  }

  public login(email: string, password: string) {
    return this.http
      .post<any>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        map((user) => {
          this.authService.updateToken(user.token);
          this.authService.updateUser(user.user);
          return user;
        })
      );
  }

  public register(name: string, email: string, password: string) {
    return this.http
      .post<any>(`${this.apiUrl}/auth/register`, { name, email, password })
      .pipe(
        map((user) => {
          this.authService.updateToken(user.token);
          this.authService.updateUser(user.user);
          return user;
        })
      );
  }

  public logout() {
    this.authService.updateToken(null);
    this.authService.updateUser(null);
  }
}
