import _ from 'lodash';
import './style.css';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
const jiEditor = monaco.editor.create(document.getElementById('monaco'), {
    value: `console.log('hello jiEditor')`,
    language: 'typescript'
});