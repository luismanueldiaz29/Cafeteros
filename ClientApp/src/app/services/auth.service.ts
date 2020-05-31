import { Injectable, Inject } from '@angular/core';
import { MesaDirectivaService } from './mesaDirectiva.service';
import { TecnicoService } from './tecnico.service';
import { Router } from '@angular/router';
import { MesaDirectiva } from '../Models/MesaDirectiva';
import { Tecnico } from '../Models/Tecnico';
import { Observable, of } from 'rxjs';
import { LoginUser } from '../Models/LoginUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private mesa :MesaDirectiva;
  private tecnico : Tecnico;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private _Router : Router
  ) { }

  // Login(usuario : string, Password : string){
  //   this.tecnico = null;
  //   this.mesa = null;
  //   this.ValidarTecnico(usuario, Password);
  //   this.validarMesaDirectiva(usuario, Password);
  //   if(this.tecnico != null){
  //     alert('not tecnico')
  //     this._Router.navigate(['/Home']);
  //   }
  //   if(this.mesa != null){
  //     alert('not mesa')
  //     this._Router.navigate(['/Home']);
  //   }
  // }

  // private validarMesaDirectiva(Usuario : string, Password : string){
  //   this.mesaDirectivaService.get(Usuario).subscribe(
  //     mesa => {
  //       if(mesa != null){
  //         this.mesa = mesa;
  //         //si es  distinto a nul quiere decir que el usuario que se esta logeando
  //         //es de la mesa direcctiva
  //         if(mesa.contraseña == Password){

  //           sessionStorage.setItem('User' , 'Mes');
  //           sessionStorage.setItem('Id', mesa.correo);this.mesa = mesa;
  //           // this._Router.navigate(['/Home']);
  //         }else{
  //           console.log('usuario de mesa directiva, la contraceña de no coincide con '+mesa.correo);
  //         }
  //       }else{
  //         //si es igual a null quiere decir que el usuario ingresado no pertenece a la mesa direcctiva
  //         console.log('usuario no pertenece a la mesa directiva');
  //       }
  //     }
  //   );
  // }

  // private ValidarTecnico(Usuario: string, Password : string){
  //   this.tecnicoService.get(Usuario).subscribe(
  //     tecnico => {
  //       if(tecnico != null){
  //         this.tecnico = tecnico;
  //         //si es  distinto a nul quiere decir que el usuario que se esta logeando
  //         //es un tecnico
  //         if(tecnico.contraseña == Password){

  //           sessionStorage.setItem("User" , "Tec");
  //           sessionStorage.setItem("Id", tecnico.correo);this.tecnico = tecnico;
  //           //this._Router.navigate(['/Home']);
  //         }else{
  //           console.log('usuario de mesa directiva, la contraceña de no coincide con '+tecnico.correo);
  //         }
  //       }else{
  //         //si es igual a null quiere decir que el usuario ingresado no es tecnico
  //         console.log('usuario no es tecnico');
  //       }
  //     }
  //   );
  // }

    /** POST: add a new LoginUser to the server */
    Login(LoginUser: LoginUser): Observable<LoginUser> {
      return this.http.post<LoginUser>(this.baseUrl + 'api/LoginUser', LoginUser, httpOptions).pipe(
        tap((newLoginUser: LoginUser) => this.log(`added newLoginUser w/ id=${newLoginUser.id}`)),
        catchError(this.handleError<LoginUser>('addLoginUser'))
      );
    }

  public authLogin() : boolean{
    return sessionStorage.getItem('User') != null
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
    // this.messageService.add(`HeroService: ${message}`);
  }
}
