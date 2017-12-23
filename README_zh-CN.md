# Vuelecube

[![Travis 构建状态](https://travis-ci.org/pujiaxun/vuelecube.svg?branch=master)](https://travis-ci.org/pujiaxun/vuelecube)
[![AppVeyor 构建状态](https://ci.appveyor.com/api/projects/status/u927em03o3j18ddg/branch/master?svg=true)](https://ci.appveyor.com/project/pujiaxun/vuelecube/branch/master)

> 基于 electron-vue 的魔方计时器

[View in English](./README.md)

## 介绍

有一天，写代码累了，我又拿起了魔方，想要放松一下找些灵感。然而当我要找一个魔方计时器的时候，发现功能丰富的倒是有，要颜值是真的难，所以我又开始写代码了。

我希望这个软件是好用的，这是基础，但不会是功能面面俱到的。比如魔方的打乱公式，我看到有很多种魔方，各自又有很多打乱的算法，我不打算都要实现，我很懒。

我希望这个软件是跨平台的，不然我也不会用 Electron 了，光是框架本身就占数十 MB 空间。我所期待的跨平台不仅仅是能够运行，还要在不同平台上拥有符合习惯的样式和功能。比如对话框，尽量的调用了原生的消息框，按钮的主次顺序在不同操作系统也不相同。

我希望这个软件是国际化的，主要是指支持多种语言，不指望全球的魔方爱好者都用我的软件。因为这个功能是必须开发的，因此在开发前期软件中的内容均是英文优先，主要是为了追求开发过程中的一致性体验。

我希望这个软件是高颜值的，**这是我开发的初衷。**

我希望……我能睡个好觉，梦里啥都有。

## 致开发者

1. `git clone https://github.com/pujiaxun/vuelecube.git`
1. `cd vuelecube`
1. `yarn`
1. `npm run dev`
