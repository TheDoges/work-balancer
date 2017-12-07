import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LecturesComponent } from './lectures.component';
import { RouterModule } from '@angular/router';

const lecturesRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'lectures',
    component: LecturesComponent
    // canActivate: [AuthGuardService]
  }
]);

@NgModule({
  imports: [
    lecturesRouting,
    CommonModule
  ],
  declarations: [LecturesComponent]
})
export class LecturesModule { }
