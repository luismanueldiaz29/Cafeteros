import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AlmacenamientoAgua } from '../Models/AlmacenamientoAgua';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AlmacenamientoAguaService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  /** POST: add a new AlmacenamientoAgua to the server */
  add(AlmacenamientoAgua: AlmacenamientoAgua): Observable<AlmacenamientoAgua> {

    return this.http.post<AlmacenamientoAgua>(this.baseUrl + 'api/AlmacenamientoAgua', AlmacenamientoAgua, httpOptions).pipe(
      tap((newAlmacenamientoAgua: AlmacenamientoAgua) => this.log(`added newAlmacenamientoAgua w/ id=${newAlmacenamientoAgua.id}`)),
      catchError(this.handleError<AlmacenamientoAgua>('addAlmacenamientoAgua'))
    );
  }

   /** GET heroes from the server */
  getAll(): Observable<AlmacenamientoAgua[]> {
    return this.http.get<AlmacenamientoAgua[]>(this.baseUrl + 'api/AlmacenamientoAgua')
      .pipe(
        tap(_ => this.log('fetched AlmacenamientoAgua')),
        catchError(this.handleError<AlmacenamientoAgua[]>('getAlmacenamientoAgua', []))
      );
  }

  get(id: number): Observable<AlmacenamientoAgua> {
    const url = `${this.baseUrl + 'api/AlmacenamientoAgua'}/${id}`;
    return this.http.get<AlmacenamientoAgua>(url).pipe(
      tap(_ => this.log(`fetched AlmacenamientoAgua id=${id}`)),
      catchError(this.handleError<AlmacenamientoAgua>(`AlmacenamientoAgua id=${id}`))
    );
  }

  getAllAlmacenamientoAguaProdId(id: string): Observable<AlmacenamientoAgua> {
    const url = `${this.baseUrl + 'api/AlmacenamientoAgua/Productor'}/${id}`;
    return this.http.get<AlmacenamientoAgua>(url).pipe(
      tap(_ => this.log(`fetched AlmacenamientoAgua id=${id}`)),
      catchError(this.handleError<AlmacenamientoAgua>(`AlmacenamientoAgua id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  update (AlmacenamientoAgua: AlmacenamientoAgua): Observable<any> {
    const url = `${this.baseUrl + 'api/AlmacenamientoAgua'}/${AlmacenamientoAgua.id}`;
    return this.http.put(url, AlmacenamientoAgua, httpOptions).pipe(
      tap(_ => this.log(`updated AlmacenamientoAgua id=${AlmacenamientoAgua.id}`)),
      catchError(this.handleError<any>('AlmacenamientoAgua'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete (AlmacenamientoAgua: AlmacenamientoAgua | number): Observable<AlmacenamientoAgua> {
    const id = typeof AlmacenamientoAgua === 'number' ? AlmacenamientoAgua : AlmacenamientoAgua.id;
    const url = `${this.baseUrl + 'api/AlmacenamientoAgua'}/${id}`;

    return this.http.delete<AlmacenamientoAgua>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted AlmacenamientoAgua id=${id}`)),
      catchError(this.handleError<AlmacenamientoAgua>('deleteAlmacenamientoAgua'))
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
