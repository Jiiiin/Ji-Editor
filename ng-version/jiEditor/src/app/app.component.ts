import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild, ComponentRef, OnDestroy, AfterViewInit  } from '@angular/core';
import { EditorComponent } from "./editor/editor.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('editorContainer1', {static: false, read: ViewContainerRef }) editorContainer1: ViewContainerRef;
  @ViewChild('editorContainer2', {static: false, read: ViewContainerRef }) editorContainer2: ViewContainerRef;
  title = 'jiEditor';
  code1: string = `export class editor {}`;
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
    this.createComponent();
  }
  switchCode() {
    this.code1 = `export class editor {
      cc: string,
      dd: string
    }`;
  }

  createComponent() {
    this.editorContainer1.clear();
    this.editorContainer2.clear();
    const componentFactory = this.componentFactroyResolver.resolveComponentFactory(EditorComponent);
    this.editor1 = this.editorContainer1.createComponent(componentFactory);
    this.editor2 = this.editorContainer2.createComponent(componentFactory);
    this.editor1.instance.options = this.editorOptions1;
    this.editor2.instance.options = this.editorOptions2;
  }

  ngOnDestroy(){
    if (this.editor1){ 
      this.editor1.instance.ngOnDestroy();
    }
    if (this.editor2){ 
      this.editor2.instance.ngOnDestroy();
    }
  }
}
