import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from '../shared/validator.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  createForm: FormGroup;

  constructor(
    private userService: UserService,
    private validatorService: ValidatorService) { }

  ngOnInit() {
    this.createForm = new FormGroup({
      'username': new FormControl(null, [Validators.required], [this.validatorService.checkExists("username")]),
      'email': new FormControl(null, [Validators.required, Validators.email], [this.validatorService.checkExists("email")]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'confirmPassword': new FormControl(null, [Validators.required])
    },
      this.validatorService.mustMatch
    );
  }

  onSubmit() {
    console.log('cos sie dzieje')
    if (this.createForm.valid) {
      console.log(this.createForm);
      this.userService.signUp(
        this.createForm.controls.username.value,
        this.createForm.controls.email.value,
        this.createForm.controls.password.value);
      this.createForm.reset();
    }
  }

  onReset() {
    this.createForm.reset();
  }
}
