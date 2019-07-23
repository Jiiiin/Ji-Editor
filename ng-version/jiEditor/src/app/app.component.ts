import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jiEditor';
  code: string = `export class editor {}`;
  options = {
    value: this.code,
    language: 'typescript'
  };
  constructor() {
  }
  switchCode() {
    this.code = `export class editor {
      cc: string,
      dd: string
    }`;
  }
}
