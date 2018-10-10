# WebUploader-Demos
基于三种WebUploader插件的图片上传实例

在Asp.NET MVC 环境下，写了三个基于webUploader.js 的图片上传实例。
Java 环境，请点击下方的链接

## 效果预览
![效果预览](http://img11.soufunimg.com/ask/2018_07/12/M01/0E/2A/ChCE4ltHFbaIaFKCAAFnMaf4eWgABDr8AEBpQEAAWdJ294.png)

## 模块介绍：
1. 模态框上传
2. 普通上传（具有拖拽，上传框等功能）
3. 简单上传，点击上传按钮完成上传图片

## 亮点
- 样式优美，且功能齐全
- 对上传脚本进行了封装，简单易用
- 支持拖拽上传、复制粘贴上传、断点上传、进度条、预览（预览大小，个数）、翻转、失败重传等功能
- 低版本浏览器兼容可用（IE6,7等）

## 补充
详情可参考博客：https://blog.csdn.net/shuai_wy/article/details/78654193

author: yushuai_w@163.com

## 更新日志
 
1. 初始化方法添加请求路径参数
2. 增加Java版本，[WebUploader实例JAVA环境版本Git](https://github.com/wangyushuai/demo_ssm.git)
3. 添加使用说明：

# webuploader-1.1.5插件 使用说明

**本插件基于 webuploader插件 进行了封装，提供了两种常用视图，并对问答后台常用上传功能进行了JS封装，视图，样式，业务逻辑都已封装（JS），可以直接引入使用。**

主要提供了**两个版本**：

版本1 ： 支持拖拽，支持粘贴，支持模态框，支持预览，支持断点，支持删除，旋转

![模态框上传效果1](http://img11.soufunimg.com/album/2017_11/28/M18/16/1C/ChCE4Foc1AeIa-iUAACWqvpATlYAA4KEQOREVgAAJbC643.png)

![模态框上传效果](http://img11.soufunimg.com/album/2017_11/28/M20/16/1C/ChCE4loc1DuIJq-CAACmGnkrJm0AA4KPABWi04AAKYy250.png)

版本2 ： 简单上传，支持预览


效果：![简单上传效果1](http://img11.soufunimg.com/album/2017_11/28/M21/16/1C/ChCE4Foc0xqIL3S3AAEdLaQloD8AA4KHgJYOZAAAR1F951.png)

![简单上传效果2](http://img11.soufunimg.com/album/2017_11/28/M0C/16/1C/ChCE4Foc07CIfPNSAAEVcitF44YAA4KKQJ4qasAARWK285.png)


### 1. 模态框上传步骤：

**直接引入 _madal_upload_view.html里代码即可，所需要的所有代码，已写在代码里了**

以下是思路：

#### 一、： 引入资源

  
```
    <link href="../vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../vendors/webuploader-0.1.5/webuploader.css" rel="stylesheet" />
    <link href="../vendors/pnotify/dist/pnotify.custom.min.css" rel="stylesheet" />
    <script src="../vendors/jquery/dist/jquery.min.js"></script>
    
    
    <script src="../vendors/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="../vendors/webuploader-0.1.5/webuploader.min.js"></script>
    <script src="../vendors/pnotify/dist/pnotify.custom.min.js"></script>
    <script src="../vendors/webuploader-0.1.5/upload.js"></script>
```

#### 二、初始化

##### 1. 视图 和 初始化脚本实例 已放置在对应html 中。

##### 2. JS 思路就是初始化上传方法。

我已封装好的上传方法，需要提供三个参数；并监听模态框，实例的代码即可。


```
_init_upload(userid, authkey, callback);

```

### 简单按钮上传

这一种比较简单，可以直接使用 _view_simple.html,而后执行      _init_simpleUpload方法即可。

#### 一、： 引入资源

```
<link href="../vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" />
<link href="../vendors/webuploader-0.1.5/webuploader.css" rel="stylesheet" />
<link href="../vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
<link href="../vendors/pnotify/dist/pnotify.custom.min.css" rel="stylesheet" />
<link href="../vendors/webuploader-0.1.5/style_simple.css" rel="stylesheet" />
<script src="../vendors/jquery/dist/jquery.min.js"></script>
<script src="../vendors/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="../vendors/webuploader-0.1.5/webuploader.min.js"></script>
<script src="../vendors/pnotify/dist/pnotify.custom.min.js"></script>
<script src="upload_simple.js"></script>

<!--_view_simple.html html 代码-->
```
####  二、 执行初始化方法


```
  _init_simpleUpload();
  
```



