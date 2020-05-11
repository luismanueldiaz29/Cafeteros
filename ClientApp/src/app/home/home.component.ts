import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material';
import { Route } from '@angular/compiler/src/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  imports : [MaterialModule];

  constructor(private router : Router){}

  ngOnInit(){
  //   if(sessionStorage.getItem('User')==null){
  //     Swal.fire(
  //       'Accion incorrecta!',
  //       'Para saltar esto pulse ok!',
  //       'error'
  //     )
  //     this.router.navigate(['/']);
  //   }  
  }

}
