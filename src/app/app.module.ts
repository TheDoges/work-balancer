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
import { ProfessorsModule } from './professors/professors.module';
import { LecturesModule } from './lectures/lectures.module';

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
    LecturesModule
  ],
  providers: [
    ApiService,
    WebsocketService,
    ProfessorService,
    ClassService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
