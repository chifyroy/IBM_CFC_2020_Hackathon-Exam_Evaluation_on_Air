import { Component, OnInit } from '@angular/core';
import { ExamService } from '../service/exam.service';
import { ConfigureDataService } from '../service/configure-data.service';
import { CalcScoreService } from '../service/calc-score.service';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.css']
})
export class UpdateDataComponent implements OnInit {

  public expAnswer;
  public score: number;
  private providedData = {};
  private quesData = {};
  public question: string;
  public mark: number;
  public type: string;
  private answer = [];
  public ansArray = [];
  public dataUpdated = false

  constructor(private _calcScoreService: CalcScoreService, private _examService: ExamService,
    private _configureService: ConfigureDataService) {
    this.providedData = this._examService.getQuesData();
    this.question = this.providedData[0].ques;
    this.mark = this.providedData[0].mark;
    this.type = this.providedData[0].type;
    this.answer[0] = this.providedData[0].ans;
  }

  ngOnInit(): void {
    if (this.type != "True_or_False" && this.type != "Fill_in_the_blanks") {
      this._calcScoreService.getExpectedAnswer()
        .subscribe(data => {
          this.expAnswer = data.entities;
          this.answer = [];
          var ansLen = Object.keys(this.expAnswer).length;
          var count = 0;
          for (var i = 0; i < ansLen; i++) {
            if (this.expAnswer[i].type == this.type) {
              this.ansArray[count] = this.expAnswer[i].text;
              count++;
            }
          }
          this.score = this.ansArray.length;
          this.answer[0] = this.ansArray.join(",");
        });
    } else {
      this.ansArray[0] = this.answer[0];
      this.score = this.ansArray.length;
      var match = this.question.match(/[a-zA-Z]+/g);
      this.type = this.type + '_' + match.join('_');
    }
  }

  gotoUpdateData() {
    this.quesData = {
      "Type": this.type,
      "Question": this.question,
      "Mark": this.mark,
      "Score": this.score,
      "Answer": this.answer
    }
    this._configureService.addQuesData(this.quesData)
      .subscribe(data => {
        this.dataUpdated = true;
      })
  }
}