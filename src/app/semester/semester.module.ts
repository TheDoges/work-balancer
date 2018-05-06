import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SemesterComponent } from './semester.component';
import { SharedModule } from '../shared';

const semesterRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'semesters',
    component: SemesterComponent
    // canActivate: [AuthGuardService]
  }
]);

@NgModule({
  imports: [
    semesterRouting,
    SharedModule
  ],
  declarations: [SemesterComponent]
})
export class SemesterModule { }
