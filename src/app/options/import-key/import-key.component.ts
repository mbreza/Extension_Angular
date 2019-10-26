import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validator.service';
import { UserService } from 'src/app/shared/user.service';
import { AesService } from 'src/app/shared/aes.service';

@Component({
  selector: 'app-import-key',
  templateUrl: './import-key.component.html',
  styleUrls: ['./import-key.component.css']
})
export class ImportKeyComponent implements OnInit {

  @ViewChild('keys', { static: false })
  keys: ElementRef;

  privateKey: string;
  publicKey: string
  iv: string;
  salt: string;

  importForm: FormGroup;

  JSZip = require("jszip");
  CryptoJS = require("crypto-js");

  constructor(
    private validatorService: ValidatorService,
    private userService: UserService,
    private aesService: AesService) { }

  ngOnInit() {
    this.importForm = new FormGroup({
      'username': new FormControl(null, [Validators.required], [this.validatorService.checkExists("username")]),
      'email': new FormControl(null, [Validators.required, Validators.email], [this.validatorService.checkExists("email")]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'confirmPassword': new FormControl(null, [Validators.required]),
      'keys': new FormControl(null, [Validators.required]),
      'aesPassword': new FormControl(null, [Validators.required])
    },
      this.validatorService.mustMatch
    );
  }

  onFileChange(event, index: number) {
    const forLabel: FileList = event.target.files;
    this.keys.nativeElement.innerText = Array.from(forLabel)
      .map(f => f.name)
      .join(', ');

    if (event.target.files && event.target.files.length) {
      let reader = new FileReader();
      const [file] = event.target.files;

      this.JSZip.loadAsync(file).then((zip) => {
        Object.keys(zip.files).forEach((filename) => {
          zip.files[filename].async('string').then((fileData) => {
            switch (filename) {
              case 'privateKey.pgp':
                this.privateKey = fileData;
                break;
              case 'publicKey.pgp':
                this.publicKey = fileData;
                break;
              case 'salt.txt':
                this.salt = fileData;
                break;
              case 'iv.txt':
                this.iv = fileData;
                break;
              default:
                console.log('File not recognized.');
            }
          })
        })
      });
    }
  }

  importKey() {
    if (this.importForm.valid) {
      console.log(this.importForm);
      this.aesService.setValues(128, 10000);
      this.privateKey = this.aesService.decrypt(
        this.salt,
        this.iv,
        this.importForm.controls.aesPassword.value,
        this.privateKey)

      this.publicKey = this.aesService.decrypt(
        this.salt,
        this.iv,
        this.importForm.controls.aesPassword.value,
        this.publicKey)

      this.userService.importKey(
        this.importForm.controls.username.value,
        this.importForm.controls.email.value,
        this.importForm.controls.password.value,
        this.privateKey,
        this.publicKey,
        null
      )
      this.importForm.reset();
    }
  }
}
