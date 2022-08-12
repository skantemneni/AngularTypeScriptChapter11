import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import * as _ from 'lodash';
import { BroadcastService, EventKeys } from './services/broadcast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-app';
  @ViewChild("sidenav") sidenav: MatSidenav | null = null;

  constructor(broadCastService: BroadcastService) {
    // Note that the list of function names here is critical.
    // for example, on onLoginEvent(onLoginEvent: any) method, this.sidenav WILL BE NULL if this binding does not happen for that function.
    //********
    _.bindAll(this, "onLoginClicked", "onLoginEvent");
    //********//

    broadCastService.on(EventKeys.LOGIN_BUTTON_CLICKED)
      .subscribe(this.onLoginClicked);
    broadCastService.on(EventKeys.USER_LOGIN_EVENT)
      .subscribe(this.onLoginEvent);
  }
  onLoginClicked(event: string | any) {
    console.log(`AppComponent.onLoginClicked received : ${event}`);
    if (this.sidenav != null) {
      this.sidenav?.open();
    } else {
      console.log(`this.sidenav is NULL`);
    }
  }

  onLoginEvent(onLoginEvent: any) {
    console.log(`AppComponent.onLoginEvent received : ${event}`);
    if (this.sidenav != null) {
      this.sidenav?.close();
    } else {
      console.log(`this.sidenav is NULL`);
    }
  }

}
