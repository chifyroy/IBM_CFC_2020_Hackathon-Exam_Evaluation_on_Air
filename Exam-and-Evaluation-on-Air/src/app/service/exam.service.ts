import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private studentData = {};
  private quesData = {};
  private scoreData = {};
  private submittedData = {};
  private examDetails = {};

  constructor() { }

  setStudentData(examName: string, stName: string, stId: string) {
    this.studentData[0] = {
      "examName": examName,
      "stName": stName,
      "stId": stId
    }
  }
  getStudentData() {
    return this.studentData;
  }

  setQuesData(type: string, ans: string, ques: string, mark: number, score: number) {
    this.quesData[0] = {
      "ans": ans,
      "ques": ques,
      "mark": mark,
      "score": score,
      "type": type
    };
  }
  getQuesData() {
    return this.quesData;
  }

  setScoreData(mark: number, score: number, scoredMark: number) {
    this.scoreData[0] = {
      "mark": mark,
      "score": score,
      "scoredMark": scoredMark
    };
  }
  getScoreData() {
    return this.scoreData;
  }

  setAnswers(data) {
    var dataLen = Object.keys(data).length;
    for (var i = 0; i < dataLen; i++) {
      this.submittedData[i] = {
        "ans": data[i].providedAnswer,
        "ques": data[i].Question,
        "mark": data[i].Mark,
        "score": data[i].Score,
        "type": data[i].Type,
        "scoreCalculated": data[i].scoreCalculated,
        "totalScore": data[i].totalScore
      }
    }
  }
  getAnswers() {
    return this.submittedData;
  }

  setExamDetails(selectedExam, selectedSubject, selectedStd, selectedEnt) {
    this.examDetails[0] = {
      "selectedExam": selectedExam,
      "selectedSubject": selectedSubject,
      "selectedStd": selectedStd,
      "selectedEnt": selectedEnt
    };
  }
  getExamDetails() {
    return this.examDetails;
  }
}