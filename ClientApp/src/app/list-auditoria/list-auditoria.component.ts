import { Component, OnInit } from '@angular/core';
import { ProductorService } from '../services/productor.service';
import { Productor } from '../Models/Productor';
import { Router } from '@angular/router';
import { VisitaAuditoriaService } from '../services/visitaAuditoria.service';
import { VisitaAuditoria } from '../Models/VisitaAuditoria';

@Component({
  selector: 'app-list-auditoria',
  templateUrl: './list-auditoria.component.html',
  styleUrls: ['./list-auditoria.component.css']
})
export class ListAuditoriaComponent implements OnInit {

  id : string;
  productor : Productor;
  visitaAuditorias : VisitaAuditoria[];
  constructor(
    private Router : Router,
    private productorService : ProductorService,
    private VisitaAuditoriaService : VisitaAuditoriaService
  ) { }

  ngOnInit() {
    this.getProductor();
  }

  getProductor(){
    this.id = sessionStorage.getItem('productorId');
    if(this.id != null){
      this.productorService.get(this.id).subscribe(
        productor => {
          if(productor != null)
            this.productor = productor;
            sessionStorage.removeItem('productorId');
            this.visitaAuditoria();
        }
      );
    }else{
      this.volver();
    }
  }

  volver(){
    this.Router.navigate(['/List-Productor']);
  }

  visitaAuditoria(){
    this.VisitaAuditoriaService.getProductorVisitas(this.productor.id).subscribe(
      visitaAuditorias => {
        visitaAuditorias != null ? this.visitaAuditorias = visitaAuditorias
        :
        console.log('error al consultar las auditorias');
      }
    );
  }

  visitaConsultar(visita : VisitaAuditoria){
    sessionStorage.setItem('VisitaId', visita.id.toString());
    this.Router.navigate(['/info_Auditoria']);
  }
}
