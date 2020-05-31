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
import { VisitaAuditoria } from '../Models/VisitaAuditoria';
import { VisitaAuditoriaService } from '../services/visitaAuditoria.service';
import { Router } from '@angular/router';
import { CultivosPresentandos } from '../Models/CultivosPresentandos';
import { OtrosCultivos } from '../Models/OtrosCultivos';
import { EvaluacionCompromiso } from '../Models/EvaluacionCompromiso';
import { ResultadoEvaluacion } from '../Models/ResultadoEvaluacion';
import { CultivosPresentandosService } from '../services/cultivosPresentandos.service';
import { OtrosCultivosService } from '../services/otrosCultivos.service';
import { EvaluacionCompromisoService } from '../services/evaluacionCompromiso.service';
import { ResultadoEvaluacionService } from '../services/resultadoEvaluacion.service';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})
export class AuditoriaComponent implements OnInit {
  //TABLES
  //CultivosPresentados : CultivosPresentandos[];
  //NewCultivoPresentado : CultivosPresentandos;

  //formularios reactivos
  firstFormGroup: FormGroup;
  secondFormGroup : FormGroup;
  threeFormGroup : FormGroup;
  submitted = false;

  //variables de captura de datos de los formularios
  id : string;
  veredaMunicipio = "";
  productor : Productor;
  tecnicoId : string;
  tecnico : Tecnico;
  productores : Productor[];
  visitaAuditoria : VisitaAuditoria;
  CB : CB;
  MA : MA;
  MSE : MSE;
  MIES : MIES;
  MS : MS;

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
    private puntoEvaluacionService : PuntoEvaluacionService,
    private visitaAuditoriaService : VisitaAuditoriaService,
    private cultivoPresentadoService : CultivosPresentandosService,
    private otrosCultivosService : OtrosCultivosService,
    private evaluacionCompromisoService : EvaluacionCompromisoService,
    private resultadoEvaluacionService : ResultadoEvaluacionService,
    private router : Router
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
      municipio: [''],
      fechaRegistro: [''],
      nombrePredio: [''],
      recibeVisita :['']
      // nombre: ['', Validators.required],
      // nombre: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({

    });

    this.threeFormGroup = this._formBuilder.group({

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
    this.productor = {id : "",nombre : "",codigoCafetero : "",nombrePredio : "",codigoSica : "",municipio : "",vereda : "",numeroTelefono : "",afiliacionSalud : "",actvidadesDedican : "",fechaAsociacion:"", fechaRegistro : "", fechaNoAsociacion : "", estado: 0, tecnicoId : ""};
    this.visitaAuditoria = {id : 0, recibeVisita : "", oportunidadMejora : "", decicionFinal : "", fechaFinal : "", cultivosPresentandos : "",   fechaVisita: this.fechaVisita, horaVisita: this.hora, productorId : "", TecnicoId : ""};
    this.CB = {id : 0, respuestaCB1 : "", justificacionCB1 : "",  respuestaCB2 : "", justificacionCB2 : "", comentarioCB : "", visitaAuditoriaId : 0};
    this.MA = {id : 0, respuestaMA1 : "", justificacionMA1 : "", respuestaMA2 : "", justificacionMA2 : "", respuestaMA3 : "", justificacionMA3 : "", respuestaMA4 : "", justificacionMA4 : "", comentarioMA : "", visitaAuditoriaId : 0};
    this.MSE = {id : 0, respuestaMSE1 : "", justificacionMSE1 : "",respuestaMSE2 : "", justificacionMSE2 : "", respuestaMSE3 : "", justificacionMSE3 : "", comentarioMSE : "", visitaAuditoriaId : 0};
    this.MIES = {id : 0, respuestaMIES1 : "", justificacionMIES1 : "",  respuestaMIES2 : "", justificacionMIES2 : "",respuestaMIES3 : "", justificacionMIES3 : "", respuestaMIES4 : "", justificacionMIES4 : "", respuestaMIES5 : "", justificacionMIES5 : "", comentarioMIES : "", visitaAuditoriaId : 0};
    this.MS = {id : 0, respuestaMS1 : "", justificacionMS1 : "",  respuestaMS2 : "", justificacionMS2 : "",respuestaMS3 : "", justificacionMS3 : "", respuestaMS4 : "", justificacionMS4 : "", respuestaMS5 : "", justificacionMS5 : "" ,comentarioMS : "", visitaAuditoriaId : 0};
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
          this.add();
        } catch (error) {
         this.mensajeError()
        }
      }
    })
  }

  mensajeError(){
    Swal.fire(
      'Accion incorrecta!',
      'Primero tiene que elejir un productor!',
      'error'
    )
  }

  add(){
    this.addVisitaAuditoria();
    this.router.navigate(['/List-Productor']);
  }

  addVisitaAuditoria(){
    this.visitaAuditoria.productorId = this.productor.id;
    this.visitaAuditoria.TecnicoId = this.tecnico.correo;
    console.log('visitaAuditoria.TecnicoId '+this.visitaAuditoria.TecnicoId);
    console.log('visitaAuditoria.TecnicoId '+this.visitaAuditoria.productorId);
    this.visitaAuditoriaService.add(this.visitaAuditoria).subscribe(
      visitaAuditoria =>{
        if(visitaAuditoria  != null){
          console.log('Add visitaAuditoria')
          try{
            this.addCB(visitaAuditoria.id);
            this.addMA(visitaAuditoria.id);
            this.addMIES(visitaAuditoria.id);
            this.addMSE(visitaAuditoria.id);
            this.addMS(visitaAuditoria.id);
            this.addResultadoEvaluacionService(visitaAuditoria.id);
            this.addotrosCultivosService(visitaAuditoria.id);
            this.addCultivoPresentadoService(visitaAuditoria.id);
            this.addEvaluacionCompromisoService(visitaAuditoria.id)

            this.mensajeCorrecto();
          }catch(Error){
            console.log(Error);
          }
        }else{
          console.log('Error visitaAuditoria')
        }
      }
    );
  }

  mensajeCorrecto(){
    Swal.fire(
      'Accion satisfactoria!',
      'Se a registrado correctamente!',
      'success'
    )
  }

  addCB(visitaAuditoriaId : number){
    this.CB.visitaAuditoriaId = visitaAuditoriaId;
    this.puntoEvaluacionService.addCB(this.CB).subscribe(
      CD => {
        if(CD != null){
          console.log("add CD");
        }else{
          console.log("Error add CD");
        }
      }
    );
  }

  addMA(visitaAuditoriaId : number){
    this.MA.visitaAuditoriaId = visitaAuditoriaId;
    this.puntoEvaluacionService.addMA(this.MA).subscribe(
      MA => {
        if(MA != null){
          console.log("add MA");
        }else{
          console.log("Error add MA");
        }
      }
    );
  }

  addMSE(visitaAuditoriaId : number){
    this.MSE.visitaAuditoriaId = visitaAuditoriaId;
    this.puntoEvaluacionService.addMSE(this.MSE).subscribe(
      MSE => {
        if(MSE != null){
          console.log("add MSE");
        }else{
          console.log("Error add MSE");
        }
      }
    );
  }
  addMIES(visitaAuditoriaId : number){
    this.MIES.visitaAuditoriaId = visitaAuditoriaId;
    this.puntoEvaluacionService.addMIES(this.MIES).subscribe(
      MIES => {
        if(MIES != null){
          console.log("add MIES");
        }else{
          console.log("Error add MIES");
        }
      }
    );
  }
  addMS(visitaAuditoriaId : number){
    this.MS.visitaAuditoriaId = visitaAuditoriaId;
    this.puntoEvaluacionService.addMS(this.MS).subscribe(
      MS => {
        if(MS != null){
          console.log("add MS");
        }else{
          console.log("Error add MS");
        }
      }
    );
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

  //cultivos presentados
  CultivosPrensetados: Array<CultivosPresentandos> = [];
  NewCultivoPresentados: CultivosPresentandos = {id : 0, cultivo: "", area: null, produccionObtenida: "", produccionEstimada: "", sustanciaNoPermitida:"", visitaAuditoriaId:0};
  //TABLES
  addCultivoPresentado(){
    this.CultivosPrensetados.push(this.NewCultivoPresentados);
    this.NewCultivoPresentados = {id : 0, cultivo: "", area: null, produccionObtenida: "", produccionEstimada: "", sustanciaNoPermitida:"", visitaAuditoriaId:0};
  }

  deleteCultivoPresentado(index){
    this.CultivosPrensetados.splice(index, 1);
  }

  addCultivoPresentadoService(VisitaId : number){
    if(this.NewCultivoPresentados.cultivo != ""){
      this.NewCultivoPresentados.visitaAuditoriaId = VisitaId;
      this.cultivoPresentadoService.add(this.NewCultivoPresentados).subscribe(
        CultivosPrensetado => {
          if (CultivosPrensetado == null) console.log('NewCultivoPresentados no fue registrada')
        }
      );
    }

    this.CultivosPrensetados.forEach( element => {
      element.visitaAuditoriaId = VisitaId;
      this.cultivoPresentadoService.add(element).subscribe(
        CultivosPrensetado => {
          if(CultivosPrensetado == null) console.log('Ocurrio un error en array cultivoPresentadoService')
        }
      );
    });
  }


  //Otros usos del suelo en la finca
  otrosCultivos: Array<OtrosCultivos> = [];
  NewUsoOtrosCultivos: OtrosCultivos = {id : 0, cultivo : "", area:0, tipoOrganico:"", uso:"", riesgo:"", visitaAuditoriaId:0};
  addotrosCultivos(){
    this.otrosCultivos.push(this.NewUsoOtrosCultivos);
    this.NewUsoOtrosCultivos = {id : 0, cultivo : "", area: 0, tipoOrganico:"", uso:"", riesgo:"", visitaAuditoriaId:0};
  }

  deleteotrosCultivos(index){
    this.otrosCultivos.splice(index, 1);
  }

  addotrosCultivosService(VisitaId : number){
    if(this.NewUsoOtrosCultivos.cultivo != ""){
      this.NewUsoOtrosCultivos.visitaAuditoriaId = VisitaId;
      this.otrosCultivosService.add(this.NewUsoOtrosCultivos).subscribe(
        otroscultivo => {
          if (otroscultivo == null) console.log('NewUsoOtrosCultivos no fue registrada')
        }
      );
    }

    this.otrosCultivos.forEach( element => {
      element.visitaAuditoriaId = VisitaId;
      this.otrosCultivosService.add(element).subscribe(
        otroscultivo => {
          if(otroscultivo == null) console.log('Ocurrio un error en array otrosCultivosService')
        }
      );
    });
  }

  //Evaluacion compromisos de mejoramiento ultima visita
  EvaluacionCompromisos : Array<EvaluacionCompromiso> = [];
  NewEvaluacionCompromiso: EvaluacionCompromiso = { id:0, codigo:"", accionCorrectiva:"", completado:"", razones:"", visitaAuditoriaId:0};
  addEvaluacionCompromisos(){
    this.EvaluacionCompromisos.push(this.NewEvaluacionCompromiso);
    this.NewEvaluacionCompromiso = { id:0, codigo:"", accionCorrectiva:"", completado:"", razones:"", visitaAuditoriaId:0};
  }

  deleteEvaluacionCompromisos(index){
    this.EvaluacionCompromisos.splice(index, 1);
  }

  addEvaluacionCompromisoService(VisitaId : number){
    if(this.NewEvaluacionCompromiso.codigo != ""){
      this.NewEvaluacionCompromiso.visitaAuditoriaId = VisitaId;
      this.evaluacionCompromisoService.add(this.NewEvaluacionCompromiso).subscribe(
        EvaluacionCompromiso => {
          if (EvaluacionCompromiso == null) console.log('NewEvaluacionCompromiso no fue registrada')
        }
      );
    }

    this.EvaluacionCompromisos.forEach( element => {
      element.visitaAuditoriaId = VisitaId;
      this.evaluacionCompromisoService.add(element).subscribe(
        EvaluacionCompromisos => {
          if(EvaluacionCompromisos == null) console.log('Ocurrio un error en array EvaluacionCompromisos')
        }
      );
    });
  }

  //RESULTADOS DE LA EVALUACION ACTUAL
  ResultadoEvaluacion : Array<ResultadoEvaluacion> = [];
  NewResultadoEvaluacion : ResultadoEvaluacion = {id: 0,codigo: "",hallazgo: "",accionPropuesta: "",tiempoAcordado: "",visitaAuditoriaId:0};
  addResultadoEvaluacion(){
    this.ResultadoEvaluacion.push(this.NewResultadoEvaluacion);
    this.NewResultadoEvaluacion = {id: 0,codigo: "",hallazgo: "",accionPropuesta: "",tiempoAcordado: "",visitaAuditoriaId:0};
  }

  deleteResultadoEvaluacion(index){
    this.ResultadoEvaluacion.splice(index, 1);
  }

  addResultadoEvaluacionService(VisitaId : number){
    if(this.NewResultadoEvaluacion.codigo != ""){
      this.NewResultadoEvaluacion.visitaAuditoriaId = VisitaId;
      this.resultadoEvaluacionService.add(this.NewResultadoEvaluacion).subscribe(
        ResultadoEvaluacion => {
          if (ResultadoEvaluacion == null) console.log('NewEvaluacionCompromiso no fue registrada')
        }
      );
    }

    this.ResultadoEvaluacion.forEach( element => {
      element.visitaAuditoriaId = VisitaId;
      this.resultadoEvaluacionService.add(element).subscribe(
        ResultadoEvaluacion => {
          if(ResultadoEvaluacion == null) console.log('Ocurrio un error en array EvaluacionCompromisos')
        }
      );
    });
  }

}

