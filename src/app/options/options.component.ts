import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  tabType: String = 'create';

  constructor() { }

  ngOnInit() {
  }

  goToCreate(){
    this.tabType = 'create';
  }

  gotToGenerate(){
    this.tabType = 'generate';
  }
}
