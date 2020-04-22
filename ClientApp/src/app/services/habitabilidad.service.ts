import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Habitabilidad } from '../Models/Habitabilidad';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HabitabilidadService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  /** POST: add a new Habitabilidad to the server */
  add(Habitabilidad: Habitabilidad): Observable<Habitabilidad> {

    return this.http.post<Habitabilidad>(this.baseUrl + 'api/Habitabilidad', Habitabilidad, httpOptions).pipe(
      tap((newHabitabilidad: Habitabilidad) => this.log(`added newHabitabilidad w/ id=${newHabitabilidad.id}`)),
      catchError(this.handleError<Habitabilidad>('addHabitabilidad'))
    );
  }

   /** GET heroes from the server */
  getAll(): Observable<Habitabilidad[]> {
    return this.http.get<Habitabilidad[]>(this.baseUrl + 'api/Habitabilidad')
      .pipe(
        tap(_ => this.log('fetched Habitabilidad')),
        catchError(this.handleError<Habitabilidad[]>('getHabitabilidad', []))
      );
  }

  get(id: number): Observable<Habitabilidad> {
    const url = `${this.baseUrl + 'api/Habitabilidad'}/${id}`;
    return this.http.get<Habitabilidad>(url).pipe(
      tap(_ => this.log(`fetched Habitabilidad id=${id}`)),
      catchError(this.handleError<Habitabilidad>(`Habitabilidad id=${id}`))
    );
  }

  getHabitabilidadAspecto(id: number): Observable<Habitabilidad> {
    const url = `${this.baseUrl + 'api/Habitabilidad/AspectoEconomico'}/${id}`;
    return this.http.get<Habitabilidad>(url).pipe(
      tap(_ => this.log(`fetched Habitabilidad id=${id}`)),
      catchError(this.handleError<Habitabilidad>(`Habitabilidad id=${id}`))
    );
  }
  /** PUT: update the hero on the server */
  update (Habitabilidad: Habitabilidad): Observable<any> {
    const url = `${this.baseUrl + 'api/Habitabilidad'}/${Habitabilidad.id}`;
    return this.http.put(url, Habitabilidad, httpOptions).pipe(
      tap(_ => this.log(`updated Habitabilidad id=${Habitabilidad.id}`)),
      catchError(this.handleError<any>('Habitabilidad'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete (Habitabilidad: Habitabilidad | number): Observable<Habitabilidad> {
    const id = typeof Habitabilidad === 'number' ? Habitabilidad : Habitabilidad.id;
    const url = `${this.baseUrl + 'api/Habitabilidad'}/${id}`;

    return this.http.delete<Habitabilidad>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Habitabilidad id=${id}`)),
      catchError(this.handleError<Habitabilidad>('deleteHabitabilidad'))
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
