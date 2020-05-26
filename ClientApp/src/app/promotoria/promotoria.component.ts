import { Component, OnInit } from '@angular/core';
import { ProductorService } from '../services/productor.service';
import { Productor } from '../Models/Productor';
import { Familiar } from '../Models/Familiar';
import { VisitaPromotoria } from '../Models/VisitaPromotoria';
import { LaboresRealizadaService } from '../services/laboresRealizada.service';
import { LaboresProgramadaService } from '../services/laboresProgramada.service';
import { VisitaPromotoriaService } from '../services/visitaPromotoria.service';
import { LaboresProgramada } from '../Models/LaboresProgramada';
import { LaboresRealizada } from '../Models/LaboresRealizada';
import Swal from 'sweetalert2'
import { element } from 'protractor';
import { MaterialModule } from '../material/material';
import { stringify } from 'querystring';
@Component({
  selector: 'app-promotoria',
  templateUrl: './promotoria.component.html',
  styleUrls: ['./promotoria.component.css']
})
export class PromotoriaComponent implements OnInit {
  imports :  [MaterialModule];
  Visita : VisitaPromotoria;
  productores : Productor[];
  public productor : Productor;
  laboresProgramada : LaboresProgramada;
  LaboresRealizada : LaboresRealizada;
  private id : string;

  //Este Array me sirve para obtener el mes porque this.date.getMonth() me retorna el mes en numero
  //meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  
  date = new Date();
  dia = this.date.getDate();
  mes = this.date.getMonth();
  ano = this.date.getFullYear();

  //con esta variable capturo las horas del dia
  hora = this.date.getHours()+' Horas ';
  //en esta variable capturo el año de visita en la que se hara la promotoria
  fechaVisita : string =  this.fechaNum(this.dia)+'/'+this.fechaNum(this.mes+1)+'/'+this.ano;

  constructor(
    private productorService : ProductorService,
    private visitaService : VisitaPromotoriaService,
    private laboresRealizadaService : LaboresRealizadaService,
    private laboresProgramadaService : LaboresProgramadaService
  ) { }

  ngOnInit() {
    //llamo el metoodo para capturar los productores
    this.getProductores();
    //instancio mis variables con las que capturo losa datos en el formulario
    this.intanciarVariables();
    //con esta funcion valido si hay una solicitud de promotoria
    this.getPromotoria();
  }

  
  getPromotoria(){
    this.id = sessionStorage.getItem('productorId');
    if(this.id != null){
      this.productorService.get(this.id).subscribe(
        productor => {
          if(productor != null)
          this.productor = productor;
          sessionStorage.removeItem('productorId');
        }
      );
      
    }
  }

  onRightClick(productor : Productor){
    alert('right click '+productor.nombre);
  }
  //metodo con el que capturo los productores
  getProductores(){
    this.productorService.getAllEstado(1).subscribe(
      productores => {
        this.productores = productores;
      }
    ); 
  }

  
  fechaNum(num : number) : string{
    if(num < 10){ return '0'+num; }else{ return num+'' }
  }

  getRecord(filaProductor : Productor){
    this.productor = filaProductor;
  }

  // inicio Labores realizadas
    private fieldArrayLabores: Array<LaboresRealizada> = [];
    private newAttributeLabores: LaboresRealizada = {id : 0, actividad : "", fecha : "", visitaPromotoriaId: null};

    addFieldValueLabores() {
        this.fieldArrayLabores.push(this.newAttributeLabores)
        this.newAttributeLabores = {id : 0, actividad : "", fecha : "", visitaPromotoriaId: 0};
    }
    deleteFieldValueLabores(index) {
        this.fieldArrayLabores.splice(index, 1);
    }
  // fin labores realizadas

  //inicio compromiso de labores
  private fieldArrayCompromiso: Array<LaboresProgramada> = [];
  private newAttributeCompromiso: LaboresProgramada = {id : 0, actividad : "", fecha : "", visitaPromotoriaId: null};

