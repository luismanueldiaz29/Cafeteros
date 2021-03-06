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
import { ListPromotoriaComponent } from './list-promotoria/list-promotoria.component';
import { InfoPromotoriaComponent } from './info-promotoria/info-promotoria.component';
import { ListAuditoriaComponent } from './list-auditoria/list-auditoria.component';
import { InfoAuditoriaComponent } from './info-auditoria/info-auditoria.component';
import { ListReportesComponent } from './Reportes/list-reportes/list-reportes.component';

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
  },
  {
    path : 'List_Promotoria',
    component : ListPromotoriaComponent
  },
  {
    path : 'info_Promotoria',
    component : InfoPromotoriaComponent
  },
  {
    path : 'List_Auditoria',
    component : ListAuditoriaComponent
  },
  {
    path : 'info_Auditoria',
    component : InfoAuditoriaComponent
  },
  {
    path: 'reporte',
    component: ListReportesComponent
  }
]

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
