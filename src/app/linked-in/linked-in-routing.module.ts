import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinkedInComponent } from './linked-in.component';

const routes: Routes = [
  {
    path: '',
    component: LinkedInComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinkedInRoutingModule { }
