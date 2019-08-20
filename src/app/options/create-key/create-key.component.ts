import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from '../../shared/validator.service';

@Component({
  selector: 'app-create-key',
  templateUrl: './create-key.component.html',
  styleUrls: ['./create-key.component.css']
})
export class CreateKeyComponent implements OnInit {

  createForm: FormGroup;
  creating: boolean;

  constructor(
    private userService: UserService,
    private validatorService: ValidatorService) { }

  ngOnInit() {
    this.creating = false;
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
      this.creating = true;
      this.userService.createKey(
        this.createForm.controls.username.value,
        this.createForm.controls.email.value,
        this.createForm.controls.password.value).then((res) => {
          console.log(res);
          this.creating = false;
          this.createForm.reset();
        });
      
    }
  }

  onReset() {
    this.createForm.reset();
  }

}
