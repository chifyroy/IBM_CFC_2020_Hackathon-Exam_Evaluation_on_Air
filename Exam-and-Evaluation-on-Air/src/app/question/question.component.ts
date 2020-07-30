import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../service/questions.service';
import { Router } from '@angular/router';
import { ExamService } from '../service/exam.service';
import { CalcScoreService } from '../service/calc-score.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public questions = [];
  public providedAnswer: string;
  private ansAnalysis = {};
  private scoredMark: number;
  private totalScore: number;
  private scoreCalculated = false;
  public submittedAns = 0;
  public showErrorMessage = false;
  public showLengthErrorMessage = false;
  pageSize = 1;
  page = 1;
  closeResult = '';

  constructor(private _questionsService: QuestionsService, private router: Router,
    private _examService: ExamService, private _calcScoreService: CalcScoreService, private modalService: NgbModal) { }

  ngOnInit() {
    var ansData = this._examService.getAnswers();
    var ansDataLen = Object.keys(ansData).length;

    this._questionsService.getQuestions()
      .subscribe(data => {
        this.questions = data.response.docs;
        var quesLen = Object.keys(this.questions).length;
        if (ansDataLen > 0) {
          for (var i = 0; i < quesLen; i++) {
            this.questions[i].providedAnswer = ansData[i].ans;
            this.questions[i].scoreCalculated = ansData[i].scoreCalculated;
            this.questions[i].totalScore = ansData[i].totalScore;
            if (this.questions[i].scoreCalculated) {
              this.submittedAns++;
            }
          }
        } else {
          for (var i = 0; i < quesLen; i++) {
            this.questions[i].providedAnswer = '';
          }
        }
      });

  }

  public gotoAnalyseScore(url, type, ans, ques, mark, score) {
    if (ans.length > 0) {
      this.showErrorMessage = false;
      this._examService.setQuesData(type, ans, ques, mark, score);
      this._examService.setAnswers(this.questions);
      this.router.navigate([url]).then((e) => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });
    } else {
      this.showErrorMessage = true;
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public gotoSubmitExam(url, content) {
    if (this.submittedAns != this.questions.length) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {

      this._examService.setAnswers(this.questions);
      this.router.navigate([url]).then((e) => {
        if (e) {
          console.log("Navigation is successful");
        } else {
          console.log("Navigation has failed!");
        }
      });
    }
  }

  public gotoSubmitAnswer(type, id, ans, ques, mark, score) {
    if (ans.length > 0) {
      this.showErrorMessage = false;
      this._examService.setQuesData(type, ans, ques, mark, score);
      if (!type.includes("True_or_False") && !type.includes("Fill_in_the_blanks")) {
        this._calcScoreService.getExpectedAnswer()
          .subscribe(data => {
            this.showLengthErrorMessage = false;
            this._calcScoreService.getAnswerAnalysis()
              .subscribe(data => {
                this.ansAnalysis = data.facet_counts.facet_queries;
                this.scoredMark = 0;
                for (let key in this.ansAnalysis) {
                  if (this.ansAnalysis[key] == 1) {
                    this.scoredMark++;
                  }
                }
                this.totalScore = (this.scoredMark * mark) / score;
                this.scoreCalculated = true;
                this.questions[id - 1]["totalScore"] = this.totalScore;
                this.questions[id - 1]["scoreCalculated"] = this.scoreCalculated;
                this.submittedAns++;
              });
          },
            error => {
              this.showLengthErrorMessage = true;
            });
      } else {
        this._calcScoreService.getSolrAnswerAnalysis()
          .subscribe(data => {
            this.ansAnalysis = data.facet_counts.facet_queries;
            this.scoredMark = 0;
            for (let key in this.ansAnalysis) {
              if (this.ansAnalysis[key] == 1) {
                this.scoredMark++;
              }
            }
            this.totalScore = (this.scoredMark * mark) / score;
            this.scoreCalculated = true;
            this.questions[id - 1]["totalScore"] = this.totalScore;
            this.questions[id - 1]["scoreCalculated"] = this.scoreCalculated;
            this.submittedAns++;
          });
      }
    } else {
      this.showErrorMessage = true;
    }
  }

  trackById(index: number, value: any) {
    return index;
  }
}