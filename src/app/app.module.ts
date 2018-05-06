import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders, enableProdMode } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ApiService } from './shared/services/api.service';
import { WebsocketService } from './shared/services/websocket.service';
import { HeaderComponent } from './shared/layout/header.component';
import { SharedModule } from './shared/shared.module';
import { PlanningModule } from './planning/planning.module';
import { LecturerModule } from './lecturer/lecturer.module';
import { TitleModule } from './title/title.module';
import { SemesterModule } from './semester/semester.module';
import { SubjectModule } from './subject/subject.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubjectService } from './shared/services/subject.service';
import { DegreeService } from './shared/services/degree.service';
import { LecturerService } from './shared/services/lecturer.service';
import { TitleService } from './shared/services/title.service';
import { LinkService } from './shared/services/link.service';
import { SemesterService } from './shared/services/semester.service';
import { AuthService } from './shared/services/auth.service';
import { CredentialService } from './shared/services/credential.service';
import { AuthGuardService } from './shared/services/authguard.service';
import { LoadingService } from './shared/services/loading.service';
import { FieldService } from './shared/services/field.service';

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
    SubjectModule,
    TitleModule,
    SemesterModule,
    LoginModule,
    RegisterModule
  ],
  providers: [
    ApiService,
    WebsocketService,
    SubjectService,
    DegreeService,
    LecturerService,
    TitleService,
    LinkService,
    SemesterService,
    AuthService,
    AuthGuardService,
    CredentialService,
    LoadingService,
    FieldService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
