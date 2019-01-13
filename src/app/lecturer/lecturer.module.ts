import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LecturerComponent } from './lecturer.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { AuthGuardService } from '../shared/services/authguard.service';

const lecturerRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'lecturers',
    component: LecturerComponent,
    canActivate: [AuthGuardService]
  }
]);

@NgModule({
  imports: [
    lecturerRouting,
    SharedModule
  ],
  declarations: [LecturerComponent]
})
export class LecturerModule { }
