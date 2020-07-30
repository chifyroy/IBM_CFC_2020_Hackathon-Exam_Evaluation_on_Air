import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../service/questions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../service/exam.service';
import { CalcScoreService } from '../service/calc-score.service';

@Component({
  selector: 'app-analyse-score',
  templateUrl: './analyse-score.component.html',
  styleUrls: ['./analyse-score.component.css']
})
export class AnalyseScoreComponent implements OnInit {

  public expAnswer;
  private questions = {};
  public ansAnalysis;
  public totalScore: number;
  private _text: string;
  public mark: number;
  private _score: number;
  private _type: string;
  private scoredMark: number;
  public scoreCalculated = false;

  constructor(private _calcScoreService: CalcScoreService, private _questionsService: QuestionsService,
    private route: ActivatedRoute, private router: Router, private _examService: ExamService) {
    this.questions = _examService.getQuesData();
    this._text = this.questions[0].ans;
    this.mark = this.questions[0].mark;
    this._score = this.questions[0].score;
    this._type = this.questions[0].type;
  }

  ngOnInit() {
    if (!this._type.includes("True_or_False") && !this._type.includes("Fill_in_the_blanks")) {
      this._calcScoreService.getExpectedAnswer()
        .subscribe(data => {
          this._calcScoreService.getAnswerAnalysis()
            .subscribe(data => {
              this.ansAnalysis = data.facet_counts.facet_queries;
              this.expAnswer = data.response.docs;
              this.scoredMark = 0;
              this.expAnswer = this.expAnswer[0].Answer[0].split(',');
              for (let key in this.ansAnalysis) {
                if (this.ansAnalysis[key] == 1) {
                  this.scoredMark++;
                }
              }
            });
        });
    } else {
      this._calcScoreService.getSolrAnswerAnalysis()
        .subscribe(data => {
          this.ansAnalysis = data.facet_counts.facet_queries;
          this.expAnswer = data.response.docs;
          this.expAnswer = this.expAnswer[0].Answer[0].split(',');
          this.scoredMark = 0;
          for (let key in this.ansAnalysis) {
            if (this.ansAnalysis[key] == 1) {
              this.scoredMark++;
            }
          }
        });
    }
  }

  public gotoGenerateScore(url) {
    this.totalScore = (this.scoredMark * this.mark) / this._score;
    this.scoreCalculated = true;
  }
}