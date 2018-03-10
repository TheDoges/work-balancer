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
import { ProfessorsModule } from './professors/professors.module';
import { LecturesModule } from './lectures/lectures.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    ProfessorsModule,
    BrowserAnimationsModule,
    LecturesModule
  ],
  providers: [
    ApiService,
    WebsocketService,
    ProfessorService,
    ClassService,
    StudyFormService,
    StudyKindService,
    StudyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
