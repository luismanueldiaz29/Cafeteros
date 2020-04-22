import { Component, OnInit } from '@angular/core';
import { Productor } from '../Models/Productor';
import { ProductorService } from '../services/productor.service';
import { Router } from '@angular/router';
import { FamiliarService } from '../services/familiar.service';
import { Familiar } from '../Models/Familiar';
import { AspectoEconomico } from '../Models/AspectoEconomico';
import { AspectoEconomicoService } from '../services/aspectoEconomico.service';
import { PaticipacionComunitariaService } from '../services/participacionComunitaria';
import { PaticipacionComunitaria } from '../Models/PaticipacionComunitaria';
import { HabitabilidadService } from '../services/habitabilidad.service';
import { Habitabilidad } from '../Models/Habitabilidad';
import { DisponibilidadAguaService } from '../services/disponibilidadAgua.service';
import { DisponibilidadAgua } from '../Models/DisponibilidadAgua';
import { AlmacenamientoAgua } from '../Models/AlmacenamientoAgua';
import { AlmacenamientoAguaService } from '../services/almacenamientoAgua.service';

@Component({
  selector: 'app-info-productor',
  templateUrl: './info-productor.component.html',
  styleUrls: ['./info-productor.component.css']
})
export class InfoProductorComponent implements OnInit {

  private productor : Productor;
  private familiares : Familiar[];
  private aspectoEconomico : AspectoEconomico;
  private participacionComunitaria : PaticipacionComunitaria;
  private habitabilidad : Habitabilidad;
  private id : string;
  private disponibilidadAguas : DisponibilidadAgua[];
  private almacenamientoAgua : AlmacenamientoAgua;

  constructor(
    private productorService : ProductorService,
    private _router : Router,
    private familiarService : FamiliarService,
    private aspectoEconomicoService : AspectoEconomicoService,
    private participacionComunitariaService : PaticipacionComunitariaService,
    private habitabilidadService : HabitabilidadService,
    private almacenamamientosAguaService : AlmacenamientoAguaService,
    private disponibilidadAguaService : DisponibilidadAguaService
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
            this.getFamiliar(productor.id);
            this.getAspectosEconomicos(productor.id);
            this.getDisponibilidadAgua(productor.id);
            this.getAlamacenamientoAgua(productor.id);
            this.productor = productor;
            sessionStorage.removeItem('productorId');
        }
      );
    }else{
      this.volver();
    }
  }

  getFamiliar(ProductorId: string){
    this.familiarService.getAllFamiliarProdId(ProductorId).subscribe(
      familiar => {
        if(familiar != null)
        this.familiares = familiar;
      }
    );
  }

  getAspectosEconomicos(ProductorId: string){
    this.aspectoEconomicoService.getAllAspectoEconomicoProdId(ProductorId).subscribe(
      aspectoEconomico =>{
        this.aspectoEconomico = aspectoEconomico;
        this.getParticipacionComunitaria(aspectoEconomico.id);
        this.getHabitabilidadAspecto(aspectoEconomico.id);
        
      }
    );
  }
  private aistenteTrabajos : string;
  private asistenteAsamblea : string;
  getParticipacionComunitaria(aspectoEconomicoId : number){
    this.participacionComunitariaService.getPartiAspEconomico(aspectoEconomicoId).subscribe(
      participacionComunitaria =>{
        this.participacionComunitaria = participacionComunitaria
        this.asistenteAsamblea=this.participacionComunitaria.aistenteTrabajos;
        this.aistenteTrabajos=this.participacionComunitaria.asistenteAsamblea;
      }
    );
  }

  getHabitabilidadAspecto(aspectoEconomicoId : number){
    this.habitabilidadService.getHabitabilidadAspecto(aspectoEconomicoId).subscribe(
      habitabilidad =>{
        this.habitabilidad = habitabilidad;
      }
    );
  }

  getDisponibilidadAgua(productorId : string){
    this.disponibilidadAguaService.getAllDisponibilidadAguaProdId(productorId).subscribe(
      disponibilidadAgua => {
        this.disponibilidadAguas = disponibilidadAgua
        
      }
    );
  }
  
  getAlamacenamientoAgua(productorId : string){
    this.almacenamamientosAguaService.getAllAlmacenamientoAguaProdId(productorId).subscribe(
      almacenamientoAgua => {
        this.almacenamientoAgua = almacenamientoAgua
        // if(almacenamientoAgua != null){
        //   //alert('Si retorna')
        // }
      }
    );
  }

  volver(){
    this._router.navigate(['/List-Productor']);
  }


}
