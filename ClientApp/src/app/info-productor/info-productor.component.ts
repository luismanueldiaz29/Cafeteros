import { Component, OnInit } from '@angular/core';
import { Productor } from '../Models/Productor';
import { ProductorService } from '../services/productor.service';
import { Router } from '@angular/router';
import { FamiliarService } from '../services/familiar.service';
import { Familiar } from '../Models/Familiar';

@Component({
  selector: 'app-info-productor',
  templateUrl: './info-productor.component.html',
  styleUrls: ['./info-productor.component.css']
})
export class InfoProductorComponent implements OnInit {

  productor : Productor;
  private familiares : Familiar[];
  private id : string;
  constructor(
    private productorService : ProductorService,
    private _router : Router,
    private familiarService : FamiliarService
  ) { }

  ngOnInit() {
    this.getProductor();
    
  }

  getFamiliar(id: string){
    this.familiarService.getAllFamiliarProdId(id).subscribe(
      familiar => {
        if(familiar != null)
        this.familiares = familiar;
        sessionStorage.removeItem('productorId');
      }
    );
  }

  getProductor(){
    this.id = sessionStorage.getItem('productorId');
    if(this.id != null){
      this.productorService.get(this.id).subscribe(
        productor => {
          if(productor != null)
          this.getFamiliar(productor.id);
          this.productor = productor;
          sessionStorage.removeItem('productorId');
        }
      );
    }else{
      this.volver();
    }
  }

  volver(){
    this._router.navigate(['/List-Productor']);
  }
}
