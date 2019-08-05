import { Component, OnInit } from '@angular/core';
import { browser } from "webextension-polyfill-ts";
import { User } from '../shared/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  logInForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.logInForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'checkbox': new FormControl(null)
    });

    // browser.storage.local.get('userList').then((res) => {
    //   if(res.userList !== undefined){
    //     var users = res.userList
    //     console.log(users);
    //     console.log(users.length);
    //     users.forEach((user: User) => {
    //       console.log(user.username);
    //     });
    //   }
    // })
  }

  onSubmit(){
    browser.runtime.sendMessage("Moja wiadomosc").then((response) => {
      console.log(response);
  });

  }
}