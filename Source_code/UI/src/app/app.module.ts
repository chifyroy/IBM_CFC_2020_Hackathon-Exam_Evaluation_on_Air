import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { AnalyseScoreComponent } from './analyse-score/analyse-score.component';
import { SubmitExamComponent } from './submit-exam/submit-exam.component';
import { StartComponent } from './start/start.component';
import { ConfigureQuestionsComponent } from './configure-questions/configure-questions.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { ExamDetailsComponent } from './exam-details/exam-details.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PageNotFoundComponent,
    InstructionsComponent,
    AnalyseScoreComponent,
    SubmitExamComponent,
    StartComponent,
    ConfigureQuestionsComponent,
    UpdateDataComponent,
    ExamDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
