import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectComponent } from './subject.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';

const subjectrouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'subjects',
    component: SubjectComponent
    // canActivate: [AuthGuardService]
  }
]);

@NgModule({
  imports: [
    subjectrouting,
    SharedModule
  ],
  declarations: [
    SubjectComponent
  ]
})
export class SubjectModule { }
