import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '@app/shared/alert/alert.service';
import { AuthService } from '@app/core/services/auth.service';
import { WebsocketService } from '@app/core/services/websocket.service';
import { SocketEventType } from '@app/core/models/socket-event-type';
import { SocketEvent } from '@app/core/models/socket-event';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-linked-in',
  templateUrl: './linked-in.component.html',
  styleUrls: ['./linked-in.component.styl']
})
export class LinkedInComponent implements OnInit, OnDestroy {

  private wsSub: Subscription;

  constructor(
    private readonly alert: AlertService,
    private readonly authService: AuthService,
    private readonly websocketService: WebsocketService
  ) {}

  ngOnInit() {
    this.wsSub = this.websocketService.messages$.subscribe( (m) => console.log('got event:', m) );
  }

  ngOnDestroy() {
    this.wsSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

  ping() {
    this.websocketService.send({ type: SocketEventType.MESSAGE, message: 'Siema linkedinie' });
  }

}
