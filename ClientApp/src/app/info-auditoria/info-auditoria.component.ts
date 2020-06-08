import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Productor } from '../Models/Productor';
import { Tecnico } from '../Models/Tecnico';
import { ProductorService } from '../services/productor.service';
import { TecnicoService } from '../services/tecnico.service';
import { VisitaAuditoriaService } from '../services/visitaAuditoria.service';
import { VisitaAuditoria } from '../Models/VisitaAuditoria';
import { CultivosPresentandos } from '../Models/CultivosPresentandos';
import { CultivosPresentandosService } from '../services/cultivosPresentandos.service';
import { OtrosCultivosService } from '../services/otrosCultivos.service';
import { EvaluacionCompromisoService } from '../services/evaluacionCompromiso.service';
import { ResultadoEvaluacionService } from '../services/resultadoEvaluacion.service';
import { PuntoEvaluacionService } from '../services/puntoEveluacion.service';
import { OtrosCultivos } from '../Models/OtrosCultivos';
import { EvaluacionCompromiso } from '../Models/EvaluacionCompromiso';
import { CB, MA, MSE, MIES, MS } from '../Models/PuntoEvaluacion';
import { MaterialModule } from '../material/material';
import { ResultadoEvaluacion } from '../Models/ResultadoEvaluacion';

@Component({
  selector: 'app-info-auditoria',
  templateUrl: './info-auditoria.component.html',
  styleUrls: ['./info-auditoria.component.css']
})
export class InfoAuditoriaComponent implements OnInit {

  imports : [MaterialModule];

  veredaMunicipio = "";
  productor : Productor;
  tecnicoId : string;
  tecnico : Tecnico;
  id : string;
  visitaId : number;
  visita : VisitaAuditoria;
  CultivosPrensetados : CultivosPresentandos
  otrosCultivos : OtrosCultivos[];
  EvaluacionCompromisos : EvaluacionCompromiso[];
  resultadoEvaluacion : ResultadoEvaluacion;
  CB : CB;
  MA : MA;
  MSE : MSE;
  MIES : MIES;
  MS : MS;

  constructor(
    private Router : Router,
    private productorService : ProductorService,
    private tecnicoService :TecnicoService,
    private visitaAuditoriaService : VisitaAuditoriaService,
    private puntoEvaluacionService : PuntoEvaluacionService,
    private cultivoPresentadoService : CultivosPresentandosService,
    private otrosCultivosService : OtrosCultivosService,
    private evaluacionCompromisoService : EvaluacionCompromisoService,
    private resultadoEvaluacionService : ResultadoEvaluacionService,

  ) { }

  ngOnInit() {
    this.getVisitaAuditoria();
    this.initVar();
    //this.setProductor();
  }

  initVar(){
    this.tecnico = {correo : "", identificacion : "", contraseña : "", nombre : ""};
    this.productor = {id : "",nombre : "",codigoCafetero : "",nombrePredio : "",codigoSica : "",municipio : "",vereda : "",numeroTelefono : "",afiliacionSalud : "",actvidadesDedican : "",fechaAsociacion:"", fechaRegistro : "", fechaNoAsociacion : "", estado: 0, tecnicoId : ""};
    this.visita = {id : 0, recibeVisita : "", oportunidadMejora : "", decicionFinal : "", fechaFinal : "", cultivosPresentandos : "",   fechaVisita: "", horaVisita: "", productorId : "", TecnicoId : ""};
    this.CB = {id : 0, respuestaCB1 : "", justificacionCB1 : "",  respuestaCB2 : "", justificacionCB2 : "", comentarioCB : "", visitaAuditoriaId : 0};
    this.MA = {id : 0, respuestaMA1 : "", justificacionMA1 : "", respuestaMA2 : "", justificacionMA2 : "", respuestaMA3 : "", justificacionMA3 : "", respuestaMA4 : "", justificacionMA4 : "", comentarioMA : "", visitaAuditoriaId : 0};
    this.MSE = {id : 0, respuestaMSE1 : "", justificacionMSE1 : "",respuestaMSE2 : "", justificacionMSE2 : "", respuestaMSE3 : "", justificacionMSE3 : "", comentarioMSE : "", visitaAuditoriaId : 0};
    this.MIES = {id : 0, respuestaMIES1 : "", justificacionMIES1 : "",  respuestaMIES2 : "", justificacionMIES2 : "",respuestaMIES3 : "", justificacionMIES3 : "", respuestaMIES4 : "", justificacionMIES4 : "", respuestaMIES5 : "", justificacionMIES5 : "", comentarioMIES : "", visitaAuditoriaId : 0};
    this.MS = {id : 0, respuestaMS1 : "", justificacionMS1 : "",  respuestaMS2 : "", justificacionMS2 : "",respuestaMS3 : "", justificacionMS3 : "", respuestaMS4 : "", justificacionMS4 : "", respuestaMS5 : "", justificacionMS5 : "" ,comentarioMS : "", visitaAuditoriaId : 0};
  }

