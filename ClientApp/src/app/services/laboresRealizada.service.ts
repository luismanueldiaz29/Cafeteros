import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LaboresRealizada } from '../Models/LaboresRealizada';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LaboresRealizadaService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  /** POST: add a new LaboresRealizada to the server */
  add(LaboresRealizada: LaboresRealizada): Observable<LaboresRealizada> {

    return this.http.post<LaboresRealizada>(this.baseUrl + 'api/LaboresRealizada', LaboresRealizada, httpOptions).pipe(
      tap((newLaboresRealizada: LaboresRealizada) => this.log(`added newLaboresRealizada w/ id=${newLaboresRealizada.id}`)),
      catchError(this.handleError<LaboresRealizada>('addLaboresRealizada'))
    );
  }

   /** GET heroes from the server */
  getAll(): Observable<LaboresRealizada[]> {
    return this.http.get<LaboresRealizada[]>(this.baseUrl + 'api/LaboresRealizada')
      .pipe(
        tap(_ => this.log('fetched LaboresRealizada')),
        catchError(this.handleError<LaboresRealizada[]>('getLaboresRealizada', []))
      );
  }

  get(id: number): Observable<LaboresRealizada> {
    const url = `${this.baseUrl + 'api/LaboresRealizada'}/${id}`;
    return this.http.get<LaboresRealizada>(url).pipe(
      tap(_ => this.log(`fetched LaboresRealizada id=${id}`)),
      catchError(this.handleError<LaboresRealizada>(`LaboresRealizada id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  update (LaboresRealizada: LaboresRealizada): Observable<any> {
    const url = `${this.baseUrl + 'api/LaboresRealizada'}/${LaboresRealizada.id}`;
    return this.http.put(url, LaboresRealizada, httpOptions).pipe(
      tap(_ => this.log(`updated LaboresRealizada id=${LaboresRealizada.id}`)),
      catchError(this.handleError<any>('LaboresRealizada'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete (LaboresRealizada: LaboresRealizada | number): Observable<LaboresRealizada> {
    const id = typeof LaboresRealizada === 'number' ? LaboresRealizada : LaboresRealizada.id;
    const url = `${this.baseUrl + 'api/LaboresRealizada'}/${id}`;

    return this.http.delete<LaboresRealizada>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted LaboresRealizada id=${id}`)),
      catchError(this.handleError<LaboresRealizada>('deleteLaboresRealizada'))
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
