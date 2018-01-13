# WebNJGIS

## 业务设计

### 模型

### 数据

### 比较

## Architecture
### business
### common
#### core
一些只加载一遍的核心模块，包括：
- 预加载器
- 拦截器
- ACL：访问控制列表
- 翻译器
- 通用服务
    - startup.service：加载配置文件，是服务的入口
    - settings.service：读取配置文件
    - http.client.service：重新封装HttpClient
    - menu.service：用于配置menu
    - colors.service：常用的颜色别名
    - themes.service：用于设置皮肤
#### feature
特性模块：一般将通用的模块放在这里，比如登录模块、地图模块

##### 地图模块

- 标准图层库
- 图层树
    - 底图支持选择数据源
    - 添加图层，从图层库中选择
- 工具栏
- 编辑模式
    - 
- 样式调整
- 动画
- 

#### layout
布局模块

#### shared
可重用的一些组件、指令、管道、主题、验证器放在这里

#### ngx-shared
angular自带的一些常用模块，一般大多数module中都要用，所以单独放在import中，并重新export

## 代码风格
- 文件和文件夹命名：烤串命名法
- 文件命名：feature.type.ts

## 如何引用第三方库

在`typings.d.ts`中添加声明。
```
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

## Install

启动之前要先启动后台服务
```
npm install
npm start
```
如有端口冲突更改`package.json`中的`"start": "ng serve --port 8888 --proxy-config proxy.conf.json"`。