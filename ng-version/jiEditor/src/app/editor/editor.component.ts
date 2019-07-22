import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare const monaco;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @ViewChild('editor', {static: true}) _editor: ElementRef;

  constructor() { }

  ngOnInit() {
    const onGotAmdLoader = () => {
      // Load monaco
      (<any>window).require.config({paths : {'vs' : '/assets/monaco/vs'}});
      (<any>window)
          .require([ 'vs/editor/editor.main' ], () => { this._initEditor(); });
    };
  }

  private _initEditor(): void {
    monaco.editor.create(this._editor.nativeElement, {
            value:`console.log("hello,world")`,
            language:"javascript"
    })
  }


}
