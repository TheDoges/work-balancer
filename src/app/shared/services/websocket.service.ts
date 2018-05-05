import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WebsocketService {
  
  constructor() { }
  
  private subject: Rx.Subject<MessageEvent>;
  
  public connect(url): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected: ' + url);
    }
    return this.subject;
  }
  
  private create(url): Rx.Subject<MessageEvent> {
    const ws = new WebSocket(url);
    ws.addEventListener('open', function (event) {
      ws.send(JSON.stringify({
        type: 'CLIENT'
      }));
    });
    
    const observable = Rx.Observable.create(
      (emitter: Rx.Observer<MessageEvent>) => {
        ws.onmessage = emitter.next.bind(emitter);
        ws.onerror = emitter.error.bind(emitter);
        ws.onclose = emitter.complete.bind(emitter);
        return ws.close.bind(ws);
      });
      const observer = {
        next: (data: Object) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(data));
          }
        }
      };
      return Rx.Subject.create(observer, observable);
    }
    
    
  }
  