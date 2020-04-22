import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AspectoEconomico } from '../Models/AspectoEconomico';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AspectoEconomicoService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  /** POST: add a new AspectoEconomico to the server */
  add(AspectoEconomico: AspectoEconomico): Observable<AspectoEconomico> {

    return this.http.post<AspectoEconomico>(this.baseUrl + 'api/AspectoEconomico', AspectoEconomico, httpOptions).pipe(
      tap((newAspectoEconomico: AspectoEconomico) => this.log(`added newAspectoEconomico w/ id=${newAspectoEconomico.id}`)),
      catchError(this.handleError<AspectoEconomico>('addAspectoEconomico'))
    );
  }

   /** GET heroes from the server */
  getAll(): Observable<AspectoEconomico[]> {
    return this.http.get<AspectoEconomico[]>(this.baseUrl + 'api/AspectoEconomico')
      .pipe(
        tap(_ => this.log('fetched AspectoEconomico')),
        catchError(this.handleError<AspectoEconomico[]>('getAspectoEconomico', []))
      );
  }

  get(id: number): Observable<AspectoEconomico> {
    const url = `${this.baseUrl + 'api/AspectoEconomico'}/${id}`;
    return this.http.get<AspectoEconomico>(url).pipe(
      tap(_ => this.log(`fetched AspectoEconomico id=${id}`)),
      catchError(this.handleError<AspectoEconomico>(`AspectoEconomico id=${id}`))
    );
  }

  getAllAspectoEconomicoProdId(id: string): Observable<AspectoEconomico> {
    const url = `${this.baseUrl + 'api/AspectoEconomico/Productor'}/${id}`;
    return this.http.get<AspectoEconomico>(url).pipe(
      tap(_ => this.log(`fetched AspectoEconomico id=${id}`)),
      catchError(this.handleError<AspectoEconomico>(`AspectoEconomico id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  update (AspectoEconomico: AspectoEconomico): Observable<any> {
    const url = `${this.baseUrl + 'api/AspectoEconomico'}/${AspectoEconomico.id}`;
    return this.http.put(url, AspectoEconomico, httpOptions).pipe(
      tap(_ => this.log(`updated AspectoEconomico id=${AspectoEconomico.id}`)),
      catchError(this.handleError<any>('AspectoEconomico'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete (AspectoEconomico: AspectoEconomico | number): Observable<AspectoEconomico> {
    const id = typeof AspectoEconomico === 'number' ? AspectoEconomico : AspectoEconomico.id;
    const url = `${this.baseUrl + 'api/AspectoEconomico'}/${id}`;

    return this.http.delete<AspectoEconomico>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted AspectoEconomico id=${id}`)),
      catchError(this.handleError<AspectoEconomico>('deleteAspectoEconomico'))
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
