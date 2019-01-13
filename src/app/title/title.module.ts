import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './title.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { AuthGuardService } from '../shared/services/authguard.service';

const titleRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'titles',
    component: TitleComponent,
    canActivate: [AuthGuardService]
  }
]);

@NgModule({
  imports: [
    titleRouting,
    SharedModule
  ],
  declarations: [TitleComponent]
})
export class TitleModule { }
