import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders, enableProdMode } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ApiService } from './shared/services/api.service';
import { WebsocketService } from './shared/services/websocket.service';
import { HeaderComponent } from './shared/layout/header.component';
import { SharedModule } from './shared/shared.module';
import { PlanningModule } from './planning/planning.module';
import { ProfessorService } from './shared/services/professor.service';
import { ClassService } from './shared/services/class.service';
import { StudyService } from './shared/services/study.service';
import { StudyKindService } from './shared/services/study-kind.service';
import { StudyFormService } from './shared/services/study-form.service';
import { LecturerModule } from './lecturer/lecturer.module';
import { SubjectModule } from './subject/subject.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubjectService } from './shared/services/subject.service';
import { DegreeService } from './shared/services/degree.service';
import { LecturerService } from './shared/services/lecturer.service';
import { TitleService } from './shared/services/title.service';
import { LinkService } from './shared/services/link.service';

enableProdMode();

const rootRouting: ModuleWithProviders = RouterModule.forRoot([
  { path: '', redirectTo: '/planning', pathMatch: 'full' }
], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    rootRouting,
    PlanningModule,
    LecturerModule,
    BrowserAnimationsModule,
    SubjectModule
  ],
  providers: [
    ApiService,
    WebsocketService,
    ProfessorService,
    ClassService,
    StudyFormService,
    StudyKindService,
    StudyService,
    SubjectService,
    DegreeService,
    LecturerService,
    TitleService,
    LinkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
