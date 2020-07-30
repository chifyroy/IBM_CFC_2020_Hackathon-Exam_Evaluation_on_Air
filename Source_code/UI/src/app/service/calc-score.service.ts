import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ExpectedAnswer } from '../model/expectedAnswer';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ExamService } from './exam.service';
import { catchError, map } from 'rxjs/operators';
import { AnswerAnalysis } from '../model/answerAnalysis';

@Injectable({
  providedIn: 'root'
})
export class CalcScoreService {

  private ansData = {};
  private _url: string = "/analyse/analyseAnswer";
  private _analysisUrl: string;
  private _analysisUrlStart: string = "http://localhost:8983/solr/Exam_on_Air/select?facet.field=Answer";
  private _analysisUrlEnd: string = '&facet=on&q=Type:';
  private questions = {};
  private _len: number;
  private _modelId: string;
  private _type: string;
  private _answer: string;
  private _question: string = "";
  private _solrAnsUrl: string = "";

  constructor(private http: HttpClient, private _examService: ExamService) { }

  getExpectedAnswer(): Observable<ExpectedAnswer> {
    this._url = "/analyse/analyseAnswer";
    var data = this._examService.getAnswers();
    var dataLen = Object.keys(data).length;
    for (var i = 0; i < dataLen; i++) {
      this.ansData[i] = {
        "ans": data[i].providedAnswer,
        "ques": data[i].Question,
        "mark": data[i].Mark,
        "score": data[i].Score
      }
    }

    this.questions = this._examService.getQuesData();
    this._answer = this.questions[0].ans;
    this._question = this.questions[0].ques;
    this._type = this.questions[0].type;
    this._url = this._url + '/' + this._answer;

    return this.http.get<ExpectedAnswer>(this._url)
      .pipe(map(res => {
        this._len = res.entities.length;
        var entities = res.entities;
        this._analysisUrl = "";
        this._solrAnsUrl = "";
        var i: number;
        for (i = 0; i < this._len; i++) {
          if (entities[i].type == this._type) {
            this._solrAnsUrl += '&facet.query=Answer_Cop:' + entities[i].text;
          }
        }
        this._analysisUrl = this._analysisUrlStart + this._solrAnsUrl + this._analysisUrlEnd + '"' + this._type + '"';
        return res
      }), catchError(this.handleError));
  }

  getAnswerAnalysis(): Observable<AnswerAnalysis> {
    return this.http.get<AnswerAnalysis>(this._analysisUrl)
      .pipe(catchError(this.handleError));
  }

  getSolrAnswerAnalysis(): Observable<AnswerAnalysis> {
    this._analysisUrl = "";
    this._solrAnsUrl = "";
    this.questions = this._examService.getQuesData();
    this._answer = this.questions[0].ans;
    this._type = this.questions[0].type;
    this._analysisUrl = this._analysisUrlStart + "&facet.query=Answer_Cop:" + this._answer + this._analysisUrlEnd + '"' + this._type + '"';

    return this.http.get<AnswerAnalysis>(this._analysisUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}