import { Component, OnInit } from '@angular/core';
import { browser } from "webextension-polyfill-ts";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  asdf: String = "fioletowy"

  constructor() { }

  ngOnInit() {
    console.log('popup');

    var storageItem = browser.storage.sync.get('kolor');
    storageItem.then((res) => {
      if(res.kolor !== undefined){
        this.asdf = res.kolor;
      }

    })
  }

}
