import { Component, OnInit } from '@angular/core';
import { browser } from "webextension-polyfill-ts";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  createForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.createForm = new FormGroup({
      'username': new FormControl(null),
      'email': new FormControl(null),
      'password': new FormControl(null),
      'confirmPassword': new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.createForm);
  }

}
