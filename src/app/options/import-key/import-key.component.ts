import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validator.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-import-key',
  templateUrl: './import-key.component.html',
  styleUrls: ['./import-key.component.css']
})
export class ImportKeyComponent implements OnInit {


  @ViewChild('revocationCertificate', { static: false })
  revocationCertificate: ElementRef;

  @ViewChild('privateKey', { static: false })
  privateKey: ElementRef;

  @ViewChild('publicKey', { static: false })
  publicKey: ElementRef;

  labelList: ElementRef[];
  fileList: string[] | ArrayBuffer[] = [null, null, null];
  importForm: FormGroup;

  constructor(
    private validatorService: ValidatorService,
    private userService: UserService) { }

  ngOnInit() {
    this.importForm = new FormGroup({
      'username': new FormControl(null, [Validators.required], [this.validatorService.checkExists("username")]),
      'email': new FormControl(null, [Validators.required, Validators.email], [this.validatorService.checkExists("email")]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'confirmPassword': new FormControl(null, [Validators.required]),
      'publicKey': new FormControl(null, [Validators.required]),
      'privateKey': new FormControl(null, [Validators.required]),
      'revocationCertificate': new FormControl(null, [])
    },
      this.validatorService.mustMatch
    );
  }

  onFileChange(event, index: number) {
    this.labelList = [this.publicKey, this.privateKey, this.revocationCertificate];
    const forLabel: FileList = event.target.files;
    this.labelList[index].nativeElement.innerText = Array.from(forLabel)
      .map(f => f.name)
      .join(', ');

    if (event.target.files && event.target.files.length) {
      let reader = new FileReader();
      const [file] = event.target.files;
      reader.readAsText(file);
      reader.onload = () => {
        this.fileList[index] = reader.result;
      };
    }
  }

  importKey() {
    console.log('cos sie dzieje');
    if (this.importForm.valid) {
      console.log(this.importForm);
      this.userService.importKey(
        this.importForm.controls.username.value,
        this.importForm.controls.email.value,
        this.importForm.controls.password.value,
        this.fileList[0].toString(),
        this.fileList[1].toString(),
        this.fileList[2] === null ? null : this.fileList[2].toString()
      )
      this.importForm.reset();
    }
  }
}
