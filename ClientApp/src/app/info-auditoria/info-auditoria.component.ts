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

@Component({
  selector: 'app-info-auditoria',
  templateUrl: './info-auditoria.component.html',
  styleUrls: ['./info-auditoria.component.css']
})
export class InfoAuditoriaComponent implements OnInit {

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
    //this.setProductor();
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
      otrosCultivos => {
        otrosCultivos != null ? console.log('correcto resultadoEvaluacion')
        :
        console.log("error resultadoEvaluacion")
      }
    );
  }

  getCB(visitaId : number){
    this.puntoEvaluacionService.getAllCBVisita(visitaId).subscribe(
      CB =>{
        CB != null ? console.log('Correcto CB') : console.log('Error CB')
      }
    );
  }

  getMA(visitaId : number){
    this.puntoEvaluacionService.getAllMAVisita(visitaId).subscribe(
      MA =>{
        MA != null ? console.log('Correcto MA') : console.log('Error MA')
      }
    );
  }

  getMSE(visitaId : number){
    this.puntoEvaluacionService.getAllMSEVisita(visitaId).subscribe(
      MSE =>{
        MSE != null ? console.log('Correcto MSE') : console.log('Error MSE')
      }
    );
  }
  getMIES(visitaId : number){
    this.puntoEvaluacionService.getAllMIESVisita(visitaId).subscribe(
      MIES =>{
        MIES != null ? console.log('Correcto MIES') : console.log('Error MIES')
      }
    );
  }
  getMS(visitaId : number){
    this.puntoEvaluacionService.getAllMSVisita(visitaId).subscribe(
      MS =>{
        MS != null ? console.log('Correcto MS') : console.log('Error MS')
      }
    );
  }

}
