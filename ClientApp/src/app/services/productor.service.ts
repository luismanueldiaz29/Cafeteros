import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Productor } from '../Models/Productor';
import Swal from 'sweetalert2'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductorService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  /** POST: add a new Productor to the server */
  add(Productor: Productor): Observable<Productor> {

    return this.http.post<Productor>(this.baseUrl + 'api/Productor', Productor, httpOptions).pipe(
      tap((newProductor: Productor) => this.log(`added newProductor w/ id=${newProductor.id}`)),
      catchError(this.handleError<Productor>('addProductor'))
    );
  }

   /** GET heroes from the server */
  getAll(): Observable<Productor[]> {
    return this.http.get<Productor[]>(this.baseUrl + 'api/Productor')
      .pipe(
        tap(_ => this.log('fetched Productor')),
        catchError(this.handleError<Productor[]>('getProductor', []))
      );
  }

  getAllEstado(estado : boolean): Observable<Productor[]> {
      const url = `${this.baseUrl + 'api/Productor/Estado'}/${estado}`
     return this.http.get<Productor[]>(url)
      .pipe(
        tap(_ => this.log('fetched Productor')),
        catchError(this.handleError<Productor[]>('getProductor', []))
      );
  }


  get(id: string): Observable<Productor> {
    const url = `${this.baseUrl + 'api/Productor'}/${id}`;
    return this.http.get<Productor>(url).pipe(
      tap(_ => this.log(`fetched Productor id=${id}`)),
      catchError(this.handleError<Productor>(`Productor id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  update (Productor: Productor): Observable<any> {
    const url = `${this.baseUrl + 'api/Productor'}/${Productor.id}`;
    return this.http.put(url, Productor, httpOptions).pipe(
      tap(_ => this.log(`updated Productor id=${Productor.id}`)),
      catchError(this.handleError<any>('Productor'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete (Productor: Productor | number): Observable<Productor> {
    const id = typeof Productor === 'number' ? Productor : Productor.id;
    const url = `${this.baseUrl + 'api/Productor'}/${id}`;

    return this.http.delete<Productor>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Productor id=${id}`)),
      catchError(this.handleError<Productor>('deleteProductor'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      Swal.fire(
        'Accion incorrecta!',
        error,
        'error'
      ) // log to console instead

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
