import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
    
  }


}
