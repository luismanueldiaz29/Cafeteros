import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { VisitaPromotoria } from '../Models/VisitaPromotoria';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VisitaPromotoriaService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  /** POST: add a new VisitaPromotoria to the server */
  add(VisitaPromotoria: VisitaPromotoria): Observable<VisitaPromotoria> {

    return this.http.post<VisitaPromotoria>(this.baseUrl + 'api/VisitaPromotoria', VisitaPromotoria, httpOptions).pipe(
      tap((newVisitaPromotoria: VisitaPromotoria) => this.log(`added newVisitaPromotoria w/ id=${newVisitaPromotoria.id}`)),
      catchError(this.handleError<VisitaPromotoria>('addVisitaPromotoria'))
    );
  }

   /** GET heroes from the server */
  getAll(): Observable<VisitaPromotoria[]> {
    return this.http.get<VisitaPromotoria[]>(this.baseUrl + 'api/VisitaPromotoria')
      .pipe(
        tap(_ => this.log('fetched VisitaPromotoria')),
        catchError(this.handleError<VisitaPromotoria[]>('getVisitaPromotoria', []))
      );
  }

     /** GET heroes from the server */
     getProductorVisitas(id : string): Observable<VisitaPromotoria[]> {
      const url = `${this.baseUrl + 'api/VisitaPromotoria/Productor'}/${id}`;
      return this.http.get<VisitaPromotoria[]>(url)
        .pipe(
          tap(_ => this.log('fetched productor VisitaPromotoria')),
          catchError(this.handleError<VisitaPromotoria[]>('getVisitaPromotoria', []))
        );
    }

  get(id: number): Observable<VisitaPromotoria> {
    const url = `${this.baseUrl + 'api/VisitaPromotoria'}/${id}`;
    return this.http.get<VisitaPromotoria>(url).pipe(
      tap(_ => this.log(`fetched VisitaPromotoria id=${id}`)),
      catchError(this.handleError<VisitaPromotoria>(`VisitaPromotoria id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  update (VisitaPromotoria: VisitaPromotoria): Observable<any> {
    const url = `${this.baseUrl + 'api/VisitaPromotoria'}/${VisitaPromotoria.id}`;
    return this.http.put(url, VisitaPromotoria, httpOptions).pipe(
      tap(_ => this.log(`updated VisitaPromotoria id=${VisitaPromotoria.id}`)),
      catchError(this.handleError<any>('VisitaPromotoria'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete (VisitaPromotoria: VisitaPromotoria | number): Observable<VisitaPromotoria> {
    const id = typeof VisitaPromotoria === 'number' ? VisitaPromotoria : VisitaPromotoria.id;
    const url = `${this.baseUrl + 'api/VisitaPromotoria'}/${id}`;

    return this.http.delete<VisitaPromotoria>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted VisitaPromotoria id=${id}`)),
      catchError(this.handleError<VisitaPromotoria>('deleteVisitaPromotoria'))
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
