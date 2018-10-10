/** 自定义图片上传插件
 * 在简单上传图片的基础上，添加了删除方法
 * uploader.removeFile() API 并不能移除视图，只是移除了队列中的文件，会触发fileDequeued事件，可通过getFile()查看状态的改变
 * 手动添加的视图，需要手动去销毁，可以监听 fileDequeued（文件移除）事件，若有移除事件，可以手动去销毁视图
 * @author yushuai_w
 * @param pickerSelector 上传按钮选择器， 如：#fcz_uplaoder
 * @param listSelector 上传列表选择器，  如：#fcz_fileList
 * @param serverUrl 图片服务器地址
*/
/** 租房图片上传插件
 * @author wangyushuai
 * @param pickerSelector 上传按钮选择器， 如：#fcz_uplaoder
 * @param listSelector 上传列表选择器，  如：#fcz_fileList
 * @param serverUrl 图片服务器地址
*/
function _init_simpleUpload(pickerSelector, listSelector, serverUrl) {
    if (typeof (pickerSelector) == "undefined" || typeof (pickerSelector) == "undefined") {
        console.log("_init_simpleUpload error !");
        return false;
    }
    var defaultServerUrl = 'xx.com';//默认地址
    var $ = jQuery,
        $wrap = $('#uploader'),
        // 图片容器
        $queue = $('<ul class="filelist"></ul>')
            .appendTo($wrap.find(listSelector)),
        $list = $(listSelector),
        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,
        // 缩略图大小
        thumbnailWidth = 100 * ratio,
        thumbnailHeight = 100 * ratio,
        // Web Uploader实例
        simple_upload;

    // 初始化Web Uploader
    simple_upload = WebUploader.create({

        // 选完文件后，是否自动上传。
        auto: true,

        // swf文件路径
        swf: '/ggNew/src/js/webuploader-0.1.5/Uploader.swf',

        // 文件接收服务端。
        server: typeof (serverUrl) == 'undefined' || serverUrl == '' || serverUrl == null ? defaultServerUrl : serverUrl,
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: pickerSelector,

        //上传图片个数限制
        fileNumLimit: 1,

        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png'
        }
    });
    //event: 当有文件添加进来的时候。
    simple_upload.on('fileQueued', function (file) { });

    //event: 当文件被移除队列后触发
    simple_upload.on('fileDequeued', function (file) {
        simple_upload._removeFileView(file);
    });

    //event: 文件上传过程中创建进度条实时显示。
    simple_upload.on('uploadProgress', function (file, percentage) { });

    //event: 完成上传完了，成功或者失败，先删除进度条。
    simple_upload.on('uploadComplete', function (file) { });

    //event: 文件上传成功，给item添加成功class, 用样式标记上传成功。
    simple_upload.on('uploadSuccess', function (file, data) {
        simple_upload._addFile(file);
        console.log(data);//打印上传返回的地址
        //$(pickerSelector).hide();//隐藏上传按钮
    });



    //evnet: 文件上传失败，显示上传出错，
    simple_upload.on('uploadError', function (file) {
        alert("上传失败，请重新上传！");
        simple_upload.removeFile(file, true);
    });

    //evnet: 监听报错事件
    simple_upload.on('error', function (code) {
        switch (code) {
            case 'Q_EXCEED_NUM_LIMIT':
                simple_upload._notify('上传图片数量超过最大限制！');
                break;
            case 'Q_TYPE_DENIED':
                //new PNotify({ title: "错误！", text: '请上传图片类型！', type: 'error' });
                simple_upload._notify('请上传图片类型！');
                break;
            default:
                //new PNotify({ title: "错误！", text: 'Eroor: ' + code, type: 'error' });
                simple_upload._notify('Eroor: ' + code);
                break;
        }
    });


    /**其他扩展方法*/
    //web uploader 扩展，负责view的销毁 add by wys
    simple_upload._removeFileView = function (file) {
        var $li = $('#' + file.id);
        $li.off().find('.file-panel').off().end().remove();
    }

    //web uploader 扩展方法， 负责添加文件逻辑 add by wys
    simple_upload._addFile = function (file) {
        //   console.log(file);
        var $li = $('<li id="' + file.id + '">' +
            '<p class="title">' + file.name + '</p>' +
            '<p class="imgWrap"></p>' +
            '</li>'),

            //添加文件操作
            $btns = $('<div class="file-panel">' +
                '<span class="cancel">删除</span></div>').appendTo($li);

        $li.on('mouseenter', function () {
            $btns.stop().animate({ height: 30 });
        });

        $li.on('mouseleave', function () {
            $btns.stop().animate({ height: 0 });
        });

        $btns.on('click', 'span', function () {
            var index = $(this).index(),
                deg;

            switch (index) {
                case 0:
                    simple_upload.removeFile(file);
                    return;
            }
        });
        //添加至列表
        $li.appendTo($queue);

        //  创建缩略图
        //  如果为非图片文件，可以不用调用此方法。
        //  thumbnailWidth x thumbnailHeight 为 100 x 100
        var imgWrap = $li.find('p.imgWrap');
        simple_upload.makeThumb(file, function (error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }
            var img = $('<img src="' + src + '">');
            img.attr('src', src);
            imgWrap.empty().append(img);
        }, thumbnailWidth, thumbnailHeight);
    }

    //web uploader 扩展方法, 负责提出消息提示 add by wys
    simple_upload._notify = function (msg) {
        alert(msg);
    }

}