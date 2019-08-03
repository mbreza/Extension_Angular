import { Component, OnInit } from '@angular/core';
import { browser } from "webextension-polyfill-ts";
import { User } from '../user.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  asdf: String = "ASDF";

  constructor() { }

  ngOnInit() {
    browser.storage.local.get('userList').then((res) => {
      if(res.userList !== undefined){
        var users = res.userList
        console.log(users);
        console.log(users.length);
        users.forEach((user: User) => {
          console.log(user.username);
        });
      }
    })
  }

}