import { Component, OnInit } from '@angular/core';
import { ProductorService } from '../services/productor.service';
import { Productor } from '../Models/Productor';
import { empty } from 'rxjs';
import { TecnicoService } from '../services/tecnico.service';
import { Tecnico } from '../Models/Tecnico';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PuntoEvaluacionService } from '../services/puntoEveluacion.service';
import { CB, MA, MSE, MIES, MS } from '../Models/PuntoEvaluacion';
import { VisitaAudtoria } from '../Models/VisitaAuditoria';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})
export class AuditoriaComponent implements OnInit {
  //formularios reactivos
  firstFormGroup: FormGroup;
  secondFormGroup : FormGroup;
  submitted = false;

  //variables de captura de datos de los formularios
  private id : string;
  private veredaMunicipio = "";
  private productor : Productor;
  private tecnicoId : string;
  private tecnico : Tecnico;
  private productores : Productor[];
  private visitaAuditoria : VisitaAudtoria;
  private CB : CB;
  private MA : MA;
  private MSE : MSE;
  private MIES : MIES;
  private MS : MS;

  //fecha
  date = new Date();
  dia = this.date.getDate();
  mes = this.date.getMonth();
  ano = this.date.getFullYear();

  //con esta variable capturo las horas del dia
  hora = this.date.getHours()+' Horas ';
  //en esta variable capturo el año de visita en la que se hara la promotoria
  fechaVisita : string =  this.fechaNum(this.dia)+'/'+this.fechaNum(this.mes+1)+'/'+this.ano;

  constructor(
    private _formBuilder: FormBuilder, //para formulario reactivo
    private productorService : ProductorService,
    private tecnicoService : TecnicoService,
    private  puntoEvaluacionService : PuntoEvaluacionService
  ) { }

  ngOnInit() {
    this.initVar();
    this.setProductor();
    this.getProductores();
    this.validarFromgroup();
  }
    
  validarFromgroup(){
    this.firstFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      fechaVisita: ['', Validators.required],
      hora: ['', Validators.required],
      codigoCafetero: ['', Validators.required],
      nombreP: ['', Validators.required],
      id: ['', Validators.required],
      NumeroTelefono: ['', Validators.required],
      municipio: ['', Validators.required],
      fechaRegistro: ['', Validators.required]
      // nombre: ['', Validators.required],
      // nombre: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({

    });
  }

  fechaNum(num : number) : string{
    if(num < 10){ return '0'+num; }else{ return num+'' }
  }

  setProductor(){
    this.id = sessionStorage.getItem("productorId");
    if(this.id != null){
      sessionStorage.removeItem('productorId');
      this.getProductor(this.id);
      this.getTecnico();
    }
  }
  
  getProductor(id : string){
    this.productorService.get(id).subscribe(
      productor => {
        if(productor != null){
          this.veredaMunicipio = productor.municipio+","+productor.vereda;
          this.productor = productor;
          this.getTecnico();
        }else{
          console.log('Error al consultar el productor');
        }
      }
    );
  }

  getTecnico(){
    this.tecnicoId = sessionStorage.getItem("Id");
    this.tecnicoService.get(this.tecnicoId).subscribe(
      tecnico => {
        tecnico != null ? this.tecnico = tecnico : console.log('Error al consultar el tecnico');
      }
    );
  }

  initVar(){
    this.tecnico = {correo : "", identificacion : "", contraseña : "", nombre : ""};
    this.productor = {id : "",nombre : "",codigoCafetero : "",nombrePredio : "",codigoSica : "",municipio : "",vereda : "",NumeroTelefono : "",AfiliacionSalud : "",ActvidadesDedican : "",fechaAsociacion:"", fechaRegistro : "", fechaNoAsociacion : "", estado: 0, tecnicoId : ""};
    this.visitaAuditoria = {id : 0, recibeVisita : "", oportunidadMejora : "", decicionFinal : "", fechaFinal : "", cultivosPresentandos : ""};
    this.CB = {id : 0, respuestaCB1 : "", justificacionCB1 : "",  respuestaCB2 : "", justificacionCB2 : "", comentarioCB : "", visitaAuditoriaId : 0};
    this.MA = {id : 0, respuestaMA1 : "", justificacionMA1 : "", respuestaMA2 : "", justificacionMA2 : "", respuestaMA3 : "", justificacionMA3 : "", respuestaMA4 : "", justificacionMA4 : "", comentarioMA : "", visitaAuditoriaId : 0};
    this.MSE = {id : 0, respuestaMSE1 : "", justificacionMSE1 : "",respuestaMSE2 : "", justificacionMSE2 : "", respuestaMSE3 : "", justificacionMSE3 : "", comentarioMSE : "", visitaAuditoriaId : 0};
    this.MIES = {id : 0, respuestaMIES1 : "", justificacionMIES1 : "",  respuestaMIES2 : "", justificacionMIES2 : "",respuestaMIES3 : "", justificacionMIES3 : "", respuestaMIES4 : "", justificacionMIES4 : "", respuestaMIES5 : "", justificacionMIES5 : "", comentarioMIES : "", visitaAuditoriaId : 0};
    this.MS = {id : 0, respuestaMS1 : "", justificacionMS1 : "",  respuestaMS2 : "", justificacionMS2 : "",respuestaMS3 : "", justificacionMS3 : "", respuestaMS4 : "", justificacionMS4 : "", respuestaMS5 : "", justificacionMS5 : "" ,comentarioMS : "", visitaAuditoriaId : 0};
  }

  addVisitaAuditoria(){
    //this
  }

  //metodo con el que capturo los productores
  getProductores(){
    this.productorService.getAllEstado(1).subscribe(
      productores => {
        this.productores = productores;
      }
    ); 
  }

  get f() { return this.firstFormGroup.controls; }

  onReset() {
    this.submitted = false;
    this.firstFormGroup.reset();
  }

  onSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.firstFormGroup.invalid) {
      Swal.fire(
        'Accion incorrecta!',
        'Primero debe seleccionar el productor',
        'error'
      );
      return;
    }
  }
}
