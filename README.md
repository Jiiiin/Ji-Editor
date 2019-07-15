> 对于复杂前端平台，实现一个可靠智能的前端编辑器是我们当前的瓶颈，该项目实现了一个基于monaco-editor的web编辑器
# Ji-Editor
## 项目用于
+ 测试monaco-editor相关特性
+ 替换作者项目中已有的mirrorcode编辑器，实现intellisense
## 当前支持语言
['apex', 'azcli', 'bat', 'clojure', 'coffee', 'cpp', 'csharp', 'csp', 'css', 'dockerfile', 'fsharp', 'go', 'handlebars', 'html', 'ini', 'java', 'javascript', 'json', 'less', 'lua', 'markdown', 'msdax', 'mysql', 'objective', 'perl', 'pgsql', 'php', 'postiats', 'powerquery', 'powershell', 'pug', 'python', 'r', 'razor', 'redis', 'redshift', 'ruby', 'rust', 'sb', 'scheme', 'scss', 'shell', 'solidity', 'sql', 'st', 'swift', 'typescript', 'vb', 'xml', 'yaml']
## 如何启动
假设你会使用[npm](https://www.npmjs.com/)  
生产环境： 

```
npm build
```
在dist目录下打开index.html  

开发环境：

```
npm start
```
访问 http://localhost:8080/
## 如何配置
index.js中支持相关配置 合理的配置方式请参考monaco-editor官方API
## 关于monaco-editor
+ [monaco-editor官方API](https://microsoft.github.io/monaco-editor/api/index.html)
+ [monaco-editor repo](https://github.com/Microsoft/monaco-editor)
