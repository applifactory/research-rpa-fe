import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/shared/alert/alert.service';
import { AuthService } from '@app/core/services/auth.service';
import { User } from '@app/core/models/user';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-linked-in',
  templateUrl: './linked-in.component.html',
  styleUrls: ['./linked-in.component.styl']
})
export class LinkedInComponent implements OnInit {

  public user$: BehaviorSubject<User>;

  constructor(
    private readonly alert: AlertService,
    private readonly authService: AuthService
  ) { 
    this.user$ = this.authService.user$;
  }

  ngOnInit() {
    
  }

}
