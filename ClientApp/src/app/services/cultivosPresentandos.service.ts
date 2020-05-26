import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CultivosPresentandos } from '../Models/CultivosPresentandos';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CultivosPresentandosService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  /** POST: add a new CultivosPresentandos to the server */
  add(CultivosPresentandos: CultivosPresentandos): Observable<CultivosPresentandos> {

    return this.http.post<CultivosPresentandos>(this.baseUrl + 'api/CultivosPresentandos', CultivosPresentandos, httpOptions).pipe(
      tap((newCultivosPresentandos: CultivosPresentandos) => this.log(`added newCultivosPresentandos w/ id=${newCultivosPresentandos.id}`)),
      catchError(this.handleError<CultivosPresentandos>('addCultivosPresentandos'))
    );
  }

   /** GET heroes from the server */
  getAll(): Observable<CultivosPresentandos[]> {
    return this.http.get<CultivosPresentandos[]>(this.baseUrl + 'api/CultivosPresentandos')
      .pipe(
        tap(_ => this.log('fetched CultivosPresentandos')),
        catchError(this.handleError<CultivosPresentandos[]>('getCultivosPresentandos', []))
      );
  }

  get(id: number): Observable<CultivosPresentandos> {
    const url = `${this.baseUrl + 'api/CultivosPresentandos'}/${id}`;
    return this.http.get<CultivosPresentandos>(url).pipe(
      tap(_ => this.log(`fetched CultivosPresentandos id=${id}`)),
      catchError(this.handleError<CultivosPresentandos>(`CultivosPresentandos id=${id}`))
    );
  }

  getAllCultivosPresentandosProdId(id: string): Observable<CultivosPresentandos> {
    const url = `${this.baseUrl + 'api/CultivosPresentandos/Productor'}/${id}`;
    return this.http.get<CultivosPresentandos>(url).pipe(
      tap(_ => this.log(`fetched CultivosPresentandos id=${id}`)),
      catchError(this.handleError<CultivosPresentandos>(`CultivosPresentandos id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  update (CultivosPresentandos: CultivosPresentandos): Observable<any> {
    const url = `${this.baseUrl + 'api/CultivosPresentandos'}/${CultivosPresentandos.id}`;
    return this.http.put(url, CultivosPresentandos, httpOptions).pipe(
      tap(_ => this.log(`updated CultivosPresentandos id=${CultivosPresentandos.id}`)),
      catchError(this.handleError<any>('CultivosPresentandos'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete (CultivosPresentandos: CultivosPresentandos | number): Observable<CultivosPresentandos> {
    const id = typeof CultivosPresentandos === 'number' ? CultivosPresentandos : CultivosPresentandos.id;
    const url = `${this.baseUrl + 'api/CultivosPresentandos'}/${id}`;

    return this.http.delete<CultivosPresentandos>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted CultivosPresentandos id=${id}`)),
      catchError(this.handleError<CultivosPresentandos>('deleteCultivosPresentandos'))
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
