import { Injectable } from '@angular/core';
import { filter, map, Observable, Subject } from 'rxjs';

export enum EventKeys {
  ALL = "all-events",
  LOGIN_BUTTON_CLICKED = "login_button_clicked",
  USER_LOGIN_EVENT = "user_login_event"
}

export interface IBroadcastEvent {
  key: EventKeys;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {

  private _eventBus = new Subject<IBroadcastEvent>();

  on(key: EventKeys): Observable<string> {
    return this._eventBus.asObservable().pipe(
/*      map((value: any) => {
        console.log(`onKey : ${key}`);
        console.log(`Received value : ${JSON.stringify(value)}`);
        return value;
      }),
*/
      filter(event => event.key === key || event.key === EventKeys.ALL),
      map(event => event.data)
/*      ,
      map(event => {
        console.log(`did I make it this far Received value : ${JSON.stringify(event)}`);
        return event;
      })
*/    );
  }

  broadcast(key: EventKeys, data: string) {
//    console.log(`BroadcastService broadcasting: ${key}, ${data}`);
    this._eventBus.next({ key, data });
  }

  constructor() { }
}


