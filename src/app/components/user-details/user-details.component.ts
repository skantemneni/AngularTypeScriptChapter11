import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';
import { BroadcastService, EventKeys } from '../../services/broadcast.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  loggedInUserName: string = "logged_in_user";
  isLoggedIn: boolean = false;

  @Output()
  notify = new EventEmitter();

  constructor(private broadcastService: BroadcastService) {
    _.bindAll(this, "loginSuccessful");
    this.broadcastService.on(EventKeys.USER_LOGIN_EVENT)
      .subscribe(this.loginSuccessful);
  }
  loginSuccessful(loginUser: string) {
    console.log(
      `UserDetailsComponent.loginSuccessful : ${loginUser}`);
    this.loggedInUserName = loginUser;
    this.isLoggedIn = true;
  }

  ngOnInit(): void {
  }

  onLoginClicked() {
    this.broadcastService.broadcast(EventKeys.LOGIN_BUTTON_CLICKED, "UserDetailsComponent: LOGIN_BUTTON_CLICKED");

  }

  onLogoutClicked(): void {
    this.loggedInUserName = "";
    this.isLoggedIn = false;
  }

}
