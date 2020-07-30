import { Component, OnInit } from '@angular/core';
import { ExamService } from '../service/exam.service';
import { Router } from '@angular/router';
import { ConfigureDataService } from '../service/configure-data.service';

@Component({
  selector: 'app-configure-questions',
  templateUrl: './configure-questions.component.html',
  styleUrls: ['./configure-questions.component.css']
})
export class ConfigureQuestionsComponent implements OnInit {

  public quesText = "";
  public ansText = "";
  public selectedMark = "--Select--";
  marks: Array<Object> = [
    { mark: 1, markText: "1 mark" },
    { mark: 2, markText: "2 marks" },
    { mark: 3, markText: "3 marks" },
    { mark: 5, markText: "5 marks" }
  ];
  public type = "--Select--";
  public entities;
  public showErrorMessage = false;

  constructor(private _examService: ExamService, private router: Router,
    private _configureService: ConfigureDataService) { }

  ngOnInit(): void {
    this._configureService.getEntities()
      .subscribe(data => {
        this.entities = data.entityTypes;
        var quesLen = Object.keys(this.entities).length;
      });
  }

  gotoAnalyseQues(url, selectedMark, type, quesText, ansText) {
    if (selectedMark != "--Select--" && type != "--Select--" && quesText.length > 0 && ansText.length > 0) {
      this.showErrorMessage = false;
      this._examService.setQuesData(type, ansText, quesText, selectedMark, 0);
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
}