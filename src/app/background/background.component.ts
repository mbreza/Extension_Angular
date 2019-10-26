import { Component, OnInit } from '@angular/core';
import { browser } from "webextension-polyfill-ts";
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
        } else if (message.type === 'encrypt') {
          this.userService.encryptMessage(message.content, message.key).then((res) => {
            resolve({encryptedMessage: res});
          });
        } else if(message.type === 'decrypt'){
          this.userService.decryptMessage(message.content, message.key).then((res) => {
            resolve({decryptedMessage: res});
          })
        } else {
          resolve("I don't understand.");
        }
      })
    });
  }
}
