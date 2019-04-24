import { Injectable } from '@angular/core';
import { environment } from '@env';
import { AuthService } from './auth.service';
import * as socketIo from 'socket.io-client';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { SocketStatus } from '../models/socket-status';
import { SocketEvent } from '../models/socket-event';
import { SocketEventType } from '../models/socket-event-type';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  
  public event$: Subject<SocketEvent> = new Subject();
  public status$: BehaviorSubject<SocketStatus> = new BehaviorSubject(SocketStatus.DISCONNECTED);
  
  private socket;

  constructor(private authService: AuthService) { 
    authService.user$.subscribe( (user) => {
      if ( user ) {
        this.connect();
      } else {
        this.disconnect();
      }
    })
  }

  connect() {
    if ( this.socket && this.socket.connected ) {
      return;
    }
    if ( !this.socket  ) {
      this.socket = socketIo(environment.apiUrl, { query: { token: this.authService.getAuthToken() }});
      this.socket.on('connect', () => this.status$.next(SocketStatus.CONNECTED) );
      this.socket.on('reconnecting', () => this.status$.next(SocketStatus.CONNECTING) );
      this.socket.on('reconnect_attempt', () => this.status$.next(SocketStatus.CONNECTING) );
      this.socket.on('reconnect', () => this.status$.next(SocketStatus.CONNECTED) );
      this.socket.on('disconnect', () => this.status$.next(SocketStatus.DISCONNECTED) );
      this.socket.on('event', (event: SocketEvent) => this.event$.next(event) );
      this.socket.on('error', (error) => {
        if ( error.statusCode === 401 ) {
          this.socket.close();
        }
      })
    } else {
      this.socket.query = { token: this.authService.getAuthToken() };
      this.socket.connect();
    }
  }

  disconnect() {
    if ( this.socket ) {
      if ( this.socket.connected ) {
        this.socket.close();
      }
      delete this.socket.query;
    }
  }

  send(event: SocketEvent) {
    if ( this.socket && this.socket.connected ) {
      this.socket.emit('event', event);
    }
  }

  get messages$(): Observable<string> {
    return this.event$.pipe( 
      filter( (event: SocketEvent) => event.type === SocketEventType.MESSAGE ),
      map( (event: SocketEvent) => event.message )
    )
  }

}
