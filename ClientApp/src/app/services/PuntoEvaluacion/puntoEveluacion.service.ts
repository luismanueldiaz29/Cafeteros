import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CB, MA, MSE, MIES, MS} from '../../Models/PuntoEvaluacion';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PuntoEvaluacionService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  /** POST: add a new CB to the server */
  addCB(CB: CB): Observable<CB> {
    return this.http.post<CB>(this.baseUrl + 'api/CB', CB, httpOptions).pipe(
      tap((newCB: CB) => this.log(`added newCB w/ id=${newCB.id}`)),
      catchError(this.handleError<CB>('addCB'))
    );
  }

  getAllCBVisita (id: number): Observable<CB> {
    const url = `${this.baseUrl + 'api/CB/VisitaAuditoria'}/${id}`;
    return this.http.get<CB>(url).pipe(
      tap(_ => this.log(`fetched CB id=${id}`)),
      catchError(this.handleError<CB>(`CB id=${id}`))
    );
  }

  addMA(MA: MA): Observable<MA> {
    return this.http.post<MA>(this.baseUrl + 'api/MA', MA, httpOptions).pipe(
      tap((newMA: MA) => this.log(`added newMA w/ id=${newMA.id}`)),
      catchError(this.handleError<MA>('addMA'))
    );
  }

  getAllMAVisita (id: number): Observable<MA> {
    const url = `${this.baseUrl + 'api/MA/VisitaAuditoria'}/${id}`;
    return this.http.get<MA>(url).pipe(
      tap(_ => this.log(`fetched MA id=${id}`)),
      catchError(this.handleError<MA>(`MA id=${id}`))
    );
  }

  addMSE(MSE: MSE): Observable<MSE> {
    return this.http.post<MSE>(this.baseUrl + 'api/MSE', MSE, httpOptions).pipe(
      tap((newMSE: MSE) => this.log(`added newMSE w/ id=${newMSE.id}`)),
      catchError(this.handleError<MSE>('addMSE'))
    );
  }

  getAllMSEVisita (id: number): Observable<MSE> {
    const url = `${this.baseUrl + 'api/MSE/VisitaAuditoria'}/${id}`;
    return this.http.get<MSE>(url).pipe(
      tap(_ => this.log(`fetched MSE id=${id}`)),
      catchError(this.handleError<MSE>(`MSE id=${id}`))
    );
  }

  addMIES(MIES: MIES): Observable<MIES> {
    return this.http.post<MIES>(this.baseUrl + 'api/MIES', MIES, httpOptions).pipe(
      tap((newMIES: MIES) => this.log(`added newMIES w/ id=${newMIES.id}`)),
      catchError(this.handleError<MIES>('addMIES'))
    );
  }

  getAllMIESVisita (id: number): Observable<MIES> {
    const url = `${this.baseUrl + 'api/MIES/VisitaAuditoria'}/${id}`;
    return this.http.get<MIES>(url).pipe(
      tap(_ => this.log(`fetched MIES id=${id}`)),
      catchError(this.handleError<MIES>(`MIES id=${id}`))
    );
  }

  addMS(MS: MS): Observable<MS> {
    return this.http.post<MS>(this.baseUrl + 'api/MS', MS, httpOptions).pipe(
      tap((newMS: MS) => this.log(`added newMS w/ id=${newMS.id}`)),
      catchError(this.handleError<MS>('addMS'))
    );
  }

  getAllMSVisita (id: number): Observable<MS> {
    const url = `${this.baseUrl + 'api/MS/VisitaAuditoria'}/${id}`;
    return this.http.get<MS>(url).pipe(
      tap(_ => this.log(`fetched MS id=${id}`)),
      catchError(this.handleError<MS>(`MS id=${id}`))
    );
  }

  get(id: string): Observable<CB> {
    const url = `${this.baseUrl + 'api/CB'}/${id}`;
    return this.http.get<CB>(url).pipe(
      tap(_ => this.log(`fetched CB id=${id}`)),
      catchError(this.handleError<CB>(`CB id=${id}`))
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
