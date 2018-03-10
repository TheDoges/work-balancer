import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LecturesComponent, CapitalizePipe } from './lectures.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';

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
    SharedModule
  ],
  declarations: [
    LecturesComponent,
    CapitalizePipe
  ]
})
export class LecturesModule { }
