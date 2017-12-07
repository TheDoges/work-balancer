import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessorsComponent } from './professors.component';
import { RouterModule } from '@angular/router';

const professorsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'professors',
    component: ProfessorsComponent
    // canActivate: [AuthGuardService]
  }
]);

@NgModule({
  imports: [
    professorsRouting,
    CommonModule
  ],
  declarations: [ProfessorsComponent]
})
export class ProfessorsModule { }
