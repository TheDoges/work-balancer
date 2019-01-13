import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningComponent } from './planning.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PlanningTableComponent } from './planning-table/planning-table.component';
import { ProfessorSelectComponent } from './professor-select/professor-select.component';
import { ProfessorInfoComponent } from './professor-info/professor-info.component';
import { AuthGuardService } from '../shared/services/authguard.service';

const planningRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'planning',
    component: PlanningComponent,
    canActivate: [AuthGuardService]
  }
]);

@NgModule({
  imports: [
    planningRouting,
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    ProfessorSelectComponent
  ],
  declarations: [
    PlanningComponent,
    PlanningTableComponent,
    ProfessorSelectComponent,
    ProfessorInfoComponent
  ]
})
export class PlanningModule { }
