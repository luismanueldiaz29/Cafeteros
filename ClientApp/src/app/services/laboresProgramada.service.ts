import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LaboresProgramada } from '../Models/LaboresProgramada';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LaboresProgramadaService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  /** POST: add a new LaboresProgramada to the server */
  add(LaboresProgramada: LaboresProgramada): Observable<LaboresProgramada> {

    return this.http.post<LaboresProgramada>(this.baseUrl + 'api/LaboresProgramada', LaboresProgramada, httpOptions).pipe(
      tap((newLaboresProgramada: LaboresProgramada) => this.log(`added newLaboresProgramada w/ id=${newLaboresProgramada.id}`)),
      catchError(this.handleError<LaboresProgramada>('addLaboresProgramada'))
    );
  }

   /** GET heroes from the server */
  getAll(): Observable<LaboresProgramada[]> {
    return this.http.get<LaboresProgramada[]>(this.baseUrl + 'api/LaboresProgramada')
      .pipe(
        tap(_ => this.log('fetched LaboresProgramada')),
        catchError(this.handleError<LaboresProgramada[]>('getLaboresProgramada', []))
      );
  }

  get(id: number): Observable<LaboresProgramada> {
    const url = `${this.baseUrl + 'api/LaboresProgramada'}/${id}`;
    return this.http.get<LaboresProgramada>(url).pipe(
      tap(_ => this.log(`fetched LaboresProgramada id=${id}`)),
      catchError(this.handleError<LaboresProgramada>(`LaboresProgramada id=${id}`))
    );
  }

    /** este metodo me retorna todos los LaboresProgramadaes de los productores */
    getAllVisitaLaboresProgramada(id: number): Observable<LaboresProgramada[]> {
      const url = `${this.baseUrl + 'api/LaboresProgramada/VisitaPromotoria'}/${id}`;
      return this.http.get<LaboresProgramada[]>(url).pipe(
        tap(_ => this.log(`fetched LaboresProgramada id=${id}`)),
        catchError(this.handleError<LaboresProgramada[]>(`LaboresProgramada id=${id}`))
      );
    }

  /** PUT: update the hero on the server */
  update (LaboresProgramada: LaboresProgramada): Observable<any> {
    const url = `${this.baseUrl + 'api/LaboresProgramada'}/${LaboresProgramada.id}`;
    return this.http.put(url, LaboresProgramada, httpOptions).pipe(
      tap(_ => this.log(`updated LaboresProgramada id=${LaboresProgramada.id}`)),
      catchError(this.handleError<any>('LaboresProgramada'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete (LaboresProgramada: LaboresProgramada | number): Observable<LaboresProgramada> {
    const id = typeof LaboresProgramada === 'number' ? LaboresProgramada : LaboresProgramada.id;
    const url = `${this.baseUrl + 'api/LaboresProgramada'}/${id}`;

    return this.http.delete<LaboresProgramada>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted LaboresProgramada id=${id}`)),
      catchError(this.handleError<LaboresProgramada>('deleteLaboresProgramada'))
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
