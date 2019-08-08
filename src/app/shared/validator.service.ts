import { Injectable } from '@angular/core';
import { FormGroup, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { browser } from "webextension-polyfill-ts";

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  mustMatch(createForm: FormGroup): { [s: string]: boolean } {
    let pass = createForm.controls.password.value;
    let confirmPassword = createForm.controls.confirmPassword.value;

    if (pass !== confirmPassword) {
      createForm.controls['confirmPassword'].setErrors({ 'mustMatch': true });
      return { notSame: true };
    } else {
      return null;
    }
  }

  checkExists(type: String): AsyncValidatorFn {
    return (createForm: FormGroup): Promise<any> | Observable<any> => {
      const promise = new Promise<any>((resolve, reject) => {
        browser.storage.local.get({ 'userList': [] }).then((res) => {
          let guard = false;
          var users = res.userList;
          users.some((user: User) => {
            if (user.username === createForm.value && type === "username" ||
                user.emailaddress === createForm.value && type === "email") {
              guard = true;
              return true;
            }
          });
          if (guard) {
            resolve({ 'usernameExists': true });
          } else {
            resolve(null);
          }
        })
      })
      return promise;
    }
  }

}
