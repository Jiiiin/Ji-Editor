import _ from 'lodash';
import './style.css';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';

const jiEditor = monaco.editor.create(document.getElementById('monaco'), {
    value: `console.log('hello jiEditor')`,
    language: 'javascript'
});