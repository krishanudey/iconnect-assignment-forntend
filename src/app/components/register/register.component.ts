import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  name: string = "";
  email: string = "";
  password: string = "";
  constructor(private apiService: ApiService, private router: Router) {
    console.log("LoginComponent -> constructor -> apiService", apiService);
  }

  ngOnInit() {}
  register() {
    let errMessages = [];
    this.name = this.name.trim();
    this.email = this.email.trim();
    this.password = this.password.trim();
    if (this.name.length === 0) {
      errMessages.push("- Name cannot be empty");
    } else if (this.name.length > 128) {
      errMessages.push("- Name length must be less than or equal to 128");
    }

    if (this.email.length === 0) {
      errMessages.push("- Email cannot be empty");
    } else if (!/^\S+@\S+\.\S+$/.test(this.email)) {
      errMessages.push("- Email must be in valid format");
    }

    if (this.password.length === 0) {
      errMessages.push("- Password cannot be empty");
    } else if (this.password.length > 32) {
      errMessages.push("- Password length must be less than or equal to 32");
    }

    if (errMessages.length > 0) {
      return alert(errMessages.join("\n"));
    }

    this.apiService.register(this.name, this.email, this.password).subscribe(
      (user) => {
        this.router.navigate(["/"]);
      },
      (err) => {
        console.log("RegisterComponent -> register -> err", err);
        alert("Failed to perform registration");
      }
    );
  }
}
