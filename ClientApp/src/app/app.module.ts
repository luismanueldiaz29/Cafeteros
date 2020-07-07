import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { MaterialModule } from './material/material';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrarComponent } from './registrar/registrar.component';
import { HomeComponent } from './home/home.component';
import { AuditoriaComponent } from './auditoria/auditoria.component';
import { PromotoriaComponent } from './promotoria/promotoria.component';
import { ConsultarProductorComponent } from './List-productor/consultar-productor.component';
import { InfoProductorComponent } from './info-productor/info-productor.component';
import { ListPromotoriaComponent } from './list-promotoria/list-promotoria.component';
import { InfoPromotoriaComponent } from './info-promotoria/info-promotoria.component';
import { InfoAuditoriaComponent } from './info-auditoria/info-auditoria.component';
import { ListAuditoriaComponent } from './list-auditoria/list-auditoria.component';
import { ListReportesComponent } from './Reportes/list-reportes/list-reportes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    RegistrarComponent,
    AuditoriaComponent,
    PromotoriaComponent,
    ConsultarProductorComponent,
    InfoProductorComponent,
    ListPromotoriaComponent,
    InfoPromotoriaComponent,
    InfoAuditoriaComponent,
    ListAuditoriaComponent,
    ListReportesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    // NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
