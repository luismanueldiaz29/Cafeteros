import { Component } from '@angular/core';
import { MaterialModule } from '../material/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  imports : [MaterialModule];
}
