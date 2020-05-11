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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-productor',
  templateUrl: './info-productor.component.html',
  styleUrls: ['./info-productor.component.css']
})
export class InfoProductorComponent implements OnInit {

  estadoModificado : string;
  private productor : Productor;
  private familiares : Familiar[];
  private aspectoEconomico : AspectoEconomico;
  private participacionComunitaria : PaticipacionComunitaria;
  private habitabilidad : Habitabilidad;
  private id : string;
  private disponibilidadAguas : DisponibilidadAgua[];
  private almacenamientoAgua : AlmacenamientoAgua;
  private estado : string;
  //fecha de registro
  date = new Date();
  dia = this.date.getDate();
  mes = this.date.getMonth();
  ano = this.date.getFullYear();

  //con esta variable capturo las horas del dia
  hora = this.date.getHours()+' Horas ';
  //en esta variable capturo el año de visita en la que se hara la promotoria
  fechaRegistro : string =  this.fechaNum(this.dia)+'/'+this.fechaNum(this.mes+1)+'/'+this.ano;

  private usuario: string;
  constructor(
    private productorService : ProductorService,
    private _router : Router,
    private familiarService : FamiliarService,
    private aspectoEconomicoService : AspectoEconomicoService,
    private participacionComunitariaService : PaticipacionComunitariaService,
    private habitabilidadService : HabitabilidadService,
    private almacenamamientosAguaService : AlmacenamientoAguaService,
    private disponibilidadAguaService : DisponibilidadAguaService,
    private _Route : Router
  ) { }

  ngOnInit() {
    this.getProductor();
    this.usuario = sessionStorage.getItem('User');
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
            this.estadoProductor(productor.estado);
            this.productor = productor;
            sessionStorage.removeItem('productorId');
        }
      );
    }else{
      this.volver();
    }
  }

  estadoProductor(estado : number){
    if(estado == 0){
      this.estado = "Solicitud de asociacion";
    }else if(estado == 1){
      this.estado = "Aprobado";
    }else{
      this.estado = "No aprobado"
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

  fechaNum(num : number) : string{
    if(num < 10){ return '0'+num; }else{ return num+'' }
  }

  modificar(){
    alert(this.estadoModificado);
    if(this.estadoModificado == null){
      Swal.fire(
        'Accion incorrecta!',
        'Para saltar esto pulse ok!',
        'error'
      )
      return 
    }else if(this.estadoModificado == "Aprobado"){
      this.productor.estado = 1;
    }else if(this.estadoModificado == "Rechazado"){
      this.productor.estado = 2;
    }

    this.productorService.update(this.productor).subscribe(
      productorM => {
        Swal.fire(
          'Accion sastifactoria!',
          'Para saltar esto pulse ok!',
          'success'
        );
        this._Route.navigate(['/List-Productor']);
      }
    );
  }

}
