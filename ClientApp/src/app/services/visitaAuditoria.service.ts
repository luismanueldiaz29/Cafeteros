import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { VisitaAuditoria } from '../Models/VisitaAuditoria';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VisitaAuditoriaService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  /** POST: add a new VisitaAuditoria to the server */
  add(VisitaAuditoria: VisitaAuditoria): Observable<VisitaAuditoria> {

    return this.http.post<VisitaAuditoria>(this.baseUrl + 'api/VisitaAuditoria', VisitaAuditoria, httpOptions).pipe(
      tap((newVisitaAuditoria: VisitaAuditoria) => this.log(`added newVisitaAuditoria w/ id=${newVisitaAuditoria.id}`)),
      catchError(this.handleError<VisitaAuditoria>('addVisitaAuditoria'))
    );
  }

   /** GET heroes from the server */
  getAll(): Observable<VisitaAuditoria[]> {
    return this.http.get<VisitaAuditoria[]>(this.baseUrl + 'api/VisitaAuditoria')
      .pipe(
        tap(_ => this.log('fetched VisitaAuditoria')),
        catchError(this.handleError<VisitaAuditoria[]>('getVisitaAuditoria', []))
      );
  }

  /** GET heroes from the server */
  getProductorVisitas(id : string): Observable<VisitaAuditoria[]> {
  const url = `${this.baseUrl + 'api/VisitaAuditoria/Productor'}/${id}`;
  return this.http.get<VisitaAuditoria[]>(url)
    .pipe(
      tap(_ => this.log('fetched productor VisitaAuditoria')),
      catchError(this.handleError<VisitaAuditoria[]>('getVisitaAuditoria', []))
    );
}


  get(id: number): Observable<VisitaAuditoria> {
    const url = `${this.baseUrl + 'api/VisitaAuditoria'}/${id}`;
    return this.http.get<VisitaAuditoria>(url).pipe(
      tap(_ => this.log(`fetched VisitaAuditoria id=${id}`)),
      catchError(this.handleError<VisitaAuditoria>(`VisitaAuditoria id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  update (VisitaAuditoria: VisitaAuditoria): Observable<any> {
    const url = `${this.baseUrl + 'api/VisitaAuditoria'}/${VisitaAuditoria.id}`;
    return this.http.put(url, VisitaAuditoria, httpOptions).pipe(
      tap(_ => this.log(`updated VisitaAuditoria id=${VisitaAuditoria.id}`)),
      catchError(this.handleError<any>('VisitaAuditoria'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete (VisitaAuditoria: VisitaAuditoria | number): Observable<VisitaAuditoria> {
    const id = typeof VisitaAuditoria === 'number' ? VisitaAuditoria : VisitaAuditoria.id;
    const url = `${this.baseUrl + 'api/VisitaAuditoria'}/${id}`;

    return this.http.delete<VisitaAuditoria>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted VisitaAuditoria id=${id}`)),
      catchError(this.handleError<VisitaAuditoria>('deleteVisitaAuditoria'))
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
