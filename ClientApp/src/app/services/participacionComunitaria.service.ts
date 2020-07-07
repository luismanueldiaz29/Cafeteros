import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PaticipacionComunitaria } from '../Models/PaticipacionComunitaria';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PaticipacionComunitariaService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  /** POST: add a new PaticipacionComunitaria to the server */
  add(PaticipacionComunitaria: PaticipacionComunitaria): Observable<PaticipacionComunitaria> {

    return this.http.post<PaticipacionComunitaria>(this.baseUrl + 'api/PaticipacionComunitaria', PaticipacionComunitaria, httpOptions).pipe(
      tap((newPaticipacionComunitaria: PaticipacionComunitaria) => this.log(`added newPaticipacionComunitaria w/ id=${newPaticipacionComunitaria.id}`)),
      catchError(this.handleError<PaticipacionComunitaria>('addPaticipacionComunitaria'))
    );
  }

   /** GET heroes from the server */
  getAll(): Observable<PaticipacionComunitaria[]> {
    return this.http.get<PaticipacionComunitaria[]>(this.baseUrl + 'api/PaticipacionComunitaria')
      .pipe(
        tap(_ => this.log('fetched PaticipacionComunitaria')),
        catchError(this.handleError<PaticipacionComunitaria[]>('getPaticipacionComunitaria', []))
      );
  }

  get(id: number): Observable<PaticipacionComunitaria> {
    const url = `${this.baseUrl + 'api/PaticipacionComunitaria'}/${id}`;
    return this.http.get<PaticipacionComunitaria>(url).pipe(
      tap(_ => this.log(`fetched PaticipacionComunitaria id=${id}`)),
      catchError(this.handleError<PaticipacionComunitaria>(`PaticipacionComunitaria id=${id}`))
    );
  }

  getPartiAspEconomico(id: number): Observable<PaticipacionComunitaria> {
    const url = `${this.baseUrl + 'api/PaticipacionComunitaria/AspectoEconomico'}/${id}`;
    return this.http.get<PaticipacionComunitaria>(url).pipe(
      tap(_ => this.log(`fetched PaticipacionComunitaria id=${id}`)),
      catchError(this.handleError<PaticipacionComunitaria>(`PaticipacionComunitaria id=${id}`))
    );
  }
  /** PUT: update the hero on the server */
  update (PaticipacionComunitaria: PaticipacionComunitaria): Observable<any> {
    const url = `${this.baseUrl + 'api/PaticipacionComunitaria'}/${PaticipacionComunitaria.id}`;
    return this.http.put(url, PaticipacionComunitaria, httpOptions).pipe(
      tap(_ => this.log(`updated PaticipacionComunitaria id=${PaticipacionComunitaria.id}`)),
      catchError(this.handleError<any>('PaticipacionComunitaria'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete (PaticipacionComunitaria: PaticipacionComunitaria | number): Observable<PaticipacionComunitaria> {
    const id = typeof PaticipacionComunitaria === 'number' ? PaticipacionComunitaria : PaticipacionComunitaria.id;
    const url = `${this.baseUrl + 'api/PaticipacionComunitaria'}/${id}`;

    return this.http.delete<PaticipacionComunitaria>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted PaticipacionComunitaria id=${id}`)),
      catchError(this.handleError<PaticipacionComunitaria>('deletePaticipacionComunitaria'))
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
