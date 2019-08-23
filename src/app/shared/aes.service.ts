import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AesService {

  keySize;
  iterationCount;
  CryptoJS = require("crypto-js");

  constructor() { }

  setValues(keySize, iterationCount) {
    this.keySize = keySize / 32;
    this.iterationCount = iterationCount;
  }

  generateKey(salt, passPhrase) {
    var key = this.CryptoJS.PBKDF2(
      passPhrase,
      this.CryptoJS.enc.Hex.parse(salt),
      { keySize: this.keySize, iterations: this.iterationCount });
    return key;
  }

  encrypt(salt, iv, passPhrase, plainText) {
    var key = this.generateKey(salt, passPhrase);
    var encrypted = this.CryptoJS.AES.encrypt(
      plainText,
      key,
      { iv: this.CryptoJS.enc.Hex.parse(iv) });
    return encrypted.ciphertext.toString(this.CryptoJS.enc.Base64);
  }

  decrypt(salt, iv, passPhrase, cipherText) {
    var key = this.generateKey(salt, passPhrase);
    var cipherParams = this.CryptoJS.lib.CipherParams.create({
      ciphertext: this.CryptoJS.enc.Base64.parse(cipherText)
    });
    var decrypted = this.CryptoJS.AES.decrypt(
        cipherParams,
        key,
        { iv: this.CryptoJS.enc.Hex.parse(iv) });
    return decrypted.toString(this.CryptoJS.enc.Utf8);
  }
}