  volver(){
    this.Router.navigate(['/List-Productor']);
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

  getVisitaAuditoria(){
    this.visitaId = parseInt(sessionStorage.getItem('VisitaId'));
    this.visitaAuditoriaService.get(this.visitaId).subscribe(
      visita => {
        if(visita != null){
          this.visita = visita;
          this.getProductor(visita.productorId);
          this.getCultivosPrensetados(visita.id);
          this.getOtrosCultivos(visita.id);
          this.getevaluacionCompromiso(visita.id);
          this.getresultadoEvaluacion(visita.id);
          this.getCB(visita.id);
          this.getMA(visita.id);
          this.getMIES(visita.id);
          this.getMS(visita.id);
          this.getMSE(visita.id);
        }else{
          console.log('ocurrio un error a la hora de consultar la visita auditoria');
        }
      }
    );
  }

  getCultivosPrensetados(visitaId : number){
    this.cultivoPresentadoService.getAllCultivosPresentandosVisita(visitaId).subscribe(
      cultivosPresentandos => {
        cultivosPresentandos != null ?
        this.CultivosPrensetados = cultivosPresentandos
        :
        console.log("error cultivosPresentandos")
      }
    );
  }

  getOtrosCultivos(visitaId : number){
    this.otrosCultivosService.getOtrosCultivosrVisitas(visitaId).subscribe(
      otrosCultivos => {
        otrosCultivos != null ? this.otrosCultivos = otrosCultivos
        :
        console.log("error otrosCultivos")
      }
    );
  }

  getevaluacionCompromiso(visitaId : number){
    this.evaluacionCompromisoService.getAllEvaluacionCompromisoVisita(visitaId).subscribe(
      EvaluacionCompromisos => {
        EvaluacionCompromisos != null ?
        this.EvaluacionCompromisos = EvaluacionCompromisos
        :
        console.log("error otrosCultivos")
      }
    );
  }

  getresultadoEvaluacion(visitaId : number){
    this.resultadoEvaluacionService.getAllResultadoEvaluacionVisita(visitaId).subscribe(
      resultadoEvaluacion => {
        resultadoEvaluacion != null ? this.resultadoEvaluacion = resultadoEvaluacion
        :
        console.log("error resultadoEvaluacion")
      }
    );
  }

  getCB(visitaId : number){
    this.puntoEvaluacionService.getAllCBVisita(visitaId).subscribe(
      CB =>{
        CB != null ? this.CB = CB : console.log('Error CB')
      }
    );
  }

  getMA(visitaId : number){
    this.puntoEvaluacionService.getAllMAVisita(visitaId).subscribe(
      MA =>{
        MA != null ? this.MA = MA : console.log('Error MA')
      }
    );
  }

  getMSE(visitaId : number){
    this.puntoEvaluacionService.getAllMSEVisita(visitaId).subscribe(
      MSE =>{
        MSE != null ? this.MSE = MSE : console.log('Error MSE')
      }
    );
  }
  getMIES(visitaId : number){
    this.puntoEvaluacionService.getAllMIESVisita(visitaId).subscribe(
      MIES =>{
        MIES != null ? this.MIES = MIES : console.log('Error MIES')
      }
    );
  }
  getMS(visitaId : number){
    this.puntoEvaluacionService.getAllMSVisita(visitaId).subscribe(
      MS =>{
        MS != null ? this.MS = MS : console.log('Error MS')
      }
    );
  }

}
