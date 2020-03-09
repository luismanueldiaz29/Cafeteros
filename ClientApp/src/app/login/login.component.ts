import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../services/empleado.service';
import { Empleado } from '../Models/Empleado';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Empleados : Empleado[];

  constructor(
    private empleadoService : EmpleadoService
  ) { }

  ngOnInit() {
    
  }

  getAll(){
    this.empleadoService.getAll().subscribe(
      empleados => {
        this.Empleados = empleados
      }
    );
  }

}
