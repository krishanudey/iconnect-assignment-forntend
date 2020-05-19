import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {}
  login() {
    this.apiService.login(this.email, this.password).subscribe(
      (user) => {
        this.router.navigate(["/"]);
      },
      (err) => {
        alert("Failed to perform login");
      }
    );
  }
}
