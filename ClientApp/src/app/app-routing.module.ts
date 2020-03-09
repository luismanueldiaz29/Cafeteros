import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { AuditoriaComponent } from './auditoria/auditoria.component';

const routes : Routes = [
  { 
    path: '', 
    component: LoginComponent 
  },
  {
    path : 'Home',
    component : HomeComponent
  },
  {
    path : "Registrar",
    component : RegistrarComponent
  },
  {
    path : "auditoria",
    component : AuditoriaComponent    
  }
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
