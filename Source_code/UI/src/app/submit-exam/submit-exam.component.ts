import { Component, OnInit } from '@angular/core';
import { ExamService } from '../service/exam.service';
import { CalcScoreService } from '../service/calc-score.service';

@Component({
  selector: 'app-submit-exam',
  templateUrl: './submit-exam.component.html',
  styleUrls: ['./submit-exam.component.css']
})
export class SubmitExamComponent implements OnInit {

  public ansData = {};
  public totalScore: number = 0;
  public examName: string;
  public stName: string;
  public stId: string;
  public examScore: number = 0;
  public scores = [];
  private studetnData = {};
  private ansAnalysis = {};
  private scoredMark: number;

  constructor(private _examService: ExamService, private _calcScoreService: CalcScoreService) {
    /* Get student Data */
    this.studetnData = _examService.getStudentData();
    if (this.studetnData && Object.keys(this.studetnData).length > 0) {
      this.examName = this.studetnData[0].examName;
      this.stName = this.studetnData[0].stName;
      this.stId = this.studetnData[0].stId;
    }

    /* Get Score */
    this.ansData = this._examService.getAnswers();
    var ansLen = Object.keys(this.ansData).length;

    for (var a = 0; a < ansLen; a++) {
      this.scores[a] = {
        "score": this.ansData[a].totalScore,
        "mark": this.ansData[a].mark
      }
      this.examScore = this.examScore + parseInt(this.ansData[a].mark, 10);
      if (this.ansData[a].scoreCalculated) {
        this.totalScore = this.totalScore + this.ansData[a].totalScore;
      } else {
        this.ansData[a]["scoredMark"] = 0;
        this.ansData[a]["ansAnalysis"] = {};
        this.calcScore(this.ansData[a], a);
      }
    }
  }

  ngOnInit(): void {
  }

  calcScore(ansData, ind) {
    this._examService.setQuesData(ansData.type, ansData.ans, ansData.ques, ansData.mark, ansData.score);
    this._calcScoreService.getExpectedAnswer()
      .subscribe(data => {
        this._calcScoreService.getAnswerAnalysis()
          .subscribe(data => {
            this.ansAnalysis = data.facet_counts.facet_queries;
            this.ansData[ind].ansAnalysis = data.facet_counts.facet_queries;
            for (let key in this.ansData[ind].ansAnalysis) {
              if (this.ansData[ind].ansAnalysis[key] == 1) {
                this.ansData[ind].scoredMark++;
              }
            }
            this.totalScore = this.totalScore + (this.ansData[ind].scoredMark * this.ansData[ind].mark) / this.ansData[ind].score;
          });
      });
  }
}