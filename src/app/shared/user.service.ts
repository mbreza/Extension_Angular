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

  signIn(username: string, password: string, checkbox: boolean): Promise<any> {
    return browser.storage.local.get({ 'userList': [] }).then((res) => {
      return new Promise((resolve) => {
        var users = res.userList;
        users.some((user: User) => {
          if (user.username === username && user.password === password && checkbox === true) {
            browser.storage.local.set({ currentUser: user, signInType: "permanentlySignedIn" });
            resolve({ signInType: "permanentlySignedIn", currentUser: user  });
            return true;
          }
          else if (user.username === username && user.password === password && checkbox === false) {
            browser.runtime.sendMessage({ type: "signIn", currentUser: user });
            browser.storage.local.set({ signInType: "temporarilySignedIn" });
            resolve({ signInType: "temporarilySignedIn", currentUser: user });
            return true;
          }
        });
        resolve({ signInType: "notSignedIn" });
      });
    });
  }

  signOut(): Promise<any>{
    return browser.storage.local.get(['currentUser', 'signInType']).then((res) => {
      return new Promise((resolve) => {
        if(res.signInType === 'permanentlySignedIn'){
          browser.storage.local.set({ signInType: "notSignedIn", currentUser: undefined });
        } else if (res.signInType === 'temporarilySignedIn'){
          browser.runtime.sendMessage({ type: "signOut" });
          browser.storage.local.set({ signInType: "notSignedIn" });
        }
        resolve('notSignedIn');
      })
    })
  }

  generateMessage(message: String): Promise<any>{
    return browser.storage.local.get(['userList', 'currentUser']).then((res) => {
      return new Promise(async (resolve) => {
        if(res.currentUser !== undefined){
          const privKeyObj = (await this.openpgp.key.readArmored(res.currentUser.privateKey)).keys[0]
          await privKeyObj.decrypt(res.currentUser.password); 
          const options = {
              message: this.openpgp.message.fromText(message),       
              publicKeys: (await this.openpgp.key.readArmored(res.currentUser.publicKey)).keys,
              privateKeys: [privKeyObj] 
          }
          this.openpgp.encrypt(options).then(ciphertext => {
            resolve(ciphertext.data);
          })
        } else {
          resolve('Not logged in!');
        }
      })   
    })
  }
}
