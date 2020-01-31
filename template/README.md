# vue-simple-project

## node >6

## 开始

@startuml

actor A
actor B

A -up-> (up)
A -right-> (center)
A -down-> (down)
A -left-> (left)

B -up-> (up)
B -left-> (center)
B -right-> (right)
B -down-> (down)

@enduml

```bash
npm i

启动 npm run dev

打包 npm run build

eslint 修复 npm run lint

项目结构

__.babel
|__.editorconfig
|__.eslintignore
|__.eslintrc.js
|__.gitignore
|__dist
|__package.json
|__postcss.config.js
|__README.md
|__src
    |__App.vue
	|__seetes
    |__components
    |__img
    |__index.html
    |__main.js
    |__router
    |__store
    |__style
    |__utils
    |__vendor.js
|__build
    |__webpack.base.conf.js
	|__webpack.dev.conf.js
	|__webpack.pro.conf.js

```