  addFieldValueCompromiso(){
    this.fieldArrayCompromiso.push(this.newAttributeCompromiso);
    this.newAttributeCompromiso = {id : 0, actividad : "", fecha : "", visitaPromotoriaId: 0};
  }

  deleteFieldValueCompromiso(index){
    this.fieldArrayCompromiso.splice(index, 1);
  }
  //fin compromiso de labores


  intanciarVariables(){
    this.productor = {id : "",nombre : "",codigoCafetero : "",nombrePredio : "",codigoSica : "",municipio : "",vereda : "",NumeroTelefono : "",AfiliacionSalud : "",ActvidadesDedican : "",fechaAsociacion:"", fechaRegistro : "", fechaNoAsociacion : "", estado: 0, tecnicoId : ""};
    this.Visita = { id : 0, fechaVisita : this.fechaVisita ,horaVisita : this.hora ,fechaProxVista : "",objetivoVisita : "",situacionEncontrada : "",intercambioSaberes : "",productorId : "", tecnicoId : ""}
    this.laboresProgramada = {id : 0, actividad : "", fecha : "", visitaPromotoriaId : 0};
    this.LaboresRealizada = {id : 0, actividad : "", fecha : "", visitaPromotoriaId : 0};
  }

  add(){
    if(this.productor.id == ""){
      this.mensajeIncorrecto();
    }else{
      this.mensajeConfirmacion();
    }
  }
  mensajeConfirmacion(){
    Swal.fire({
      title: 'Mensaje de confirmación',
      text: "Seguro de que quieres realizar esta accion ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        //regitro la visita de promotoria
        try {
          this.addVisita();
        } catch (error) {
         this.mensajeError()
        }
      }
    })
  }

  mensajeIncorrecto(){
    Swal.fire(
      'Accion incorrecta!',
      'Primero tiene que elejir un productor!',
      'error'
    )
  }

  mensajeError(){
    Swal.fire(
      'Accion incorrecta!',
      'Primero tiene que elejir un productor!',
      'error'
    )
  }

  mensajeCorrecto(){
    Swal.fire(
      'Accion satisfactoria!',
      'Se a registrado correctamente!',
      'success'
    )
  }

  addVisita(){
    this.Visita.productorId = this.productor.id;
    this.Visita.tecnicoId = sessionStorage.getItem("Id");
    this.visitaService.add(this.Visita).subscribe(
      visita => {
        visita != null ? this.addLabores(visita.id) 
        : console.log('No se guardo la visita de promotoria')
      }
    );
  }

  addLabores(VisitaId : number){
    
    if(this.newAttributeLabores != null){
      this.newAttributeLabores.visitaPromotoriaId = VisitaId;
      this.laboresRealizadaService.add(this.newAttributeLabores).subscribe(
        laboresRealizadas => {
          if (laboresRealizadas == null) console.log('newAtributeLabores no fue registrada')
        }
      );

      this.fieldArrayLabores.forEach( element => {
        element.visitaPromotoriaId = VisitaId;
        this.laboresRealizadaService.add(element).subscribe(
          laboresField => {
            if(laboresField == null) console.log('Ocurrio un error en array labores realizadas')
          }
        );
      });
    }

    if(this.newAttributeCompromiso != null){
      this.newAttributeCompromiso.visitaPromotoriaId = VisitaId;
      this.laboresProgramadaService.add(this.newAttributeCompromiso).subscribe(
        laboresProgramada =>{
          if(laboresProgramada == null) alert('newAttributeCompromiso no se pudo registrar labores programadas')
        }
      );

      this.fieldArrayCompromiso.forEach( element => {
        element.visitaPromotoriaId = VisitaId;
        this.laboresProgramadaService.add(element).subscribe(
          laboresPorgramada => {
            if(laboresPorgramada == null) alert('fieldArrayCompromiso no se pudo registrar labores programadas')
          }
        );
      });
    }

    this.mensajeCorrecto();
  }

}
