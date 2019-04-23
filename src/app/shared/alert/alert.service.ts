import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alert } from './models/alert';
import { AlertType } from './models/alert-type';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public alerts$: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([]);

  public add( message: string, type: AlertType = AlertType.Info ): void {
    const alerts: Alert[] = Array.from(this.alerts$.value),
          id: string = uuid(),
          alert: Alert = {
            message, 
            type, 
            id
          }
    alerts.push(alert);
    this.alerts$.next(alerts);
    setTimeout( () => this.remove(alert), 5000 );
  }

  public remove( alert: Alert ) {
    const index: number = this.alerts$.value.findIndex( ( a: Alert ) => a.id == alert.id );
    if ( index >= 0 ) {
      const alerts: Alert[] = Array.from(this.alerts$.value);
      alerts.splice(index, 1);
      this.alerts$.next(alerts);
    }
  }

}
