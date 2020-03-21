import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Familiar } from '../Models/Familiar';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FamiliarService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  /** POST: add a new Familiar to the server */
  add(Familiar: Familiar): Observable<Familiar> {

    return this.http.post<Familiar>(this.baseUrl + 'api/Familiar', Familiar, httpOptions).pipe(
      tap((newFamiliar: Familiar) => this.log(`added newFamiliar w/ id=${newFamiliar.id}`)),
      catchError(this.handleError<Familiar>('addFamiliar'))
    );
  }

   /** GET heroes from the server */
  getAll(): Observable<Familiar[]> {
    return this.http.get<Familiar[]>(this.baseUrl + 'api/Familiar')
      .pipe(
        tap(_ => this.log('fetched Familiar')),
        catchError(this.handleError<Familiar[]>('getFamiliar', []))
      );
  }

  get(id: number): Observable<Familiar> {
    const url = `${this.baseUrl + 'api/Familiar'}/${id}`;
    return this.http.get<Familiar>(url).pipe(
      tap(_ => this.log(`fetched Familiar id=${id}`)),
      catchError(this.handleError<Familiar>(`Familiar id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  update (Familiar: Familiar): Observable<any> {
    const url = `${this.baseUrl + 'api/Familiar'}/${Familiar.id}`;
    return this.http.put(url, Familiar, httpOptions).pipe(
      tap(_ => this.log(`updated Familiar id=${Familiar.id}`)),
      catchError(this.handleError<any>('Familiar'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete (Familiar: Familiar | number): Observable<Familiar> {
    const id = typeof Familiar === 'number' ? Familiar : Familiar.id;
    const url = `${this.baseUrl + 'api/Familiar'}/${id}`;

    return this.http.delete<Familiar>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Familiar id=${id}`)),
      catchError(this.handleError<Familiar>('deleteFamiliar'))
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
