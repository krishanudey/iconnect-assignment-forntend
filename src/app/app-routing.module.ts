import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./components/profile/profile.component";
import { IsLoggedInGuard } from "./guards/is-logged-in.guard";
import { LoginComponent } from "./components/login/login.component";
import { IsAnonymousGuard } from "./guards/is-anonymous.guard";
import { RegisterComponent } from "./components/register/register.component";

const routes: Routes = [
  {
    path: "",
    component: ProfileComponent,
    canActivate: [IsLoggedInGuard],
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [IsAnonymousGuard],
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [IsAnonymousGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
