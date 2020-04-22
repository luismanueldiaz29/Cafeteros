import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MesaDirectiva } from '../Models/MesaDirectiva';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MesaDirectivaService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  /** POST: add a new MesaDirectiva to the server */
  add(MesaDirectiva: MesaDirectiva): Observable<MesaDirectiva> {
    return this.http.post<MesaDirectiva>(this.baseUrl + 'api/MesaDirectiva', MesaDirectiva, httpOptions).pipe(
      tap((newMesaDirectiva: MesaDirectiva) => this.log(`added newMesaDirectiva w/ id=${newMesaDirectiva.correo}`)),
      catchError(this.handleError<MesaDirectiva>('addMesaDirectiva'))
    );
  }

   /** GET heroes from the server */
  getAll(): Observable<MesaDirectiva[]> {
    return this.http.get<MesaDirectiva[]>(this.baseUrl + 'api/MesaDirectiva')
      .pipe(
        tap(_ => this.log('fetched MesaDirectiva')),
        catchError(this.handleError<MesaDirectiva[]>('getMesaDirectiva', []))
      );
  }


  get(id: string): Observable<MesaDirectiva> {
    const url = `${this.baseUrl + 'api/MesaDirectiva'}/${id}`;
    return this.http.get<MesaDirectiva>(url).pipe(
      tap(_ => this.log(`fetched MesaDirectiva id=${id}`)),
      catchError(this.handleError<MesaDirectiva>(`MesaDirectiva id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  update (MesaDirectiva: MesaDirectiva): Observable<any> {
    const url = `${this.baseUrl + 'api/MesaDirectiva'}/${MesaDirectiva.correo}`;
    return this.http.put(url, MesaDirectiva, httpOptions).pipe(
      tap(_ => this.log(`updated MesaDirectiva id=${MesaDirectiva.correo}`)),
      catchError(this.handleError<any>('MesaDirectiva'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete (MesaDirectiva: MesaDirectiva | number): Observable<MesaDirectiva> {
    const id = typeof MesaDirectiva === 'number' ? MesaDirectiva : MesaDirectiva.correo;
    const url = `${this.baseUrl + 'api/MesaDirectiva'}/${id}`;

    return this.http.delete<MesaDirectiva>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted MesaDirectiva id=${id}`)),
      catchError(this.handleError<MesaDirectiva>('deleteMesaDirectiva'))
    );
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
