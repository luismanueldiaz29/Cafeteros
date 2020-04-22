import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../services/empleado.service';
import { Empleado } from '../Models/Empleado';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TecnicoService } from '../services/tecnico.service';
import { MesaDirectivaService } from '../services/mesaDirectiva.service';
import { MesaDirectiva } from '../Models/MesaDirectiva';
import { Tecnico } from '../Models/Tecnico';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface login{
  Usuario : string;
  Password : string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  private mesaDirectivas : MesaDirectiva[];
  private tecnicos : Tecnico[];
  private formGroup : FormGroup;
  private login : login;
  acceso : number;
  submitted = false;

  constructor(
    private _Router : Router,
    private _formBuilder: FormBuilder, //para formulario reactivo
    private tecnicoService : TecnicoService,
    private mesaDirectivaService : MesaDirectivaService
  ) { }

  ngOnInit() {
    this.validarFromgroup();
    this.getAll();
    this.login = {Usuario : "", Password : ""}
  }

  getAll(){
    this.mesaDirectivaService.getAll().subscribe(
      mesadirectivas => {
        this.mesaDirectivas = mesadirectivas
      }
    );
    this.tecnicoService.getAll().subscribe(
      tecnicos => {
        this.tecnicos = tecnicos
      }
    );
  }

  validarFromgroup(){
    this.formGroup = this._formBuilder.group({
      Usuario : ['', Validators.required],
      Password : ['', Validators.required]
    });
  }

  get f() {return this.formGroup.controls}

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formGroup.invalid) {
      return;
    }
    this.acceder();
  }

  validarMesaDirectiva(){
    this.mesaDirectivaService.get(this.login.Usuario).subscribe(
      mesa => {
        if(mesa != null){ 
          //si es  distinto a nul quiere decir que el usuario que se esta logeando
          //es de la mesa direcctiva
          if(mesa.contraseña == this.login.Password){
            this._Router.navigate(['/Home']);
            sessionStorage.setItem('User' , 'Mes');
          }else{
            this.acceso++;
            console.log('usuario de mesa directiva, la contraceña de no coincide con '+mesa.correo);
          }
        }else{
          //si es igual a null quiere decir que el usuario ingresado no pertenece a la mesa direcctiva
          this.acceso++;
          console.log('usuario no pertenece a la mesa directiva');
        }
      }
    );
  }

  ValidarTecnico(){
    this.tecnicoService.get(this.login.Usuario).subscribe(
      tecnico => {
        if(tecnico != null){ 
          //si es  distinto a nul quiere decir que el usuario que se esta logeando
          //es un tecnico
          if(tecnico.contraseña == this.login.Password){
            this._Router.navigate(['/Home']);
            sessionStorage.setItem("User" , "Tec");
          }else{
            this.acceso++
            console.log('usuario de mesa directiva, la contraceña de no coincide con '+tecnico.correo);
          }
        }else{
          //si es igual a null quiere decir que el usuario ingresado no es tecnico
          this.acceso++;
          console.log('usuario no es tecnico');
        }
      }
    );
  }

  acceder(){
    //valido si es de la mesa directiva
    this.validarMesaDirectiva();
    //valido si es tecnico
    this.ValidarTecnico();
    //envio un mensaje
    this.mensaje();
  }

  mensaje(){
    if(this.acceso == 2){
      Swal.fire(
        'Accion incorrecta!',
        'Para saltar esto pulse ok!',
        'error'
      )
    }
  }
}
