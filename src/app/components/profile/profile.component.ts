import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { Subscription } from "rxjs";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  subs: Subscription = new Subscription();
  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subs.add(
      this.authService.currentUser.subscribe((user) => {
        this.currentUser = user;
      })
    );
  }
  logout() {
    this.apiService.logout();
    this.router.navigate(["/login"]);
  }
}
