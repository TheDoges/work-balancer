import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/services/authguard.service';

const registerRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuardService]
  }
]);

@NgModule({
  imports: [
    registerRouting,
    SharedModule
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
