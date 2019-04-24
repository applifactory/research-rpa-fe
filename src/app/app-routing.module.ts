import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { UnauthGuard } from './core/guards/unauth.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [UnauthGuard],
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './linked-in/linked-in.module#LinkedInModule'
      }, 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
