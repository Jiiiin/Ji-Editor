import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
declare const monaco;

@Component({
  selector: 'app-editor',
  template: `<div #editorContainer></div>`
})
export class EditorComponent implements OnInit {
  @ViewChild('editorContainer', {static: true}) _editorContainer: ElementRef;
  @Input() public height: string;
  @Input() public width: string;
  @Input() public options: any = {};
  @Input() get code(): string {
    return this._code;
  }
  set code(value) {
    this._code = value ? value : '';
    if (this.editor) {
      this.editor.setValue(this._code);
    }
  }
  @Output() public codeChange = new EventEmitter<string>();
  private _code = '';
  public editor: any;

  constructor(private _renderer: Renderer2) { }

  ngOnInit() {
    const onLoadMonacoScript = () => {
      (<any>window).require.config({paths : {'vs' : 'assets/monaco/vs'}});
      (<any>window).require([ 'vs/editor/editor.main' ], () => { this._initMonaco(); });
    };
    if (!(<any>window).require) {
        const loaderScript = document.createElement('script');
        loaderScript.type = 'text/javascript';
        loaderScript.src = 'assets/monaco/vs/loader.js';
        loaderScript.addEventListener('load', onLoadMonacoScript);
        document.body.appendChild(loaderScript);
    }
  }

  private _initMonaco(): void {
    const defaultOptions = {
      value: this._code,
      language: 'javascript',
      automaticLayout: true
    };
    const options = Object.assign(defaultOptions, this.options);
    this.editor = monaco.editor.create(this._editorContainer.nativeElement, options);
    this._renderer.setStyle(this._editorContainer.nativeElement, 'width', this.width);
    this._renderer.setStyle(this._editorContainer.nativeElement, 'height', this.height);

    this.editor.onDidChangeModelContent((e: any) => {
      const value = this.editor.getValue();
      this.codeChange.emit(value);
    });
  }

}
