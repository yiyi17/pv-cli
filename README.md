# pv-cli

- 官网`https://yiyibao.github.io/pv-cli/`

## 简介

这是一个简单的vue项目的初始化工具,满足多中业务的需求,特别是可以把多个不相关的h5页面集成到一个项目

## 安装下载

- `npm i pv-cli -g`

ps:如果报错，node-sass不能正常安装，尝试`npm install pv-cli --unsafe-perm=true --allow-root -g`

## 快速开始

pv与pv-cli都是初始化项目的命令`pv init <project-name> <type> `

示例:

    pv init my-project simple 或者pv-cli init my-project simple

`pv info`可查看支持的type值

type值:

    simple为vue+webpack4的简单项目,适合简单项目;
    module是多模块的项目,适合中等大小的项目;
    Integrate是module项目的集成,适合多个前端小项目集成到一个项目.
    webpack4是开发版本的模版;


## 交流 & 提问

- 提问：https://github.com/yiyibao/vue-simple-project/issues


## 关于作者

- 个人博客 http://www.cnblogs.com/yiyi17/
