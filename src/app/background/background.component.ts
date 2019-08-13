import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    browser.runtime.onStartup.addListener(() => {
      browser.storage.local.get(['signInType']).then((res) =>{
        if(res.signInType === 'temporarilySignedIn'){
          browser.storage.local.set({ signInType: "notSignedIn" });
        }
      });
  });

    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'signIn') {
        sessionStorage.setItem('currentUser', JSON.stringify(message.currentUser));
      } else if (message.type === 'currentSignIn') {
        browser.storage.local.get(['currentUser', 'signInType']).then((res) => {
          if (res.signInType === "permanentlySignedIn") {
            sendResponse({
              signInType: "permanentlySignedIn",
              currentUser: res.currentUser
            });
          } else if (res.signInType === "temporarilySignedIn") {
            sendResponse({
              signInType: "temporarilySignedIn",
              currentUser: JSON.parse(sessionStorage.getItem("currentUser"))
            });
          } else {
            sendResponse({ signInType: "notSignedIn" });
          }
        });
      } else if (message.type === 'decrypt') {
        browser.storage.local.get(['currentUser', 'signInType']).then((res) => {
          if (res.signInType === "permanentlySignedIn") {
            this.userService.decrypt(message.content, res.currentUser).then((res) => {
              sendResponse(res)
            });
          } else if (res.signInType === "temporarilySignedIn") {
            this.userService.decrypt(message.content, JSON.parse(sessionStorage.getItem("currentUser"))).then((res) => {
              sendResponse(res)
            });
          } else {
            sendResponse('notSignedIn');
          };
        });
      } else if (message.type === 'signOut') {
        sessionStorage.removeItem("currentUser");
      } else {
        sendResponse(message.type);
      }
      return true;
    });
  }
}
