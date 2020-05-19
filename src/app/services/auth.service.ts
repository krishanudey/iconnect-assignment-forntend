import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import decode from "jwt-decode";
import { Token } from "../models/token.model";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentTokenSubject: BehaviorSubject<Token> = new BehaviorSubject(
    JSON.parse(localStorage.getItem("token"))
  );
  public currentToken: Observable<
    Token
  > = this.currentTokenSubject.asObservable();
  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  public currentUser: Observable<User> = this.currentUserSubject.asObservable();

  constructor() {}

  public isAuthenticated(): boolean {
    try {
      const tokenPayload = decode(this.currentTokenSubject.value.accessToken);
      return new Date(tokenPayload.exp * 1000) > new Date();
    } catch (err) {
      return false;
    }
  }
  public updateToken(token: Token) {
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
      this.currentTokenSubject.next(token);
    } else {
      localStorage.removeItem("token");
      this.currentTokenSubject.next(null);
    }
  }
  public updateUser(user: User) {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      this.currentUserSubject.next(user);
    } else {
      localStorage.removeItem("currentUser");
      this.currentUserSubject.next(null);
    }
  }
}
