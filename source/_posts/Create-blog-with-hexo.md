---
title: Create Blog with Hexo
date: 2025-09-06 23:18:12
tags:
---

## Hexo 安装

根据[首页教程](https://hexo.io/zh-cn/) 可以快速搭建一个本地博客.

```shell
npm install hexo-cli -g     # 全局安装hexo-cli,这样就可以在控制台中使用hexo命令,比如 Hexo init
hexo init blog              # 初始化,等同于git clone + npm intall
cd blog         
npm install
hexo server                 # 预览博客修改
```

## Hexo 基本用法

本地搭建完博客后,我们需要了解一些常用的hexo命令

### 新建文章

可以像下面这样新建一个文章

``` shell
hexo new post "Hello my blog"
```

`/source/_posts/` 目录下多了一个文件 `Hello-my-blog.md`.
写好博客以后,可以通过以下命令预览.

``` shell
hexo server
# 或者使用简写 s
hexo s
```

通过 generate 命令可以把md文件编译为html文件,可以知道最终发布文件是什么样的.

``` shell
hexo generate
# 或者使用简写 g
hexo g
```

## Hexo 部署

它本身是支持多种部署方式的:

- Github Actions: 将 md/yml/json 等文件传到 github, 由 github 通过 actions 编译成 html/js/css 并发布到 github pages.
- Deploy from a branch: 自己在本地编译, 然后将编译后的 html/js/css 上传到 github 某个分支, github 通过 actions 发布到 github pages.

我喜欢自己在本地编译, 然后发布到github, 这样可以知道编译的最终产物是什么, 方便调试.
通过 [deploy](https://hexo.io/zh-cn/docs/one-command-deployment) 命令可以实现我的需求.

这个命令作用支持多种发布方式,我是通过 Git pages 部署, 它会默默的做以下几件事情

- 创建 .deploy_git 目录
- 将 md 文件编译后放到 .deploy_git 中
- 在 .deploy_git 中进行git 初始化 (可看到这个目录下多了 .git 目录)
- 根据配置将变更提到到指定的**远程仓库**和**远程分支**

按上面的步骤可知我们需要告诉 hexo 远程仓库的地址和分支, 所以需要在 `_config.yml` 中添加以下配置.

``` yaml
deploy:
  type: git
  repo: git@github.com:qpingcode/qpingcode.github.io.git
  branch: gh-pages
  message: "Site updated: {{ now('yyyy-MM-DD HH:mm:ss') }}"
```

{% note warning %}
如果是自定义域名,一定要**source目录下创建CNAME**, 否则  `hexo deploy` 发布会你会得到404.
{% endnote %}

{% note warning %}
如果仓库是使用的SSH认证(git@xxx/xxx.git),那么需要把自己本机的公钥上传到 `https://github.com/settings/keys` 中, 否则 `hexo deploy` 会得到一个异常
{% endnote %}

然后需要安装 hexo-deploy-git

```shell
npm install hexo-deployer-git --save
```

Github上也需要对应的设置 > Settings > Pages > Build and Deployment > Source 选择 Deploy from a branch, branch 选择 gh-pages/
![github deploy method](images/Create-blog-withhexo-github-deploy-methods.png)

上面的步骤都完成后,就可以使用 deploy 命令发布了, 发布后可以检查github上 gh-pages 分支下是否是你刚刚提交的内容.
Actions 下会多一个 `pages build and deployment` 的任务,等它跑完就可以访问博客域名, 看看是否真正的发布成功了.

```shell
hexo g
hexo d
```

## 安装主题: Fluid

``` shell
npm install --save hexo-theme-fluid
```

首页是有个Slogan, 有打字机的效果, 改里面的内容的话可以[参考](https://hexo.fluid-dev.com/docs/guide/#slogan-%E6%89%93%E5%AD%97%E6%9C%BA) 修改 _config.fluid.yml.

```yml
index:
  slogan:
    enable: true
    text: Stay Hungry, Stay Foolish.
```

[Reference](https://github.com/fluid-dev/hexo-theme-fluid)

## 评论系统: Gitalk

hexo fluid支持很多[评论插件](https://hexo.fluid-dev.com/docs/guide/#%E8%AF%84%E8%AE%BA), 如果想把评论托管在 github issues.

有两个选择:

- Gitalk 不依赖于三方服务
- Utterances 集成简单, 只需要引用一个javascript文件, 但是需要依赖于 Utterances 的服务

Gitalk 前端需要暴露 clientSecret, 恶意第三方可以很容易知道你的 Github Application的信息, 窃取用户信息.
还是选用 Utterances 吧, 修改 _config.fluid.yml, 添加以下配置,就可以了.

```yml
post:
  comments:
    enable: true
    type: utterances

utterances:
  repo: 'qpingcode/qpingcode.github.io'
  issue_term: 'pathname'
```
