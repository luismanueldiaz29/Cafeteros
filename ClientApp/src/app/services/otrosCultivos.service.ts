import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { OtrosCultivos } from '../Models/OtrosCultivos';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OtrosCultivosService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  /** POST: add a new OtrosCultivos to the server */
  add(OtrosCultivos: OtrosCultivos): Observable<OtrosCultivos> {

    return this.http.post<OtrosCultivos>(this.baseUrl + 'api/OtrosCultivos', OtrosCultivos, httpOptions).pipe(
      tap((newOtrosCultivos: OtrosCultivos) => this.log(`added newOtrosCultivos w/ id=${newOtrosCultivos.id}`)),
      catchError(this.handleError<OtrosCultivos>('addOtrosCultivos'))
    );
  }

   /** GET heroes from the server */
  getAll(): Observable<OtrosCultivos[]> {
    return this.http.get<OtrosCultivos[]>(this.baseUrl + 'api/OtrosCultivos')
      .pipe(
        tap(_ => this.log('fetched OtrosCultivos')),
        catchError(this.handleError<OtrosCultivos[]>('getOtrosCultivos', []))
      );
  }

     /** GET heroes from the server */
     getProductorVisitas(id : string): Observable<OtrosCultivos[]> {
      const url = `${this.baseUrl + 'api/OtrosCultivos/Productor'}/${id}`;
      return this.http.get<OtrosCultivos[]>(url)
        .pipe(
          tap(_ => this.log('fetched productor OtrosCultivos')),
          catchError(this.handleError<OtrosCultivos[]>('getOtrosCultivos', []))
        );
    }

  get(id: number): Observable<OtrosCultivos> {
    const url = `${this.baseUrl + 'api/OtrosCultivos'}/${id}`;
    return this.http.get<OtrosCultivos>(url).pipe(
      tap(_ => this.log(`fetched OtrosCultivos id=${id}`)),
      catchError(this.handleError<OtrosCultivos>(`OtrosCultivos id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  update (OtrosCultivos: OtrosCultivos): Observable<any> {
    const url = `${this.baseUrl + 'api/OtrosCultivos'}/${OtrosCultivos.id}`;
    return this.http.put(url, OtrosCultivos, httpOptions).pipe(
      tap(_ => this.log(`updated OtrosCultivos id=${OtrosCultivos.id}`)),
      catchError(this.handleError<any>('OtrosCultivos'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete (OtrosCultivos: OtrosCultivos | number): Observable<OtrosCultivos> {
    const id = typeof OtrosCultivos === 'number' ? OtrosCultivos : OtrosCultivos.id;
    const url = `${this.baseUrl + 'api/OtrosCultivos'}/${id}`;

    return this.http.delete<OtrosCultivos>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted OtrosCultivos id=${id}`)),
      catchError(this.handleError<OtrosCultivos>('deleteOtrosCultivos'))
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
