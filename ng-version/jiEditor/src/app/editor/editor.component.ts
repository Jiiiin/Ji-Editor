import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @ViewChild('editor', {static: true}) _editor: ElementRef;

  constructor() { }

  ngOnInit() {
    this._initEditor();
  }

  private _initEditor(): void {
    monaco.editor.create(this._editor.nativeElement, {
            value:`console.log("hello,world")`,
            language:"javascript"
    })
  }


}
