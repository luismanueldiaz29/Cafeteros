import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VisitaPromotoria } from '../Models/VisitaPromotoria';
import { MaterialModule } from '../material/material';
import { Productor } from '../Models/Productor';
import { LaboresProgramada } from '../Models/LaboresProgramada';
import { LaboresRealizada } from '../Models/LaboresRealizada';
import { ProductorService } from '../services/productor.service';
import { VisitaPromotoriaService } from '../services/visitaPromotoria.service';
import { LaboresProgramadaService } from '../services/laboresProgramada.service';
import { LaboresRealizadaService } from '../services/laboresRealizada.service';
import { Tecnico } from '../Models/Tecnico';
import { TecnicoService } from '../services/tecnico.service';

@Component({
  selector: 'app-info-promotoria',
  templateUrl: './info-promotoria.component.html',
  styleUrls: ['./info-promotoria.component.css']
})
export class InfoPromotoriaComponent implements OnInit {

  
  imports :  [MaterialModule];
  Visita : VisitaPromotoria;
  visitas : VisitaPromotoria[];
  productores : Productor[];
  public productor : Productor;
  laboresProgramada : LaboresProgramada[];
  LaboresRealizada : LaboresRealizada[];
  tecnico : Tecnico;
  NoRegistrada = "Indefinida";

  private id : string;
  

  constructor(
    private Router : Router,
    private productorService : ProductorService,
    private visitaService : VisitaPromotoriaService,
    private laboresRealizadaService :LaboresRealizadaService,
    private LaboresProgramadaService : LaboresProgramadaService,
    private tecnicoService : TecnicoService
  ) { }

  ngOnInit() {
    //this.intanciarVariables();
    this.getVisita();
    //this.getProductorVisitas(sessionStorage.getItem);
  }


  // intanciarVariables(){
  //   this.productor = {id : "",nombre : "",codigoCafetero : "",nombrePredio : "",codigoSica : "",municipio : "",vereda : "",NumeroTelefono : "",AfiliacionSalud : "",ActvidadesDedican : "",fechaAsociacion:"", fechaRegistro : "", fechaNoAsociacion : "", estado: 0};
  //   this.Visita = { id : 0, fechaVisita : "" ,horaVisita : "",fechaProxVista : "",objetivoVisita : "",situacionEncontrada : "",intercambioSaberes : "",productorId : ""}
  //   this.laboresProgramada = {id : 0, actividad : "", fecha : "", visitaPromotoriaId : 0};
  //   this.LaboresRealizada = {id : 0, actividad : "", fecha : "", visitaPromotoriaId : 0};
  // }

  // getProductor(productorId : string){
  //     this.productorService.get(productorId).subscribe(
  //       productor => {
  //         this.productor = productor
  //       }
  //     );
  // }

  getVisita(){
    if(sessionStorage.getItem('visitaId') != null){  
      this.id = sessionStorage.getItem('visitaId');
      this.visitaService.get(parseInt(this.id)).subscribe(
        visita => {
          this.Visita = visita;
          this.getProductor(visita.productorId);
          this.getVisitaLaboresProgramada(visita.id);
          this.getVisitaLaboresRealizadas(visita.id);
          this.getTecnico(visita.tecnicoId);
        }
      );
    }else{
      this.volver();
    }
  }

  getVisitaLaboresRealizadas(visitaId : number){
    this.laboresRealizadaService.getAllVisitaLaboresRealizada(visitaId).subscribe(
      laboresRealizada => {
        this.LaboresRealizada = laboresRealizada;
      }
    );
  }

  getVisitaLaboresProgramada(visitaId : number){
    this.LaboresProgramadaService.getAllVisitaLaboresProgramada(visitaId).subscribe(
      laboresProgramada => {
        this.laboresProgramada = laboresProgramada;
      }
    );
  }

  volver(){
    this.Router.navigate(['/List-Productor']);
  }

  fecha(){
    this.Router.navigate(['/List_Promotoria']);
  }

  // visitaConsultar(visita : VisitaPromotoria){
  //   this.visitaService.get(visita.id).subscribe(
  //     visita => {
  //       this.Visita = visita;
        
  //       this.getProductor(visita.productorId);
  //       this.getVisitaLaboresProgramada(visita.id);
  //       this.getVisitaLaboresRealizadas(visita.id);
        
  //     }
  //   );
  // }

  getTecnico(id : string){
    this.tecnicoService.get(id).subscribe(
      tecnico => {
        tecnico == null ? alert('No se hayo el tecnico') : this.tecnico = tecnico
      }
    );
  }

  getProductor(ProductorId : string){
    if(ProductorId != null){
      this.productorService.get(ProductorId).subscribe(
        productor => {
          if(productor != null)
            this.productor = productor;
            this.getProductorVisitas(productor.id);
            sessionStorage.removeItem('productorId');
        }
      );
    }else{
      this.volver();
    }
  }

  getProductorVisitas(productorId : string){
    this.visitaService.getProductorVisitas(productorId).subscribe(
      visitas => {
        this.visitas = visitas
      }
    );
  }
 
}
