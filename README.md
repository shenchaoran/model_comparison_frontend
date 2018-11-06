# 项目介绍
## 业务逻辑
### 后台：
- FTP上传下载
- 分布式计算和存储

### 前台：
- 数据
    - 分类列表：输入（标准数据集）、输出、模型关联
    - 数据详情：可以预览和下载数据
    - 数据可视化列表页面
    - 数据可视化服务调用配置页面
    - 数据处理工具列表页面
    - 数据处理工具调用配置页面
    - 数据比较列表页面
    - 数据比较配置及结果页面
- 模型
    - 模型列表页面
    - 模型配置详情页面
- 计算
    - 计算记录列表页面
    - 计算记录配置详情页面
- 比较
    - 比较记录列表页面
    - 比较配置详情页面
        - 视角：配置过程、计算结果、计算耗费资源的统计
- 个人空间
    - 所有的个人资源列表

# 用户指南

# 开发者指南
## Install
启动之前要先启动后台服务
```
# 后台
#   start nginx
#   start geoserver

# 前台
npm install
npm run debug
```
如有端口冲突更改`package.json`中的`"start": "ng serve --port 8888 --proxy-config proxy.conf.json"`。

## TODO
- [ ] 页面右下角加后台运行列表
- [ ] docking layout
- [x] 页面加载速度
- [x] 评论系统
- [x] ~~和bootstrap结合~~
- [x] 分割 common module ，打包后太大
- [ ] echarts tree-shaking
- [ ] zorro tree-shaking
- [ ] material theme custom
- [ ] 用户个人空间相关
    - [ ] 路由 RESTful 风格化：user/:username
    - [ ] 关注、收藏的 topic, sln, task
    - [ ] 消息订阅与通知
- [ ] remove slim-loading-bar, use mat-progress-bar
- [ ] remove list-template, use mat-list
- [ ] remove disabled-button, use snackbar to alert valid state
- [ ] remove header, use mat-toolbar
- [ ] remove custom card, use mat-card
- [ ] remove ng-zorro-antd
    - [ ] 样式冲突，首先移除
- [ ] 首页重新设计，展现的元素尽量少，首页去除 ajax
- [ ] 动态设置 title
- [ ] primer style
    - [ ] colorful label/tag
    - [ ] navigation component/filter/menu
    - [ ] popover
    - [ ] subhead with description
    - [ ] css-truncate
    - [ ] color plaette
    - [ ] Typography

## Architecture

### business
页面相关业务，建议按前台路由或者导航栏目录来组织模块，将每个页面放在一个 module 中，通过懒加载降低首屏加载速度。

### shared
可重用的一些组件、指令、管道、主题、验证器放在这里

header-menu-layout: 导航栏在头部的布局
sider-menu-layout: 导航栏在侧部的布局

#### ngx-shared
angular自带的一些常用模块，一般大多数module中都要用，所以单独放在import中，并重新export。

#### 地图模块
- 标准图层库
- 图层树
    - 底图支持选择数据源
    - 添加图层，从图层库中选择
- 工具栏
- 编辑模式
- 样式调整
- 动画

### core
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

## 开发者说明
**How to use 3td party module**

优先通过 ES6 module 导入，可以享受到 tree-shaking，如果库不支持的话，在 angular.json 中将三方库整个引入。并在`typings.d.ts`中添加声明。
``` typescript
declare var jQuery: any;
```

**dynamic define title**

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

**module preload**

``` typescript
{
    path: 'home',
    loadChildren: '...',
    data: {
        preload: true
    }
}
```

**responsive**

- nav 和 footer 不用管，响应式是写好的
- 中间的 rx-box 部分的响应式，在需要应用布局时，给 div 添加 .rx-box 类名或 rx-box 指令即可

``` css
@mixin layout($paddingHorizontal) {
    nav {
        padding: 0 $paddingHorizontal;
    }
    .rx-box {
        padding: 24px $paddingHorizontal;
    }
    footer {
        padding-left: $paddingHorizontal !important;
        padding-right: $paddingHorizontal !important;
    }
}
```

**代码风格**

- 文件和文件夹命名：烤串命名法
- 文件命名：feature.type.ts

