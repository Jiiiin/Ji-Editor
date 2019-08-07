import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild, ComponentRef, OnDestroy, AfterViewInit  } from '@angular/core';
import { EditorComponent } from "./editor/editor.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  // @ViewChild('editorContainer1', {static: false, read: ViewContainerRef }) editorContainer1: ViewContainerRef;
  // @ViewChild('editorContainer2', {static: false, read: ViewContainerRef }) editorContainer2: ViewContainerRef;
  @ViewChild('editor', {static: false}) editor: EditorComponent
  title = 'jiEditor';
  code1: string = `export class editor {
    code: string,
    language: 'javascript',
    automaticLayout: true,
    model: model,
    code: string,
    language: 'javascript',
    automaticLayout: true,
    model: model,
    code: string,
    language: 'javascript',
    automaticLayout: trueautomaticLayout: trueautomaticLayout: trueautomaticLayout: trueautomaticLayout: trueautomaticLayout: trueautomaticLayout: true,trueautomaticLayout: truetrueautomaticLayout: truetrueautomaticLayout: truetrueautomaticLayout: truetrueautomaticLayout: truetrueautomaticLayout: truetrueautomaticLayout: truetrueautomaticLayout: true
    model: model,
    code: string,
    language: 'javascript',
    automaticLayout: true,
    model: model,
    code: string,
    language: 'javascript',
    automaticLayout: true,
    model: model,
    code: string,
    language: 'javascript',
    automaticLayout: true,
    model: model,
    code: string,
    language: 'javascript',
    automaticLayout: true,
    model: model
  }`;
  code2: string = `function editor {}`;
  editor1: ComponentRef<EditorComponent>;
  editor2: ComponentRef<EditorComponent>;

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
  constructor(private componentFactroyResolver: ComponentFactoryResolver) {
  }

  ngAfterViewInit() {
    // this.createComponent();
  }
  setPosition() {
    const monaco = this.editor.editor;
    monaco.revealPositionInCenter({lineNumber: 12, column: 200});
    monaco.deltaDecorations([], [
      { range: {
        startLineNumber: 12,
        startColumn: 0,
        endLineNumber: 12,
        endColumn: 25
      }, options: { inlineClassName: 'myInlineDecoration' }},
    ]);
  }

  // createComponent() {
  //   this.editorContainer1.clear();
  //   this.editorContainer2.clear();
  //   const componentFactory = this.componentFactroyResolver.resolveComponentFactory(EditorComponent);
  //   this.editor1 = this.editorContainer1.createComponent(componentFactory);
  //   this.editor2 = this.editorContainer2.createComponent(componentFactory);
  //   this.editor1.instance.options = this.editorOptions1;
  //   this.editor2.instance.options = this.editorOptions2;
  // }

  ngOnDestroy(){
    if (this.editor1){ 
      this.editor1.destroy();
    }
    if (this.editor2){ 
      this.editor2.destroy();
    }
  }
}
