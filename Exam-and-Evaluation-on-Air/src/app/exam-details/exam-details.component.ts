import { Component, OnInit } from '@angular/core';
import { ConfigureDataService } from '../service/configure-data.service';
import { Router } from '@angular/router';
import { ExamService } from '../service/exam.service';

@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.css']
})
export class ExamDetailsComponent implements OnInit {

  public examType: [];
  public subjects: [];
  public standard: [];
  public entType: [];
  public selectedExam = "--Select--";
  public selectedSubject = "--Select--";
  public selectedStd = "--Select--";
  public selectedEnt = "--Select--";

  constructor(private _configureService: ConfigureDataService, private router: Router,
    private _examService: ExamService) { }

  ngOnInit(): void {
    this._configureService.getExamDetails()
      .subscribe(data => {
        this.examType = data.examType;
        this.subjects = data.subjectNames;
        this.standard = data.standard;
        this.entType = data.entType;
      });
  }

  gotoConfigureQues(url, selectedExam, selectedSubject, selectedStd, selectedEnt) {
    console.log(selectedExam + selectedSubject + selectedStd);
    this._examService.setExamDetails(selectedExam, selectedSubject, selectedStd, selectedEnt);
    this.router.navigate([url]).then((e) => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }
}