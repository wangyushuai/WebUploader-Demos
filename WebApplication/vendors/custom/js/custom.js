/*
*@module 插件通用配置
*@author  wangyushuai@fang.com
*@date 2017/10/31
*@note: *此文件为初始化插件通用配置，请勿修改
*/

/**
*JQuery DataTables 通用配置
*/
$.fn.CONFIG_DATATABLES = {};
function _init_datatable() {
    if ($.fn.dataTable != undefined) {

        $.fn.CONFIG_DATATABLES = {
            processing: true,
            autoWidth: false,
            info: true,
            pagingType: "full_numbers",
            pageLength: 10,
            searching: false,
            ordering: false,
            serverSide: true,
            stateSave: false,
            lengthChange: true,
            lengthMenu: [10, 15, 25, 50, 75, 100],
            language: {
                lengthMenu: "每页显示 _MENU_记录",
                zeroRecords: "没有匹配的数据",
                info: "第_PAGE_页/共 _PAGES_页 ( 共\_TOTAL\_条记录 )",
                infoEmpty: "没有符合条件的记录",
                search: "查找",
                infoFiltered: "(从 _MAX_条记录中过滤)",
                paginate: { "first": "首页 ", "last": "末页", "next": "下一页", "previous": "上一页" },
                processing:  '<i class="fa fa-spin fa-spinner fa-pulse" style="margin:0 2px;"></i>' + "正在加载..."
            },
            responsive: true,
            scrollX: true,
            dom:'lBrtip'
        }

    }
}


/**自定义Confirm
* @param msg : 确认框内容
* @param func : 点击确认的回调函数
*/
_Confirm = function (msg, func) { }
/*自定义通知
* @param title  : 标题
* @param msg : 信息
* @param type : 类型(success,info,error,warning...)
*/
_Notify = function (title, msg, type) { }

/** 初始化通知栏
*
*/
function _init_pnotify() {
    if(typeof(PNotify) != "undefined")
    {
        /*通知插件全局配置*/
        PNotify.prototype.options.styling = "bootstrap3";
        PNotify.prototype.options.delay = 3000;

        _Confirm = function (msg, func) {
            var obj = (new PNotify({
                title: '提示',
                text: msg,
                icon: 'glyphicon glyphicon-question-sign',
                hide: false,
                confirm: {
                    confirm: true,
                    buttons: [{
                        text: "确认",
                        promptTrigger: true,
                        click: function (notice, value) {
                            notice.remove();
                            notice.get().trigger("pnotify.confirm", [notice, value]);
                        }
                    }, {
                        text: "取消",
                        click: function (notice) {
                            notice.remove(); notice.get().trigger("pnotify.cancel", notice);
                        }
                    }]
                },
                buttons: {
                    closer: false,
                    sticker: false
                },
                addclass: 'stack-modal',
                stack: { 'dir1': 'down', 'dir2': 'right', 'modal': true },
                history: { history: false }
            })).get().on('pnotify.confirm', function () {
                func();
            }).on('pnotify.cancel', function () { });
        }

        _Notify = function(title, msg, type) {
            return new PNotify({ title: title, text: msg, type: type });
        }

    }
}


//选中行计数
_CheckCount = function () { };
//ICheckBox 取消全选,并恢复表头
_ConcelCheckAll = function () { };
//初始化全选按钮
_init_CheckboxSelectAll = function () { };

//iCheck，初始化表格的checkbox
function _init_checkbox() {
    if ($.fn.iCheck == undefined) return;

    _CheckCount = function () {
        var count = $("._icheck input[name='table_records']:checked").length;
        if (count) {
            $('._th').hide();
            $('.bulk-actions').show();
            $('.action-cnt').html(count);
        } else {
            $('._th').show();
            $('.bulk-actions').hide();
        }
    }

    _ConcelCheckAll = function () {
        var checkAllElem = $('._icheck #check-all').eq(0);
        if (checkAllElem.prop('checked')) {
            checkAllElem.iCheck('uncheck');
            _CheckCount();//恢复表头
        }
    }

    _init_CheckboxSelectAll = function () {
        $('._icheck #check-all').on('ifChecked', function () {
            $("._icheck input[name='table_records']").iCheck('check');
            _CheckCount();
        });
        $('._icheck #check-all').on('ifUnchecked', function () {
            $("._icheck input[name='table_records']").iCheck('uncheck');
            _CheckCount();
        });
        _CheckCount();// 恢复表头
        _ConcelCheckAll();//取消全选按钮
    }

    //初始化
    if ($("input.flat")[0]) {
        $('input.flat').iCheck({
            checkboxClass: 'icheckbox_flat-green',
            radioClass: 'iradio_flat-green'
        });
        $("._icheck input[name='table_records']").on('ifChecked', function () {
            $(this).parent().parent().parent().addClass('selected');
            _CheckCount();
        });
        $("._icheck input[name='table_records']").on('ifUnchecked', function () {
            $(this).parent().parent().parent().removeClass('selected');
            _CheckCount();
        });
        //初始化全选按钮
        _init_CheckboxSelectAll();
    }
}


//初始化Icheck插件
//input 标签带有 _icheck 类的元素，将被初始化
function _init_icheck()
{
    if ($.fn.iCheck == undefined) return;
    
    if ($('input._icheck')[0]) {//判断元素是否存在 ，undefined == false
        $('input._icheck').iCheck({
            checkboxClass: 'icheckbox_flat-green',
            radioClass: 'iradio_flat-green',
        });
    }
}

//时间清除按钮初始化
function _init_clearTime()
{
	if($('._timeClear').length > 0) {
    //绑定清除时间事件
    $('._timeClear').click(function () {
	    $(this).prev('input').val('');
	    });
	 }
}
//daterangepicker(时间选择配置)插件配置
$.fn.CONFIG_DATERANGEPAKIER = {};

/**DATERANGEPICKER
*初始化时间区间选择插件
*/
function _init_daterangepicker() {

    if (typeof ($.fn.daterangepicker) === 'undefined') { return; }

    $.fn.CONFIG_DATERANGEPAKIER = {
        "linkedCalendars": false,
	    "alwaysShowCalendars": true,//一直展示日历
	    "autoUpdateInput": true,//取消默认输入
	    "showDropdowns": true,//显示年，月选择框
	    "locale": {
	        "format": "YYYY/MM/DD",
	        "separator": " - ",
	        "applyLabel": "选择",
	        "cancelLabel": "取消",
	        "customRangeLabel": "自定义",
	        "daysOfWeek": ['日', '一', '二', '三', '四', '五', '六'],
	        "monthNames": ['一月', '二月', '三月', '四月', '五月', '六月',
                    '七月', '八月', '九月', '十月', '十一月', '十二月'],
        },
    }

    if (typeof (moment) === 'undefined') { return; }

    $.fn.CONFIG_DATERANGEPAKIER.ranges = {
	        '今日': [moment().startOf('day'), moment()],
	        '昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
	        '最近7日': [moment().subtract('days', 6), moment()],
	        '最近30日': [moment().subtract('days', 29), moment()],
	        '本月': [moment().startOf("month"), moment().endOf("month")],
	        '上个月': [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
    }

    _init_clearTime();//清空时间
}




//初始化
$(function init_custom() {
    _init_datatable();
    _init_pnotify();
    _init_icheck();
    _init_daterangepicker();
  //  _init_checkbox();
});