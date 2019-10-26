import { Component, OnInit } from '@angular/core';
import { browser } from "webextension-polyfill-ts";
import { User } from '../shared/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { saveAs } from 'file-saver';
import { AesService } from '../shared/aes.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  loginAttempt: boolean;
  currentUser: User;
  logInStatus: string;
  logInForm: FormGroup;
  exportForm: FormGroup;
  CryptoJS = require("crypto-js");
  JSZip = require("jszip");

  constructor(
    private userService: UserService,
    private aesService: AesService) { }

  ngOnInit() {
    this.logInForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'checkbox': new FormControl(null)
    });
    this.logInForm.patchValue({
      'checkbox': true
    });
    this.exportForm = new FormGroup({
      'password': new FormControl(null, [Validators.required])
    });

    browser.runtime.sendMessage({
      type: "currentSignIn"
    }).then((response) => {

      this.logInStatus = response.signInType;
      this.currentUser = response.currentUser;
    });

    this.loginAttempt=false;
  }

  onSubmit() {
    this.userService.signIn(
      this.logInForm.controls.username.value,
      this.logInForm.controls.password.value,
      this.logInForm.controls.checkbox.value).then((response) => {
        console.log(response);

        if(response.signInType === 'notSignedIn'){
          this.loginAttempt=true;
        } else{
          this.loginAttempt=false;
        }

        this.logInStatus = response.signInType;
        this.currentUser = response.currentUser;
      });
  }

  onSignOut() {
    this.userService.signOut().then((response) => {
      this.logInStatus = response;
    });
  }

  exportKeys() {
    var iv = this.CryptoJS.lib.WordArray.random(128 / 8).toString(this.CryptoJS.enc.Hex);
    var salt = this.CryptoJS.lib.WordArray.random(128 / 8).toString(this.CryptoJS.enc.Hex);
    this.aesService.setValues(128, 10000);

    var publicKey = this.aesService.encrypt(
      salt,
      iv,
      this.exportForm.controls.password.value,
      this.currentUser.publicKey);
      
    var privateKey = this.aesService.encrypt(
      salt,
      iv,
      this.exportForm.controls.password.value,
      this.currentUser.privateKey);

    var zip = new this.JSZip();
    zip.file("privateKey.pgp", privateKey);
    zip.file("publicKey.pgp", publicKey);
    zip.file("salt.txt", salt);
    zip.file("iv.txt", iv);
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "encryptedKeys.zip");
    });
    this.exportForm.reset();
  }
}