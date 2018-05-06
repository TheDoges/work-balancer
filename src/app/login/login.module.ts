import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatInputModule } from '@angular/material';

const loginRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: LoginComponent
  }
]);

@NgModule({
  imports: [
    loginRouting,
    SharedModule,
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
