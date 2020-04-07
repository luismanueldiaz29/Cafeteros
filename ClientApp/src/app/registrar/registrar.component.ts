import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material';
import Swal from 'sweetalert2'
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

  //formGroup
  firstFormGroup: FormGroup;
  secondFormGroup : FormGroup;


  constructor(
    private _formBuilder: FormBuilder, //para formulario reactivo
    private productorService : ProductorService,
    private familiarService : FamiliarService,
    private aspectoEconomicoService : AspectoEconomicoService,
    private habitabilidadService : HabitabilidadService,
    private participacionComunitariaService : PaticipacionComunitariaService
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
    this.productorService.add(this.productor).subscribe(
      productor => {
        productor != null ?
          this.GuardarFamiliar(productor.id)
         : alert('No se pudo guardar el productor')
      }
    );
  }

  incializarVariables(){
    this.productor = {id : "",nombre : "",codigoCafetero : "",nombrePredio : "",codigoSica : "",municipio : "",vereda : "",NumeroTelefono : "",AfiliacionSalud : "",ActvidadesDedican : ""};
    //this.familiar = {id : null,Nombre : "",NumeroDocumento : "",FechaNacimiento : "",Parentesco : "",TipoPoblacion : "",AfiliacionSalud : "",NivelEducativo : "",ProductorId : ""};
    this.aspectoEconomico = {id : 0, TenenciaTierra : "",Legalidad : "",ProductorId : ""}
    this.participacionComunitaria = {id : 0, AsistenteAsamblea : "",CargoAsamblea : "",AistenteTrabajos : "",CargoTrabajo : "",OrganizacionAparte : "",CualOrganizacion : "",AspectoEconomicoId : 0}
    this.habitabilidad = {id : 0,TipoVivienda : "",NumeroHabitaciones : 0,MaterialPredominante : "",MaterialTecho : "",MaterialCosinar : "",EnergiaCosinar : "",ServicioSanitario : "",TipoAlumbrado : "",AspectoEconomicoId : 0}
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
    }catch(error){
      Swal.fire(
        'Accion incorrecta!',
        'Para saltar esto pulse ok!',
        'error'
      )
    }
  }

  GuardarAspectoEconomico(id : string){
    this.aspectoEconomico.ProductorId =  id;
    this.aspectoEconomicoService.add(this.aspectoEconomico).subscribe(
      aspectoEco => {
        aspectoEco != null ? this.guardarHabitabilidad(aspectoEco.id) : alert('No se pudo guardar aspecto economico')
      }
    );
  }

  guardarHabitabilidad(id : number){
    this.habitabilidad.AspectoEconomicoId = id;
    this.habitabilidadService.add(this.habitabilidad).subscribe(
      habitabilidad => {
        habitabilidad != null ? this.guardarParticipacionComunitaria(id) : alert('No se pudo guardar la habitabilidad')
      }
    );
  }

  guardarParticipacionComunitaria(id : number){
    this.participacionComunitaria.AspectoEconomicoId = id;
    this.participacionComunitariaService.add(this.participacionComunitaria).subscribe(
      participacion => {
        participacion != null ? Swal.fire(
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
}
