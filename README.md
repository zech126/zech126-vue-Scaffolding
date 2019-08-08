# 项目名称

> 项目描述

## 项目背景

## 负责人

产品：

测试：

开发：

## 后端仓库地址

[http://git.host.com](http://git.host.com)

## 分支管理

- master 正式环境分支
- develop 开发环境分支
- release 测试环境分支

所有分支都有自动化构建流程，开发人员**只在** `develop` 分支上进行开发提交，完成功能后由测试人员操作合并至 `release` 分支，完成测试阶段后由测试人员合并至 `master` 分支构建上线。

## 部署地址

- 正式地址： [http://prod.host.com](http://prod.host.com)
- 开发环境： [http://dev.host.com](http://dev.host.com)
- 测试环境： [http://test.host.com](http://test.host.com)

## 技术选型

- [基础架构文档](http://192.168.1.102:801/pps/vue-boilerplate-doc/)
- [Vue.js](https://cn.vuejs.org)
- [Vue Router](https://router.vuejs.org/zh/)
- [Vuex](https://vuex.vuejs.org/zh/)

### 项目文件结构

```bash
.
└─ src
  ├─ api/           # 封装所有 api 接口调用方法
  ├─ components/    # 全局公共基础组件
  ├─ config/        # 存放本应用内部的配置
  ├─ router/        # 路由配置目录
  ├─ store/         # Store 状态管理目录
  ├─ styles/        # 全局样式目录
  ├─ utils/         # 辅助库
  ├─ views/         # 页面级视图文件目录
  │ ├─ components/  # 视图级别的公共组件
  │ ├─ layout/      # 布局组件
  │ └─ style/       # 样式文件目录
  ├─ app.config.js  # 应用常量配置
  ├─ app.vue        # 应用主组件
  └─ main.js        # 主入口文件
```

## 本地开发

```bash
# 本地运行 dev 环境
npm run serve

# 本地运行 mock 环境
npm run serve:mock
```

## 构建命令

前端资源文件构建后默认会生成于 `/dist/${process.env.VUE_APP_ENV}` 目录下。

若有开启打包功能，则相应的 `archive.tar` 或 `archive.zip` 文件会生成于 `/dist-archive/${process.env.VUE_APP_ENV}` 目录下，并以当前环境名作为二级目录名。

### 构建 dist

可执行 `npm run release` 命令，然后根据问题交互选择构建方案和升级版本号方案。

脚本执行成功之后会在上文提到的目录下生成构建后的文件，并提交到 Git 记录中，一般可用于正式环境构建后，运维直接部署静态文件的场景。

```bash
# 构建开发环境，打包文件 /dist-archive/dev/archive.(tar|zip)
npm run build:dev

# 构建正式环境，打包文件 /dist-archive/prod/archive.(tar|zip)
npm run build:prod

# 构建测试环境，打包文件 /dist-archive/test/archive.(tar|zip)
npm run build:test
```

## Store

（若有必要可补充 Vuex 内的 module 存储数据的说明以及各 state 的含义。）
