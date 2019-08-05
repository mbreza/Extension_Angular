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
      browser.storage.local.get({ 'userList': [] }).then((res) => {
        var user = new User(
          username,
          email,
          password,
          key.privateKeyArmored,
          key.publicKeyArmored,
          key.revocationCertificate);

        res.userList.push(user);
        browser.storage.local.set({ userList: res.userList });
      })
    })
  }

  signIn(username: string, password: string) {
    browser.storage.local.get({ 'userList': [] }).then((res) => {
      var users = res.userList;
      users.some((user: User) => {
        if (user.username === username && user.password === password) {
          browser.storage.local.set({
            singedIn: new User(
              user.username,
              user.emailaddress,
              null,
              user.privateKey,
              user.publicKey,
              user.revocationCertificate)
          });
          return true;
        }
      })
    })
  }
}
