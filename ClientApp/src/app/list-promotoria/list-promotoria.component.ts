import { Component, OnInit } from '@angular/core';
import { Productor } from '../Models/Productor';
import { VisitaPromotoria } from '../Models/VisitaPromotoria';
import { MaterialModule } from '../material/material';
import { LaboresProgramada } from '../Models/LaboresProgramada';
import { LaboresRealizada } from '../Models/LaboresRealizada';
import { Router } from '@angular/router';
import { ProductorService } from '../services/productor.service';
import { VisitaPromotoriaService } from '../services/visitaPromotoria.service';

@Component({
  selector: 'app-list-promotoria',
  templateUrl: './list-promotoria.component.html',
  styleUrls: ['./list-promotoria.component.css']
})
export class ListPromotoriaComponent implements OnInit {

  imports :  [MaterialModule];
  Visita : VisitaPromotoria;
  visitas : VisitaPromotoria[];
  productores : Productor[];
  public productor : Productor;
  laboresProgramada : LaboresProgramada;
  LaboresRealizada : LaboresRealizada;
  private id : string;
  
  constructor(
    private Router : Router,
    private productorService : ProductorService,
    private visitaService : VisitaPromotoriaService
  ) { }

  ngOnInit() {
    this.intanciarVariables();
    this.getProductor();
  }


  intanciarVariables(){
    this.productor = {id : "",nombre : "",codigoCafetero : "",nombrePredio : "",codigoSica : "",municipio : "",vereda : "",NumeroTelefono : "",AfiliacionSalud : "",ActvidadesDedican : "",fechaAsociacion:"", fechaRegistro : "", fechaNoAsociacion : "", estado: 0, tecnicoId : ""};
    this.Visita = { id : 0, fechaVisita : "" ,horaVisita : "",fechaProxVista : "",objetivoVisita : "",situacionEncontrada : "",intercambioSaberes : "",productorId : "", tecnicoId : ""}
    this.laboresProgramada = {id : 0, actividad : "", fecha : "", visitaPromotoriaId : 0};
    this.LaboresRealizada = {id : 0, actividad : "", fecha : "", visitaPromotoriaId : 0};
  }

  getProductor(){
    this.id = sessionStorage.getItem('productorId');
    if(this.id != null){
      this.productorService.get(this.id).subscribe(
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

  visitaConsultar(visita : VisitaPromotoria){
    //alert(visita.id);
    sessionStorage.setItem('visitaId', visita.id.toString());
    this.Router.navigate(['/info_Promotoria']);
  }

  volver(){
    this.Router.navigate(['/List-Productor']);
  }

}
