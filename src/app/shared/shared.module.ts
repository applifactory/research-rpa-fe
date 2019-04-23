import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from './alert/alert.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AlertModule
  ], 
  exports: [
    AlertModule
  ]
})
export class SharedModule { }
