import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jiEditor';
  code1: string = `export class editor {}`;
  code2: string = `function editor {}`;

  model1 = {
    value: this.code1,
  };
  model2 = {
    value: this.code2,
  };
  editorOptions1 = {
    value: this.code1,
    language: 'typescript'
  };
  editorOptions2 = {
    value: this.code2,
    language: 'javascript'
  };
  constructor() {
  }
  switchCode() {
    this.code1 = `export class editor {
      cc: string,
      dd: string
    }`;
  }
}
