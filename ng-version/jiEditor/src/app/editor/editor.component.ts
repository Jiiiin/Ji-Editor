import { Component, forwardRef, AfterViewInit, ViewChild, NgZone, ElementRef, Input, Output, EventEmitter, Renderer2, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
declare const monaco;
let loadedMonaco = false;
let loadPromise: Promise<void>;

@Component({
  selector: 'app-editor',
  template: `<div #editorContainer class="editor-container"></div>`,
  styles: [`
  :host {
    display: block;
    height: 200px;
  }

  .editor-container {
    width: 100%;
    height: 100%;
  }
`],
providers: [{
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EditorComponent),
  multi: true
}]
})
export class EditorComponent implements AfterViewInit, ControlValueAccessor, OnDestroy{
  @ViewChild('editorContainer', {static: true}) _editorContainer: ElementRef;
  @Input() public height: string;
  @Input() public width: string;
  @Input() public options: any = {};
  @Output() public codeChange = new EventEmitter<string>();
  @Output() public ready = new EventEmitter<void>();
  private _code = '';
  public editor: any;
  propagateChange = (_: any) => {};
  onTouched = () => {};

  constructor(private _renderer: Renderer2, private _zone: NgZone) { }

  ngAfterViewInit(): void {
    if (loadedMonaco) {
      loadPromise.then(() => {
        this._initMonaco();
      });
    } else {
      loadedMonaco = true;
      loadPromise = new Promise<void>((resolve: any) => {
        if (typeof ((<any>window).monaco) === 'object') {
          resolve();
          return;
        }
        const onGotAmdLoader: any = () => {
          (<any>window).require.config({paths : {'vs' : 'assets/monaco/vs'}});
          (<any>window).require(['vs/editor/editor.main'], () => {
            this._initMonaco();
            resolve();
          });
        };

        if (!(<any>window).require) {
          const loaderScript: HTMLScriptElement = document.createElement('script');
          loaderScript.type = 'text/javascript';
          loaderScript.src = `/assets/monaco/vs/loader.js`;
          loaderScript.addEventListener('load', onGotAmdLoader);
          document.body.appendChild(loaderScript);
        } else {
          onGotAmdLoader();
        }
      });
    }
  }

  writeValue(value: any): void {
    this._code = value || '';
    setTimeout(() => {
      if (this.editor && !this.options.model) {
        this.editor.setValue(this._code);
      }
    });
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private _initMonaco(): void {
    const defaultOptions = {
      value: this._code,
      language: 'javascript',
      automaticLayout: true,
      theme: 'vs-dark'
    };
    const options = Object.assign(defaultOptions, this.options);
    this._renderer.setStyle(this._editorContainer.nativeElement, 'width', this.width);
    this._renderer.setStyle(this._editorContainer.nativeElement, 'height', this.height);
    this._zone.runOutsideAngular(() => this.editor = monaco.editor.create(this._editorContainer.nativeElement, options));
    this.editor.onDidChangeModelContent((e: any) => {
      const value = this.editor.getValue();
      this.propagateChange(value);
      this._zone.run(() => this._code = value);
      this.codeChange.emit(value);
    });
    this.editor.onDidBlurEditorWidget(() => {
      this.onTouched();
    });
  }
  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.dispose();
      this.editor = undefined;
    }
  }

}
