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
@Component({
  selector: 'app-promotoria',
  templateUrl: './promotoria.component.html',
  styleUrls: ['./promotoria.component.css']
})
export class PromotoriaComponent implements OnInit {

  Visita : VisitaPromotoria;
  productores : Productor[];
  productor : Productor;
  laboresProgramada : LaboresProgramada;
  LaboresRealizada : LaboresRealizada;


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
  }

  //metodo con el que capturo los productores
  getProductores(){
    this.productorService.getAll().subscribe(
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
    private fieldArrayLabores: Array<any> = [];
    private newAttributeLabores: any = {};

    addFieldValueLabores() {
        this.fieldArrayLabores.push(this.newAttributeLabores)
        this.newAttributeLabores = {};
    }
    deleteFieldValueLabores(index) {
        this.fieldArrayLabores.splice(index, 1);
    }
  // fin labores realizadas

  //inicio compromiso de labores
  private fieldArrayCompromiso: Array<any> = [];
  private newAttributeCompromiso: any = {};

  addFieldValueCompromiso(){
    this.fieldArrayCompromiso.push(this.newAttributeCompromiso);
    this.newAttributeCompromiso = {}
  }

  deleteFieldValueCompromiso(index){
    this.fieldArrayCompromiso.splice(index, 1);
  }
  //fin compromiso de labores


  intanciarVariables(){
    this.productor = {id : "",nombre : "",codigoCafetero : "",nombrePredio : "",codigoSica : "",municipio : "",vereda : "",NumeroTelefono : "",AfiliacionSalud : "",ActvidadesDedican : ""};
    this.Visita = { id : 0, FechaVisita : "",HoraVisita : "",FechaProxVista : "",objetivoVisita : "",situacionEncontrada : "",intercambioSaberes : "",productorId : ""}
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
      'Good job!',
      'You clicked the button!',
      'success'
    )
  }

  addVisita(){
    this.Visita.productorId = this.productor.id;
    this.visitaService.add(this.Visita).subscribe(
      visita => {
        visita != null ? this.addLabores(visita.id) 
        : alert('No se guardo la visita de promotoria')
      }
    );
  }

  addLabores(VisitaId : number){

    this.LaboresRealizada.visitaPromotoriaId = VisitaId;
    this.laboresProgramada.visitaPromotoriaId = VisitaId;
    try {
      this.laboresRealizadaService.add(this.LaboresRealizada).subscribe(
        laboresRealizada => {
          laboresRealizada != null ?  console.log('Se guardo la informacion de labores relizada') 
          : console.log('No se guardo la informacion de labores realizada')
        }
      );

      this.laboresProgramadaService.add(this.laboresProgramada).subscribe(
        laboresProgramada => {
          laboresProgramada == null ? console.log('se guardo la informacion de labores programada') 
          : console.log('No se pudo guardar la nformacion de labores programada')
        }
      );

      this.mensajeCorrecto();
    } catch (error) {
      
    }  
      
  }

}
