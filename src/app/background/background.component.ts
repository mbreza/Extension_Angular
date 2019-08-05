import { Component, OnInit } from '@angular/core';
import { browser } from "webextension-polyfill-ts";

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('background');

    browser.runtime.onMessage.addListener((message) => {
      return new Promise((resolve, reject) => {
        resolve(" XD "+ message);
      })
    }); 



  //   browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //     if (request.type == "Login") {
  //         let user = new User(request.name, null, null,
  //             request.privkey, request.publicKey, null);
  
  //         sessionStorage.setItem("currentUser", JSON.stringify(user));
  //     } else if (request.type == "send") {
  //         console.log("response");
  //         sendResponse({ currentUser: sessionStorage.getItem("currentUser") });
  //     } else if (request.type == "Logout"){
  //         sessionStorage.removeItem("currentUser");
  //     }
  // });
  }

}
