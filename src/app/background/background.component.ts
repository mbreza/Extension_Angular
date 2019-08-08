import { Component, OnInit } from '@angular/core';
import { browser } from "webextension-polyfill-ts";
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    browser.runtime.onMessage.addListener((message) => {
      return new Promise((resolve, reject) => {
        if (message.type === 'signIn') {
          sessionStorage.setItem('currentUser', JSON.stringify(message.currentUser));
        } else if (message.type === 'currentSignIn') {
            browser.storage.local.get(['currentUser', 'signInType']).then((res) => {
              if(res.signInType === "permanentlySignedIn"){
                resolve({
                  signInType: "permanentlySignedIn",
                  currentUser: res.currentUser
                });
              } else if(res.signInType === "temporarilySignedIn"){
                resolve({
                  signInType: "temporarilySignedIn",
                  currentUser: JSON.parse(sessionStorage.getItem("currentUser"))
                });
              } else {
                resolve({ signInType: "notSignedIn" });
              }
            });
        } else if (message.type === 'signOut') {
          sessionStorage.removeItem("currentUser");
        } else {
          resolve("Nie rozumiem.");
        }
      })
    });
  }
}
