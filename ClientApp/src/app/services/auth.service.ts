import { Injectable, Inject } from '@angular/core';
import { MesaDirectivaService } from './mesaDirectiva.service';
import { TecnicoService } from './tecnico.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private acceso : boolean;
  
  // constructor(
  //   private mesaDirectivaService : MesaDirectivaService,
  //   private tecnicoService : TecnicoService,
  //   private _Router : Router
  // ) { }

  // private validarMesaDirectiva( usuario : string, contraceña : string) : boolean{
  //   this.mesaDirectivaService.get(usuario).subscribe(
  //     mesa => {
  //       if(mesa != null){ 
  //         //si es  distinto a nul quiere decir que el usuario que se esta logeando
  //         //es de la mesa direcctiva
  //         if(mesa.contraseña == contraceña){
  //           this.acceso = true;
  //           sessionStorage.setItem('User' , 'Mes');
  //           sessionStorage.setItem('Id', mesa.contraseña); 
  //           return true;
  //         }else{
  //           return false
  //           console.log('usuario de mesa directiva, la contraceña de no coincide con '+mesa.correo);
  //         }
  //       }else{
  //         return false
  //         //si es igual a null quiere decir que el usuario ingresado no pertenece a la mesa direcctiva
  //         console.log('usuario no pertenece a la mesa directiva');
  //       }
  //     }
  //   );
  //   alert('login mesa')
  //   return false;
  // }

  // private ValidarTecnico(usuario : string, contraceña : string) : boolean{
  //   this.tecnicoService.get(usuario).subscribe(
  //     tecnico => {
  //       if(tecnico != null){ 
  //         //si es  distinto a nul quiere decir que el usuario que se esta logeando
  //         //es un tecnico
  //         if(tecnico.contraseña == contraceña){
  //           this.acceso = true;
  //           sessionStorage.setItem("User" , "Tec");
  //           sessionStorage.setItem("Id", tecnico.correo);
  //           return true;
  //         }else{
  //           return false;
  //           console.log('usuario de mesa directiva, la contraceña de no coincide con '+tecnico.correo);
  //         }
  //       }else{
  //         return false
  //       }
  //     });
  //   alert('login tecnico');
  //   return false;
  // }

  // acceder(usuario : string, constraseña : string){
  //   //valido si es de la mesa directiva
  //   if(this.validarMesaDirectiva(usuario, constraseña) == true && this.ValidarTecnico(usuario, constraseña) == false){
  //     alert("no correcto")
  //   }else{
  //     alert('correcto')
  //   }
  //   //valido si es tecnico
    
  //   //envio un mensaje
  //   //this.mensaje();
    
  // }

  // mensaje(){
  //   if(this.acceso){

  //   }else{
  //     alert('accesos '+this.acceso)
  //     this._Router.navigate(['/Home']);
  //   }
  // }

}
