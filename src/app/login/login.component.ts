import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '@app/core/services/auth.service';
import { AlertService } from '@app/shared/alert/alert.service';
import { AlertType } from '@app/shared/alert/models/alert-type';
import { User } from '../core/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent {

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor( 
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly alert: AlertService
  ) {}

  public async onSubmit() {
    if ( !this.loginForm.valid ) {
      return;
    }
    this.alert.removeAll();
    try {
      const user: User = await this.authService.login(
        this.loginForm.value.email, 
        this.loginForm.value.password
      );
      this.alert.add(`Hi ${user.name}!`, AlertType.Success);
    } catch(e) {
      this.alert.add(e.message, AlertType.Danger);
    }
  }

}
