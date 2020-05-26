import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material';
import Swal from 'sweetalert2';
import { ProductorService } from '../services/productor.service';
import { FamiliarService } from '../services/familiar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Productor } from '../Models/Productor';
import { Familiar } from '../Models/Familiar';
import { AspectoEconomico } from '../Models/AspectoEconomico';
import { Habitabilidad } from '../Models/Habitabilidad';
import { PaticipacionComunitaria } from '../Models/PaticipacionComunitaria';
import { AspectoEconomicoService } from '../services/aspectoEconomico.service';
import { HabitabilidadService } from '../services/habitabilidad.service';
import { PaticipacionComunitariaService } from '../services/participacionComunitaria';
import { AlmacenamientoAgua } from '../Models/AlmacenamientoAgua';
import { DisponibilidadAgua } from '../Models/DisponibilidadAgua';
import { AlmacenamientoAguaService } from '../services/almacenamientoAgua.service';
import { DisponibilidadAguaService } from '../services/disponibilidadAgua.service';
import { UsoAgua } from '../Models/UsoAgua';
import { element } from 'protractor';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  imports : [MaterialModule];//importo mi clase material para usuar los componentes de angular material
  submitted = false;
  asistente : string;
  tradicional : string;
  organizacion : string;
  selectServicioSanitario : string;
  CumpleEstudios : string;

  //Productor
  productor : Productor;
  familiar : Familiar;
  aspectoEconomico : AspectoEconomico;
  habitabilidad : Habitabilidad;
  participacionComunitaria : PaticipacionComunitaria;
  almacenamientoAgua : AlmacenamientoAgua;
  disponibilidadAgua : DisponibilidadAgua;

  //formGroup
  firstFormGroup: FormGroup;
  secondFormGroup : FormGroup;
  threeFormGroup : FormGroup;

  //fecha de registro
  date = new Date();
  dia = this.date.getDate();
  mes = this.date.getMonth();
  ano = this.date.getFullYear();

  //con esta variable capturo las horas del dia
  hora = this.date.getHours()+' Horas ';
  //en esta variable capturo el año de visita en la que se hara la promotoria
  fechaRegistro : string =  this.fechaNum(this.dia)+'/'+this.fechaNum(this.mes+1)+'/'+this.ano;


  constructor(
    private _formBuilder: FormBuilder, //para formulario reactivo
    private productorService : ProductorService,
    private familiarService : FamiliarService,
    private aspectoEconomicoService : AspectoEconomicoService,
    private habitabilidadService : HabitabilidadService,
    private participacionComunitariaService : PaticipacionComunitariaService,
    private almacenamientoSevice : AlmacenamientoAguaService,
    private disponibilidadAguaService : DisponibilidadAguaService
  ) { }

  ngOnInit() {
    this.incializarVariables();//inicializo mis variables con las cuales capturare los datos del fromulario
    this.validarFromgroup();//validos los formgroup para los formularios reactivos
  }

  //metodo para guardar los datos capturados en el formulario
  guardar(){//console.log('el array es de '+this.fieldArray.length+' '+this.fieldArray.shift().Nombre)
    try {
      this.guardarProductor();
    } catch (error) {

    }

  }

  guardarProductor(){
    this.productor.tecnicoId = sessionStorage.getItem("Id");
    this.productorService.add(this.productor).subscribe(
      productor => {
        if(productor != null) this.GuardarFamiliar(productor.id)
      }
    );
  }

  incializarVariables(){
    this.productor = {id : "",nombre : "",codigoCafetero : "",nombrePredio : "",codigoSica : "",municipio : "",vereda : "",NumeroTelefono : "",AfiliacionSalud : "",ActvidadesDedican : "",fechaAsociacion:"", fechaRegistro : this.fechaRegistro, fechaNoAsociacion : "", estado: 0, tecnicoId : ""};
    //this.familiar = {id : null,Nombre : "",NumeroDocumento : "",FechaNacimiento : "",Parentesco : "",TipoPoblacion : "",AfiliacionSalud : "",NivelEducativo : "",ProductorId : ""};
    this.aspectoEconomico = {id : 0, tenenciaTierra : "",legalidad : "",productorId : ""}
    this.participacionComunitaria = {id : 0, asistenteAsamblea : "",cargoAsamblea : "",aistenteTrabajos : "",cargoTrabajo : "",organizacionAparte : "",cualOrganizacion : "",aspectoEconomicoId : 0}
    this.habitabilidad = {id : 0,tipoVivienda : "",numeroHabitaciones : 0,materialPredominante : "",materialTecho : "",materialCosinar : "",energiaCosinar : "",servicioSanitario : "",tipoAlumbrado : "",aspectoEconomicoId : 0}
    this.almacenamientoAgua = {id: 0,tipoAlmacenamiento: "",volumen: "",numeroUsuario: 0,estudioAgua: "",existeDesperdicio: "",mantenimiento: "",productorId: ""}
  }

  validarFromgroup(){
    this.firstFormGroup = this._formBuilder.group({
      Nombre: ['', Validators.required],
      id : ['', Validators.required],
      CodigoCafetero : ['', Validators.required],
      NombrePredio :['', Validators.required],
      CodigoSica : ['', Validators.required],
      Municipio : ['', Validators.required],
      Vereda : ['', Validators.required],
      NumeroTelefono : ['', Validators.required],
      AfiliacionSalud : ['', Validators.required],
      ActvidadesDedican : ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      TenenciaTierra : ['', Validators.required],
      Legalidad : ['', Validators.required],
      AsistenteAsamblea : ['', Validators.required],
      AsistenteTrabajos : ['', Validators.required],
      OrganizacionAparte : ['', Validators.required],
      CargoAsamblea : [''],
      CargoTrabajo : [''],
      CualOrganizacion : [''],
      TipoVivienda : [''],
      NumeroHabitaciones : [''],
      MaterialPredominante : [''],
      MaterialTecho : [''],
      TipoCosina : [''],
      MaterialCosinar : [''],
      EnergiaCosinar : [''],
      ServicioSanitario : [''],
      estadoServicioSanitario : [''],
      TipoAlumbrado : ['']
    });

    this.threeFormGroup = this._formBuilder.group({
      fuente : [''],
      disponibilidad : [''],

      //almacenamiento
      tipoAlmacenamiento : [''],
      volumen : [''],
      numeroUsuario : [''],
      estudioAgua : [''],
      existeDesperdicio : [''],
      mantenimiento : [''],
      resultado : ['']
    });
  }

  private fieldArray: Array<Familiar> = [];
  private newAttribute: Familiar = {id : 0 ,Nombre : "",NumeroDocumento : "",FechaNacimiento : "",Parentesco : "",TipoPoblacion : "",AfiliacionSalud : "",NivelEducativo : "",ProductorId : ""};

  //agregar filas de la tabla de familiares del productor
  addFieldValue() {
    this.newAttribute.ProductorId = this.productor.id;
    this.fieldArray.push(this.newAttribute)
    this.newAttribute.ProductorId = this.productor.id;
    this.newAttribute = {id : 0 ,Nombre : "",NumeroDocumento : "",FechaNacimiento : "",Parentesco : "",TipoPoblacion : "",AfiliacionSalud : "",NivelEducativo : "",ProductorId : ""};
  }

  //eliminar una fila de la tabla de familiares del prductor
  deleteFieldValue(index) {
      this.fieldArray.splice(index, 1);
  }


  private fieldArrayDisponibilidadAgua: Array<DisponibilidadAgua> = [];
  private newAttributeDisponibilidadAgua: DisponibilidadAgua  = {id: 0,fuente: "",usoDomestico: null,usoAgricola: null,disponibilidad: "",productorId: ""};
  //agregar filas de la tabla de diponibilidad de agua
  addFieldValueDisponibilidadAgua() {
    this.newAttributeDisponibilidadAgua.productorId = this.productor.id;
    this.fieldArrayDisponibilidadAgua.push(this.newAttributeDisponibilidadAgua)
    this.newAttributeDisponibilidadAgua = new DisponibilidadAgua;
    this.newAttributeDisponibilidadAgua.productorId = this.productor.id;
  }

  //eliminar una fila de la tabla de disponibilidad de agua
  deleteFieldValueDisponibilidadAgua(index) {
      this.fieldArrayDisponibilidadAgua.splice(index, 1);
  }

  get f() { return this.firstFormGroup.controls; }
  get f2() {return this.secondFormGroup.controls}

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.firstFormGroup.invalid) {
      return;
    }
    //this.guardar();
  }

  GuardarFamiliar(id : string) : void{
    //guardo el ultimo familiar agregado
    try{
        this.newAttribute.ProductorId = id;
        this.familiarService.add(this.newAttribute).subscribe(
        familiar => {
          console.log(this.newAttribute.Nombre+' '+this.newAttribute.ProductorId)
          familiar != null ? console.log(' SE AGREGO NEWFAMILIAR '+this.newAttribute.Nombre) : console.log(' ERROR NEWFAMILIAR '+this.newAttribute.Nombre+' productorId '+this.newAttribute.ProductorId)
        }
      );
      //recorro el array de familiares y los guardo
      this.fieldArray.forEach(element => {
        element.ProductorId = id;
        this.familiarService.add(element).subscribe(
          fam => {
            fam != null ? console.log('se agrego familiar del array '+fam.Nombre) : console.log('error al recorrer el array'+element.Nombre+' productorId '+element.ProductorId)
          }
        );
      });
      
      this.GuardarAspectoEconomico(id);
      this.GuardarDisponibilidadAgua(id);
      this.guardarAlmacenamientoAgua(id);
    }catch(error){
      Swal.fire(
        'Accion incorrecta!',
        'Para saltar esto pulse ok!',
        'error'
      )
    }
  }

  GuardarDisponibilidadAgua(productorId : string){
    this.newAttributeDisponibilidadAgua.productorId = productorId;
    this.disponibilidadAguaService.add(this.newAttributeDisponibilidadAgua).subscribe(
    disponibilidadAgua => {
      console.log(this.newAttribute.Nombre+' '+this.newAttribute.ProductorId)
      disponibilidadAgua != null ? console.log(' SE AGREGO newAttributeDisponibilidadAgua '+this.newAttributeDisponibilidadAgua.fuente) : console.log(' ERROR newAttributeDisponibilidadAgua '+this.newAttributeDisponibilidadAgua.fuente+' productorId '+this.newAttributeDisponibilidadAgua.fuente)
    });

    this.fieldArrayDisponibilidadAgua.forEach(
      element => {
        this.disponibilidadAguaService.add(element).subscribe(
          disponibilidadAgua => {
            disponibilidadAgua != null ? console.log(' SE AGREGO fieldArrayDisponibilidadAgua '+this.newAttributeDisponibilidadAgua.fuente) : console.log(' ERROR fieldArrayDisponibilidadAgua '+element.fuente+' productorId '+element.fuente)
          }
        )
      }
    );
  }

  GuardarAspectoEconomico(id : string){
    this.aspectoEconomico.productorId =  id;
    this.aspectoEconomicoService.add(this.aspectoEconomico).subscribe(
      aspectoEco => {
        aspectoEco != null ? this.guardarHabitabilidad(aspectoEco.id) : alert('No se pudo guardar aspecto economico')
      }
    );
  }

  guardarHabitabilidad(id : number){
    this.habitabilidad.aspectoEconomicoId = id;
    this.habitabilidadService.add(this.habitabilidad).subscribe(
      habitabilidad => {
        habitabilidad != null ? this.guardarParticipacionComunitaria(id) : alert('No se pudo guardar la habitabilidad')
      }
    );
  }

  guardarParticipacionComunitaria(id : number){
    this.participacionComunitaria.aspectoEconomicoId = id;
    this.participacionComunitariaService.add(this.participacionComunitaria).subscribe(
      participacion => {
        participacion != null ? console.log('Se guardo participacion comunitaria') : console.log('No se guardo participacion');
      }
    );
  }

  guardarAlmacenamientoAgua(productorId : string){
    this.almacenamientoAgua.productorId = productorId;
    this.almacenamientoSevice.add(this.almacenamientoAgua).subscribe(
      almacenamientoAgua => {
        almacenamientoAgua != null ?
        Swal.fire(
          'Accion sastifactoria!',
          'Para saltar esto pulse ok!',
          'success'
        ) 
        :
        Swal.fire(
          'Accion incorrecta!',
          'Para saltar esto pulse ok!',
          'error'
        )
      }
    );
  }
  
  onReset() {
    this.submitted = false;
    this.firstFormGroup.reset();
  }

  fechaNum(num : number) : string{
    if(num < 10){ return '0'+num; }else{ return num+'' }
  }

}
