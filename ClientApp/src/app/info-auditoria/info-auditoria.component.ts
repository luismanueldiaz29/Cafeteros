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
        }else{
          console.log('ocurrio un error a la hora de consultar la visita auditoria');
        }
      }
    );
  }

  getCultivosPrensetados(visitaId : number){

  }
}
