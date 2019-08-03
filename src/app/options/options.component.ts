import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  createForm: FormGroup;

  constructor(private userService : UserService) { }

  ngOnInit() {
    this.createForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'confirmPassword': new FormControl(null, [Validators.required])
    },
      this.checkPasswords
    );
  }

  onSubmit() {
    console.log('cos sie dzieje')
    if (this.createForm.invalid) {
      return;
    }
    console.log(this.createForm);
    this.userService.signUp(
      this.createForm.controls.username.value,
      this.createForm.controls.email.value,
      this.createForm.controls.password.value);
    // this.userService.signUp(
    //   this.createForm.controls.username.value,
    //   this.createForm.controls.email.value,
    //   this.createForm.controls.password.value);
  }

  onReset() {
    this.createForm.reset();
  }

  checkPasswords(createForm: FormGroup) {
    let pass = createForm.controls.password.value;
    let confirmPassword = createForm.controls.confirmPassword.value;

    if (pass !== confirmPassword && createForm.get('confirmPassword').touched) {
      createForm.controls['confirmPassword'].setErrors({ 'incorrect': true });
      return { notSame: true };
    } else {
      return null;
    }
  }
}
