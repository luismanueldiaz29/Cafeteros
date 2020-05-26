import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { VisitaAudtoria } from '../Models/VisitaAuditoria';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VisitaAudtoriaService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  /** POST: add a new VisitaAudtoria to the server */
  add(VisitaAudtoria: VisitaAudtoria): Observable<VisitaAudtoria> {

    return this.http.post<VisitaAudtoria>(this.baseUrl + 'api/VisitaAudtoria', VisitaAudtoria, httpOptions).pipe(
      tap((newVisitaAudtoria: VisitaAudtoria) => this.log(`added newVisitaAudtoria w/ id=${newVisitaAudtoria.id}`)),
      catchError(this.handleError<VisitaAudtoria>('addVisitaAudtoria'))
    );
  }

   /** GET heroes from the server */
  getAll(): Observable<VisitaAudtoria[]> {
    return this.http.get<VisitaAudtoria[]>(this.baseUrl + 'api/VisitaAudtoria')
      .pipe(
        tap(_ => this.log('fetched VisitaAudtoria')),
        catchError(this.handleError<VisitaAudtoria[]>('getVisitaAudtoria', []))
      );
  }

     /** GET heroes from the server */
     getProductorVisitas(id : string): Observable<VisitaAudtoria[]> {
      const url = `${this.baseUrl + 'api/VisitaAudtoria/Productor'}/${id}`;
      return this.http.get<VisitaAudtoria[]>(url)
        .pipe(
          tap(_ => this.log('fetched productor VisitaAudtoria')),
          catchError(this.handleError<VisitaAudtoria[]>('getVisitaAudtoria', []))
        );
    }

  get(id: number): Observable<VisitaAudtoria> {
    const url = `${this.baseUrl + 'api/VisitaAudtoria'}/${id}`;
    return this.http.get<VisitaAudtoria>(url).pipe(
      tap(_ => this.log(`fetched VisitaAudtoria id=${id}`)),
      catchError(this.handleError<VisitaAudtoria>(`VisitaAudtoria id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  update (VisitaAudtoria: VisitaAudtoria): Observable<any> {
    const url = `${this.baseUrl + 'api/VisitaAudtoria'}/${VisitaAudtoria.id}`;
    return this.http.put(url, VisitaAudtoria, httpOptions).pipe(
      tap(_ => this.log(`updated VisitaAudtoria id=${VisitaAudtoria.id}`)),
      catchError(this.handleError<any>('VisitaAudtoria'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete (VisitaAudtoria: VisitaAudtoria | number): Observable<VisitaAudtoria> {
    const id = typeof VisitaAudtoria === 'number' ? VisitaAudtoria : VisitaAudtoria.id;
    const url = `${this.baseUrl + 'api/VisitaAudtoria'}/${id}`;

    return this.http.delete<VisitaAudtoria>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted VisitaAudtoria id=${id}`)),
      catchError(this.handleError<VisitaAudtoria>('deleteVisitaAudtoria'))
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
