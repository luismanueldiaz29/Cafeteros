import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { AuditoriaComponent } from './auditoria/auditoria.component';
import { PromotoriaComponent } from './promotoria/promotoria.component';
import { ConsultarProductorComponent } from './List-productor/consultar-productor.component';
import { InfoProductorComponent } from './info-productor/info-productor.component';

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
  },
  {
    path : 'Promotoria',
    component : PromotoriaComponent
  },
  {
    path : 'List-Productor',
    component : ConsultarProductorComponent
  },
  {
    path : 'info_Productor',
    component : InfoProductorComponent
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
