import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../material/material';
import { ProductorService } from '../services/productor.service';
import { Productor } from '../Models/Productor';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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

  productoresAprobado : Productor[];
  productoresSolicitud : Productor[];
  productorNoAprobado : Productor[];
  titulo : string;
  private vTitulo : true;

  constructor(
    private productorService : ProductorService,
    private router : Router
  ) { }

  ngOnInit() {
    this.getProductorAprobado();
    this.getProductorSolicitud();
    this.getProductorNoAprobado();
    this.ponerTitulo();
  }

  //estado reprobado
  getProductorNoAprobado(){
    this.productorService.getAllEstado(2).subscribe(
      productores => {
        this.productorNoAprobado = productores;
      }
    );
  }

  //estado aprobado
  getProductorAprobado(){
    this.productorService.getAllEstado(1).subscribe(
      productores => {
        this.productoresAprobado = productores;
      }
    );
  }

  //estado solicitud
  getProductorSolicitud(){
    this.productorService.getAllEstado(0).subscribe(
      productores => {
        this.productoresSolicitud = productores;
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

  promotoriaNavigate(productor : Productor){
    sessionStorage.setItem('productorId', productor.id);
    this.router.navigate(['/Promotoria']);
  }

  informacion(productor : Productor){
    sessionStorage.setItem('productorId', productor.id);
    this.router.navigate(['/info_Productor']);
  }

  // opcPromotoria(){
  //   Swal.fire({
  //     title : 'ELija una opcion'
  //     button
  //   })
  // }

  promotoria(productor :  Productor){
    Swal.fire({
      title: 'Elejir opción',
      text: "Quiere consultar o Registrar una nueva Promotoria ?",
      icon: 'info',
      showCancelButton: true,
      cancelButtonText : 'Consultar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Registrar'
    }).then((result) => {
      if (result.value) {
        // Swal.fire(
        //   'registar!',
        //   'Your file has been deleted.',
        //   'success'
        // )
        this.promotoriaNavigate(productor);
      }else{
        // Swal.fire(
        //   'Consultar!',
        //   'Your file has been deleted.',
        //   'success'
        // )
        sessionStorage.setItem('productorId', productor.id);
        this.router.navigate(['/List_Promotoria']);
      }
    })
  }

  auditoria(productor : Productor){
    Swal.fire({
      title: 'Elejir opción',
      text: "Quiere consultar o Registrar una nueva Auditoria ?",
      icon: 'info',
      showCancelButton: true,
      cancelButtonText : 'Consultar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Registrar'
    }).then((result) => {
      if (result.value) {
        // Swal.fire(
        //   'registar!',
        //   'Your file has been deleted.',
        //   'success'
        // )
        sessionStorage.setItem('productorId', productor.id);
        this.router.navigate(['/auditoria']);
      }else{
        // Swal.fire(
        //   'Consultar!',
        //   'Your file has been deleted.',
        //   'success'
        // )
        sessionStorage.setItem('productorId', productor.id);
        this.router.navigate(["/List_Auditoria"])
      }
    })

  }
}
