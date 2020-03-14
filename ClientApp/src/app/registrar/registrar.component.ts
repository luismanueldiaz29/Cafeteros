import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  asistente : string;
  tradicional : string;
  organizacion : string;
  selectServicioSanitario : string;
  imports : [MaterialModule];
  

  constructor() { }

  ngOnInit() {
  }

  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  addFieldValue() {
      this.fieldArray.push(this.newAttribute)
      this.newAttribute = {};
  }

  deleteFieldValue(index) {
      this.fieldArray.splice(index, 1);
  }

}
