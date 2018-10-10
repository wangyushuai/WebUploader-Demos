/** 自定义图片上传插件
 * 在简单上传图片的基础上，添加了删除方法
 * uploader.removeFile() API 并不能移除视图，只是移除了队列中的文件，会触发fileDequeued事件，可通过getFile()查看状态的改变
 * 手动添加的视图，需要手动去销毁，可以监听 fileDequeued（文件移除）事件，若有移除事件，可以手动去销毁视图
 * @author yushuai_w
 * @param pickerSelector 上传按钮选择器， 如：#fcz_uplaoder
 * @param listSelector 上传列表选择器，  如：#fcz_fileList
 * @param serverUrl 图片服务器地址
*/
function _init_simpleUpload(pickerSelector, listSelector, serverUrl) {
    if (typeof (pickerSelector) == "undefined" || typeof (pickerSelector) == "undefined") {
        console.log("_init_simpleUpload error !");
        return false;
    }
    var defaultServerUrl = 'xxx'
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
    // 当有文件添加进来的时候，
    simple_upload.on('fileQueued', function (file) {
        simple_upload._addFile(file);
    });

    //simple_upload.on('fileQueued', function (file) {
    //    //add by wys 添加列表样式类
    //    if (!$list.hasClass('wu-example')) {
    //        $list.addClass('wu-example');
    //    }

    //    var $li = $(
    //        '<div id="' + file.id + '" class="file-item thumbnail">' +
    //        '<img>' +
    //        '<div class="info">' + file.name + '</div>' +
    //        '</div>'
    //    ),
    //        $img = $li.find('img');


    //    //$list为容器jQuery实例
    //    $list.append($li);

    //    //创建缩略图
    //    //如果为非图片文件，可以不用调用此方法。
    //    //thumbnailWidth x thumbnailHeight 为 100 x 100
    //    simple_upload.makeThumb(file, function (error, src) {
    //        if (error) {
    //            $img.replaceWith('<span>不能预览</span>');
    //            return;
    //        }

    //        $img.attr('src', src);
    //    }, thumbnailWidth, thumbnailHeight);
    //});

    // 文件上传过程中创建进度条实时显示。
    simple_upload.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id),
            $percent = $li.find('.progress span');

        // 避免重复创建
        if (!$percent.length) {
            $percent = $('<p class="progress"><span></span></p>')
                .appendTo($li)
                .find('span');
        }

        $percent.css('width', percentage * 100 + '%');
    });


    simple_upload.on('fileDequeued', function (file) {
        simple_upload._removeFileView(file);
    });


    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    simple_upload.on('uploadSuccess', function (file) {

    });

    // 文件上传失败，显示上传出错，
    simple_upload.on('uploadError', function (file) {
        console.log("上传失败，请重新上传！");
        //simple_upload.removeFile(file, true);
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    simple_upload.on('uploadComplete', function (file) {
    });


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

}