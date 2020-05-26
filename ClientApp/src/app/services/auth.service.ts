import { Injectable, Inject } from '@angular/core';
import { MesaDirectivaService } from './mesaDirectiva.service';
import { TecnicoService } from './tecnico.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private mesaDirectivaService : MesaDirectivaService,
    private tecnicoService : TecnicoService,
    private _Router : Router
  ) { }

  

}
