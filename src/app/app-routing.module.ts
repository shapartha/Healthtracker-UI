import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuard } from './auth.guard';
import { BloodSugarComponent } from './modules/blood-sugar/blood-sugar.component';
import { LogoutComponent } from './modules/logout/logout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate : [ AuthGuard ] },
  { path: 'blood-sugar', component: BloodSugarComponent, canActivate : [ AuthGuard ] },
  { path: 'logout', component: LogoutComponent, canActivate : [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
