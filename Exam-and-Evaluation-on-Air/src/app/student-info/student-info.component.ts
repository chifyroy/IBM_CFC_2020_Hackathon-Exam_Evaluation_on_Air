import { Component, OnInit } from '@angular/core';
import { ExamService } from '../service/exam.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {

  public examName = "Science (EVS)";
  public studentName: string = "";
  public studentId: string = "";
  constructor(private _examService: ExamService, private router: Router) { }

  ngOnInit(): void {
  }

  public gotoQuestions(url, stName, stId) {
    this._examService.setStudentData(this.examName, stName, stId);
    this.router.navigate([url]).then((e) => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }
}