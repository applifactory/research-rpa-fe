import { Component } from '@angular/core';
import { AlertService } from './alert.service';
import { BehaviorSubject } from 'rxjs';
import { Alert } from './models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.styl']
})
export class AlertComponent {

  public alerts$: BehaviorSubject<Alert[]>;
  public alertIcons: { [key: string]: string } = {
    info: 'info',
    warning: 'exclamation',
    success: 'check-circle',
    danger: 'exclamation-triangle'
  };

  constructor(private readonly alertService: AlertService) {
    this.alerts$ = alertService.alerts$;
  }

  remove(alert: Alert) {
    this.alertService.remove(alert);
  }

}
