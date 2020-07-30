import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentInfoComponent } from './student-info/student-info.component';
import { QuestionComponent } from './question/question.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { AnalyseScoreComponent } from './analyse-score/analyse-score.component';
import { SubmitExamComponent } from './submit-exam/submit-exam.component';
import { StartComponent } from './start/start.component';
import { ConfigureQuestionsComponent } from './configure-questions/configure-questions.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { ExamDetailsComponent } from './exam-details/exam-details.component';


const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full'},
  { path: 'start', component: StartComponent },
  { path: 'examDetails', component: ExamDetailsComponent },
  { path: 'configQuestions', component: ConfigureQuestionsComponent },
  { path: 'analyseQues', component: UpdateDataComponent },
  { path: 'examInfo', component: InstructionsComponent},
  { path: 'studentDetails', component: StudentInfoComponent},
  { path: 'questions', component: QuestionComponent },
  { path: 'analyseScore', component: AnalyseScoreComponent },
  { path: 'analyseScore/:text', component: AnalyseScoreComponent },
  { path: 'submitExam', component: SubmitExamComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [StudentInfoComponent, QuestionComponent, PageNotFoundComponent, 
  AnalyseScoreComponent, SubmitExamComponent, StartComponent,
  ConfigureQuestionsComponent, UpdateDataComponent, ExamDetailsComponent]