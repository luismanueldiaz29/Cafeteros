import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { EvaluacionCompromiso } from '../Models/EvaluacionCompromiso';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EvaluacionCompromisoService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  /** POST: add a new EvaluacionCompromiso to the server */
  add(EvaluacionCompromiso: EvaluacionCompromiso): Observable<EvaluacionCompromiso> {

    return this.http.post<EvaluacionCompromiso>(this.baseUrl + 'api/EvaluacionCompromiso', EvaluacionCompromiso, httpOptions).pipe(
      tap((newEvaluacionCompromiso: EvaluacionCompromiso) => this.log(`added newEvaluacionCompromiso w/ id=${newEvaluacionCompromiso.id}`)),
      catchError(this.handleError<EvaluacionCompromiso>('addEvaluacionCompromiso'))
    );
  }

   /** GET heroes from the server */
  getAll(): Observable<EvaluacionCompromiso[]> {
    return this.http.get<EvaluacionCompromiso[]>(this.baseUrl + 'api/EvaluacionCompromiso')
      .pipe(
        tap(_ => this.log('fetched EvaluacionCompromiso')),
        catchError(this.handleError<EvaluacionCompromiso[]>('getEvaluacionCompromiso', []))
      );
  }

     /** GET heroes from the server */
     getProductorVisitas(id : string): Observable<EvaluacionCompromiso[]> {
      const url = `${this.baseUrl + 'api/EvaluacionCompromiso/Productor'}/${id}`;
      return this.http.get<EvaluacionCompromiso[]>(url)
        .pipe(
          tap(_ => this.log('fetched productor EvaluacionCompromiso')),
          catchError(this.handleError<EvaluacionCompromiso[]>('getEvaluacionCompromiso', []))
        );
    }

  get(id: number): Observable<EvaluacionCompromiso> {
    const url = `${this.baseUrl + 'api/EvaluacionCompromiso'}/${id}`;
    return this.http.get<EvaluacionCompromiso>(url).pipe(
      tap(_ => this.log(`fetched EvaluacionCompromiso id=${id}`)),
      catchError(this.handleError<EvaluacionCompromiso>(`EvaluacionCompromiso id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  update (EvaluacionCompromiso: EvaluacionCompromiso): Observable<any> {
    const url = `${this.baseUrl + 'api/EvaluacionCompromiso'}/${EvaluacionCompromiso.id}`;
    return this.http.put(url, EvaluacionCompromiso, httpOptions).pipe(
      tap(_ => this.log(`updated EvaluacionCompromiso id=${EvaluacionCompromiso.id}`)),
      catchError(this.handleError<any>('EvaluacionCompromiso'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete (EvaluacionCompromiso: EvaluacionCompromiso | number): Observable<EvaluacionCompromiso> {
    const id = typeof EvaluacionCompromiso === 'number' ? EvaluacionCompromiso : EvaluacionCompromiso.id;
    const url = `${this.baseUrl + 'api/EvaluacionCompromiso'}/${id}`;

    return this.http.delete<EvaluacionCompromiso>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted EvaluacionCompromiso id=${id}`)),
      catchError(this.handleError<EvaluacionCompromiso>('deleteEvaluacionCompromiso'))
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
