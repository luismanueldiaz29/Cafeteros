import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes : Routes = [
  { 
    path: '', 
    component: LoginComponent 
  },
  {
    path : 'Home',
    component : HomeComponent
  },
  //angular7
  // {path:'',redirectTo:'/user/login',pathMatch:'full'},
  // {
  //   path: 'user', component: UserComponent,
  //   children: [
  //     { path: 'registration', component: RegistrationComponent },
  //     { path: 'login', component: LoginComponent }
  //   ]
  // },
  // {path:'home',component:HomeComponent,canActivate:[AuthGuard]}
]

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
