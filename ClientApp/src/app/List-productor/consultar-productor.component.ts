import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../material/material';
import { ProductorService } from '../services/productor.service';
import { Productor } from '../Models/Productor';
import { MatMenuTrigger } from '@angular/material';
import { PromotoriaComponent } from '../promotoria/promotoria.component';
import { Router } from '@angular/router';

// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-consultar-productor',
  templateUrl: './consultar-productor.component.html',
  styleUrls: ['./consultar-productor.component.css']
})
export class ConsultarProductorComponent{
 
  imports : [MaterialModule];

  private productoresAso : Productor[];
  private productoresNoAso : Productor[];
 titulo : string;
  private vTitulo : true;
  constructor(
    private productorService : ProductorService,
    private router : Router
  ) { }

  ngOnInit() {
    this.getProductorAsocido();
    this.getProductorNoAsocido();
    this.ponerTitulo();
  }

  getProductorAsocido(){
    this.productorService.getAllEstado(true).subscribe(
      productores => {
        this.productoresAso = productores;
      }
    ); 
  }

  getProductorNoAsocido(){
    this.productorService.getAllEstado(false).subscribe(
      productores => {
        this.productoresNoAso = productores;
      }
    ); 
  }

  ponerTitulo(){
    if(this.vTitulo == null || this.vTitulo == true){
      this.titulo = "Lista de productores asociados con la entidad"
    }else{
      this.titulo = "Lista de solicitudes de asociacion con la entidad"
    }
  }  

  promotoria(productor : Productor){
    sessionStorage.setItem('productorId', productor.id);
    this.router.navigate(['/Promotoria']);
  }

  informacion(productor : Productor){
    sessionStorage.setItem('productorId', productor.id);
    this.router.navigate(['/info_Productor']);
  }
}
