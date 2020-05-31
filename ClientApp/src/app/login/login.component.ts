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
import { AuthService } from '../services/auth.service';
import { LoginUser } from '../Models/LoginUser';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private mesaDirectivas : MesaDirectiva[];
  private tecnicos : Tecnico[];
  formGroup : FormGroup;
  //login : login;
  login : LoginUser;
  accesoTecnico : boolean;
  accesoMesa : boolean;
  submitted = false;

  constructor(
    private _Router : Router,
    private _formBuilder: FormBuilder, //para formulario reactivo
    private tecnicoService : TecnicoService,
    private mesaDirectivaService : MesaDirectivaService,
    private authService :AuthService
  ) { }

  ngOnInit() {
    this.validarFromgroup();
    this.getAll();
    this.login = {id : "", user : "", Password : ""}
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



  acceder(){
    this.authService.Login(this.login).subscribe(
      loginUser =>{
        if(loginUser != null){
          sessionStorage.setItem("User" , loginUser.user);
          sessionStorage.setItem("Id", loginUser.id);
          this._Router.navigate(['/Home']);
          Swal.fire(
            'Bienvenido!',
            'Para saltar esto pulse ok!',
            'success'
          )
        }else{
          Swal.fire(
            'Accion incorrecta!',
            'Para saltar esto pulse ok!',
            'error'
          )
        }
      }
    );
  }

  mensaje(){
    if(!this.authService.authLogin()){
      Swal.fire(
        'Accion incorrecta!',
        'Para saltar esto pulse ok!',
        'error'
      )
    }else{
      alert('accesos ')
      this._Router.navigate(['/Home']);
    }
  }
}
