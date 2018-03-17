# Model Comparison

## 业务设计

### 模型

### 数据

### Issue

待解决或已解决的地理问题。

### Solution

地理问题的解决方案。

### Task

根据方案配置出来的运行结果。

## 如何使用

### 动态定义Title

两种情况：
- 在路由中配置 Title。如下，注意data要放在叶节点的路由配置中，要不然太乱
``` typescript
{
    path: 'home',
    component: XXXComponent,
    data: {
        title: 'This is title'
    }
}
```
- 根据Ajax请求的数据动态设置Title。在组件内部通过 `this.title.setTitle(variable)`

### 部分模块热加载

``` typescript
{
    path: 'home',
    loadChildren: '...',
    data: {
        preload: true
    }
}
```

### 响应式

暂定分为三种分辨率
``` css
@media max-width(979px) {}
@media min-width(980px) {}
@media min-width(1200px) {}
```

### 

## Architecture

### business

### common

#### core

一些只加载一遍的核心模块，包括：
- 预加载器
    custom-preloading-strategy：自定义预加载策略，angular只支持全部热加载和全部懒加载，不支持部分热加载，需要自定义该策略。
- 拦截器
    在发出请求和收到响应之前拦截，对数据进行解析。
    其实用拦截器处理比较复杂，可以通过重写 `HttpClient` 的请求来实现拦截。具体见`http.client.service`
- ACL：访问控制列表
- 翻译器
- 通用服务
    - startup.service：加载配置文件，是服务的入口
    - settings.service：读取配置文件
    - http.client.service：重新封装HttpClient
    - menu.service：用于配置menu
    - colors.service：常用的颜色别名
    - themes.service：用于设置皮肤
    - dynamic-title.service：动态设置标题

#### feature

特性模块：一般将通用的模块放在这里，比如登录模块

##### 地图模块

- 标准图层库
- 图层树
    - 底图支持选择数据源
    - 添加图层，从图层库中选择
- 工具栏
- 编辑模式
- 样式调整
- 动画

#### shared

可重用的一些组件、指令、管道、主题、验证器放在这里

header-menu-layout: 导航栏在头部的布局
sider-menu-layout: 导航栏在侧部的布局

#### ngx-shared

angular自带的一些常用模块，一般大多数module中都要用，所以单独放在import中，并重新export。

## 代码风格

- 文件和文件夹命名：烤串命名法
- 文件命名：feature.type.ts

## 如何引用第三方库

在`typings.d.ts`中添加声明。
``` typescript
declare var GoogleMapsLoader: any;
declare var L: any;
declare var AmCharts: any;
declare var Chart: any;
declare var Chartist: any;
declare const chroma: any;
declare var jQuery: any;
declare var _: any;
declare var postal: any;
```

## TODO

- 页面右下角加后台运行列表
- docking layout
- 页面加载速度
- 评论系统
- 和bootstrap结合
- 分割common module，打包后太大

## Install

启动之前要先启动后台服务
```
npm install
npm start
```
如有端口冲突更改`package.json`中的`"start": "ng serve --port 8888 --proxy-config proxy.conf.json"`。