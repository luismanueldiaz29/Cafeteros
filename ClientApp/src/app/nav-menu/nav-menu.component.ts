import { Component } from '@angular/core';
import { MaterialModule } from '../material/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent  {
  imports : [MaterialModule];

  constructor(private router : Router){  }

  Salir(){
    this.router.navigate(['/']);
  }

}
