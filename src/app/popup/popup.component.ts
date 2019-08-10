import { Component, OnInit } from '@angular/core';
import { browser } from "webextension-polyfill-ts";
import { User } from '../shared/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  currentUser: User;
  logInStatus: string;
  logInForm: FormGroup;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.logInForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'checkbox': new FormControl(null)
    });
    this.logInForm.patchValue({
      'checkbox': true
    });

    browser.runtime.sendMessage({
      type: "currentSignIn"
    }).then((response) => {
      console.log(response.signInType);
      console.log(response.currentUser);
      this.logInStatus = response.signInType;
      this.currentUser = response.currentUser;
    });
//////Tylko dla testów
    this.userService.generateMessage('Test message').then((result) => {
      console.log(result);
    })

    browser.storage.local.get(['userList', 'currentUser']).then((res) => {
      if (res.userList !== undefined) {
        var users = res.userList
        console.log(users);
        console.log(users.length);
        users.forEach((user: User) => {
          console.log(user.username);
        });
      }
    })
//////XDDDD
  }

  onSubmit() {
    this.userService.signIn(
      this.logInForm.controls.username.value,
      this.logInForm.controls.password.value,
      this.logInForm.controls.checkbox.value).then((response) => {
        console.log(response);
        this.logInStatus = response.signInType;
        this.currentUser = response.currentUser;
      });
  }

  onSignOut() {
    this.userService.signOut().then((response) => {
      this.logInStatus = response;
    });
  }
}