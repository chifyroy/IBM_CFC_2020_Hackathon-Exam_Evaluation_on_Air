import { Injectable } from '@angular/core';
import { Entities, examDetails } from '../model/expectedAnswer';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigureDataService {

  private _url = "/assets/data/6th_Science_MidTerm.json";
  private _examDetUrl = "/assets/data/examDetails.json";
  private _solrUrl = "http://localhost:8983/solr/Exam_on_Air/update/json/docs?commit=true";
  constructor(private http: HttpClient) { }

  getExamDetails(): Observable<examDetails> {
    return this.http.get<examDetails>(this._examDetUrl)
      .pipe(catchError(this.handleError));
  }

  getEntities(): Observable<Entities> {
    return this.http.get<Entities>(this._url)
      .pipe(catchError(this.handleError));
  }

  addQuesData(data): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = data;
    return this.http.post(this._solrUrl, body, { 'headers': headers })
  }

  private handleError(error: HttpErrorResponse) {
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
