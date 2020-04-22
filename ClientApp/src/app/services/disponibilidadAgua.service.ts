import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DisponibilidadAgua } from '../Models/DisponibilidadAgua';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadAguaService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  /** POST: add a new DisponibilidadAgua to the server */
  add(DisponibilidadAgua: DisponibilidadAgua): Observable<DisponibilidadAgua> {

    return this.http.post<DisponibilidadAgua>(this.baseUrl + 'api/DisponibilidadAgua', DisponibilidadAgua, httpOptions).pipe(
      tap((newDisponibilidadAgua: DisponibilidadAgua) => this.log(`added newDisponibilidadAgua w/ id=${newDisponibilidadAgua.id}`)),
      catchError(this.handleError<DisponibilidadAgua>('addDisponibilidadAgua'))
    );
  }

   /** GET heroes from the server */
  getAll(): Observable<DisponibilidadAgua[]> {
    return this.http.get<DisponibilidadAgua[]>(this.baseUrl + 'api/DisponibilidadAgua')
      .pipe(
        tap(_ => this.log('fetched DisponibilidadAgua')),
        catchError(this.handleError<DisponibilidadAgua[]>('getDisponibilidadAgua', []))
      );
  }

  get(id: number): Observable<DisponibilidadAgua> {
    const url = `${this.baseUrl + 'api/DisponibilidadAgua'}/${id}`;
    return this.http.get<DisponibilidadAgua>(url).pipe(
      tap(_ => this.log(`fetched DisponibilidadAgua id=${id}`)),
      catchError(this.handleError<DisponibilidadAgua>(`DisponibilidadAgua id=${id}`))
    );
  }

  getAllDisponibilidadAguaProdId(id: string): Observable<DisponibilidadAgua[]> {
    const url = `${this.baseUrl + 'api/DisponibilidadAgua/Productor'}/${id}`;
    return this.http.get<DisponibilidadAgua[]>(url).pipe(
      tap(_ => this.log(`fetched DisponibilidadAgua id=${id}`)),
      catchError(this.handleError<DisponibilidadAgua[]>(`DisponibilidadAgua id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  update (DisponibilidadAgua: DisponibilidadAgua): Observable<any> {
    const url = `${this.baseUrl + 'api/DisponibilidadAgua'}/${DisponibilidadAgua.id}`;
    return this.http.put(url, DisponibilidadAgua, httpOptions).pipe(
      tap(_ => this.log(`updated DisponibilidadAgua id=${DisponibilidadAgua.id}`)),
      catchError(this.handleError<any>('DisponibilidadAgua'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete (DisponibilidadAgua: DisponibilidadAgua | number): Observable<DisponibilidadAgua> {
    const id = typeof DisponibilidadAgua === 'number' ? DisponibilidadAgua : DisponibilidadAgua.id;
    const url = `${this.baseUrl + 'api/DisponibilidadAgua'}/${id}`;

    return this.http.delete<DisponibilidadAgua>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted DisponibilidadAgua id=${id}`)),
      catchError(this.handleError<DisponibilidadAgua>('deleteDisponibilidadAgua'))
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
