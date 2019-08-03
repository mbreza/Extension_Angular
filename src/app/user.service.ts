import { Injectable } from '@angular/core';
import { User } from './user.model';
import { browser } from "webextension-polyfill-ts";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  openpgp = require('openpgp');

  constructor() { }

  signUp(username: string, email: string, password: string) {
    var options = {
      userIds: [{ name: username, email: email }],
      numBits: 4096,
      passphrase: password
    };
    this.openpgp.generateKey(options).then((key) => {
      browser.storage.local.get('userList').then((res) => {
        var user = new User(
          username,
          email,
          password,
          key.privateKeyArmored,
          key.publicKeyArmored,
          key.revocationCertificate);

        if (res.userList === undefined) {
          browser.storage.local.set({ userList: [user] });
        } else {
          res.userList.push(user);
          browser.storage.local.set({ userList: res.userList });
        }
      })
    })
  }

  signIn(username: string, password: string) {
    browser.storage.local.get('userList').then((res) => {
      var users = res.userList;
      users.some((user) => {
        if (user.name === username && user.password === password) {
          browser.storage.local.set({
            singedIn: new User(
              user.name,
              user.email,
              null,
              user.privateKeyArmored,
              user.publicKeyArmored,
              user.revocationCertificate)
          });
          return;
        }
      })
    })
  }
}
