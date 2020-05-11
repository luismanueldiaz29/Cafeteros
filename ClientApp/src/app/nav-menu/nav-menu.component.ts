import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{
  imports : [MaterialModule];
  private rol : string;
  constructor(private router : Router){  }

  ngOnInit(){
    this.rol = sessionStorage.getItem('User');
  }

  Salir(){
    sessionStorage.removeItem('User');
    sessionStorage.removeItem('Id')
    this.router.navigate(['/']);
  }

}
