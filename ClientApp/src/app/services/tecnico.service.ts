import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Tecnico } from '../Models/Tecnico';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  /** POST: add a new Tecnico to the server */
  add(Tecnico: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(this.baseUrl + 'api/Tecnico', Tecnico, httpOptions).pipe(
      tap((newTecnico: Tecnico) => this.log(`added newTecnico w/ id=${newTecnico.correo}`)),
      catchError(this.handleError<Tecnico>('addTecnico'))
    );
  }

   /** GET heroes from the server */
  getAll(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(this.baseUrl + 'api/Tecnico')
      .pipe(
        tap(_ => this.log('fetched Tecnico')),
        catchError(this.handleError<Tecnico[]>('getTecnico', []))
      );
  }
  /** este metodo me retorna todos los Tecnicoes de los productores */
  getAllTecnicoProdId(id: string): Observable<Tecnico[]> {
    const url = `${this.baseUrl + 'api/Tecnico/Productor'}/${id}`;
    return this.http.get<Tecnico[]>(url).pipe(
      tap(_ => this.log(`fetched Tecnico id=${id}`)),
      catchError(this.handleError<Tecnico[]>(`Tecnico id=${id}`))
    );
  }

  get(id: string): Observable<Tecnico> {
    const url = `${this.baseUrl + 'api/Tecnico'}/${id}`;
    return this.http.get<Tecnico>(url).pipe(
      tap(_ => this.log(`fetched Tecnico id=${id}`)),
      catchError(this.handleError<Tecnico>(`Tecnico id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  update (Tecnico: Tecnico): Observable<any> {
    const url = `${this.baseUrl + 'api/Tecnico'}/${Tecnico.correo}`;
    return this.http.put(url, Tecnico, httpOptions).pipe(
      tap(_ => this.log(`updated Tecnico id=${Tecnico.correo}`)),
      catchError(this.handleError<any>('Tecnico'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete (Tecnico: Tecnico | number): Observable<Tecnico> {
    const id = typeof Tecnico === 'number' ? Tecnico : Tecnico.correo;
    const url = `${this.baseUrl + 'api/Tecnico'}/${id}`;

    return this.http.delete<Tecnico>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Tecnico id=${id}`)),
      catchError(this.handleError<Tecnico>('deleteTecnico'))
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
