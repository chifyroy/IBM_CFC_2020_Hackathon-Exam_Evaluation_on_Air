import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IQuestion } from '../model/question';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private messageSource = new BehaviorSubject("default message");
  public myData: BehaviorSubject<IQuestion[]> = new BehaviorSubject<IQuestion[]>([]);
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  private _len: number;
  quesData;
  private _url: string = "http://localhost:8983/solr/Exam_on_Air/select?q=*:*&wt=json&fl=Question,Model_ID,Mark,Score,Type";

  constructor(private http: HttpClient) {
    this.quesData = {};
  }

  getQuestions(): Observable<IQuestion> {
    return this.http.get<IQuestion>(this._url)
      .pipe(catchError(this.handleError));
  }

  setQuesData(ans: string, ques: string, mark: number, score: number) {
    this.quesData[0] = {
      "ans": ans,
      "ques": ques,
      "mark": mark,
      "score": score
    };
  }
  getQuesData() {
    return this.quesData;
  }

  private handleError(error: HttpErrorResponse) {
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}