import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ResultadoEvaluacion } from '../Models/ResultadoEvaluacion';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ResultadoEvaluacionService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  /** POST: add a new ResultadoEvaluacion to the server */
  add(ResultadoEvaluacion: ResultadoEvaluacion): Observable<ResultadoEvaluacion> {
    return this.http.post<ResultadoEvaluacion>(this.baseUrl + 'api/ResultadoEvaluacion', ResultadoEvaluacion, httpOptions).pipe(
      tap((newResultadoEvaluacion: ResultadoEvaluacion) => this.log(`added newResultadoEvaluacion w/ id=${newResultadoEvaluacion.id}`)),
      catchError(this.handleError<ResultadoEvaluacion>('addResultadoEvaluacion'))
    );
  }

   /** GET heroes from the server */
  getAll(): Observable<ResultadoEvaluacion[]> {
    return this.http.get<ResultadoEvaluacion[]>(this.baseUrl + 'api/ResultadoEvaluacion')
      .pipe(
        tap(_ => this.log('fetched ResultadoEvaluacion')),
        catchError(this.handleError<ResultadoEvaluacion[]>('getResultadoEvaluacion', []))
      );
  }
  /** este metodo me retorna todos los ResultadoEvaluaciones de los productores */
  getAllResultadoEvaluacionProdId(id: string): Observable<ResultadoEvaluacion[]> {
    const url = `${this.baseUrl + 'api/ResultadoEvaluacion/Productor'}/${id}`;
    return this.http.get<ResultadoEvaluacion[]>(url).pipe(
      tap(_ => this.log(`fetched ResultadoEvaluacion id=${id}`)),
      catchError(this.handleError<ResultadoEvaluacion[]>(`ResultadoEvaluacion id=${id}`))
    );
  }

  get(id: string): Observable<ResultadoEvaluacion> {
    const url = `${this.baseUrl + 'api/ResultadoEvaluacion'}/${id}`;
    return this.http.get<ResultadoEvaluacion>(url).pipe(
      tap(_ => this.log(`fetched ResultadoEvaluacion id=${id}`)),
      catchError(this.handleError<ResultadoEvaluacion>(`ResultadoEvaluacion id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  update (ResultadoEvaluacion: ResultadoEvaluacion): Observable<any> {
    const url = `${this.baseUrl + 'api/ResultadoEvaluacion'}/${ResultadoEvaluacion.id}`;
    return this.http.put(url, ResultadoEvaluacion, httpOptions).pipe(
      tap(_ => this.log(`updated ResultadoEvaluacion id=${ResultadoEvaluacion.id}`)),
      catchError(this.handleError<any>('ResultadoEvaluacion'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete (ResultadoEvaluacion: ResultadoEvaluacion | number): Observable<ResultadoEvaluacion> {
    const id = typeof ResultadoEvaluacion === 'number' ? ResultadoEvaluacion : ResultadoEvaluacion.id;
    const url = `${this.baseUrl + 'api/ResultadoEvaluacion'}/${id}`;

    return this.http.delete<ResultadoEvaluacion>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted ResultadoEvaluacion id=${id}`)),
      catchError(this.handleError<ResultadoEvaluacion>('deleteResultadoEvaluacion'))
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
