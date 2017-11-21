var titleTimer, m = 0,
    s = 0,
    mNode = $('.m'),
    sNode = $('.s');

//时间计算
var countTimer = function() {
    if(m >= 60) clearInterval(titleTimer);
    s++;
    if(s >= 60) {
        s = 0;
        m++;
    }
    s < 10 ? $(sNode).html('0' + s) : $(sNode).html(s);
    m < 10 ? $(mNode).html('0' + m) : $(mNode).html(m);

}
titleTimer = setInterval(function() {
    countTimer();
}, 1000);

//提交弹出框
var str = '<li><span>正确：</span><span><em style="color:#0f9b3d;font-style:normal;">28</em>道</span></li><li><span>错误：</span><span><em style="color:#ff6600;font-style:normal;">2</em>道</span></li><li><span>用时：</span><span>' + $('.m').text() + ':' + $('.s').text() + '</span></li><li><span>准确率：</span><span>98.3%</span></li>'
var choice = '<div class="dialog_b"></div><section class="dialog-result dialog-sec"><div class="dialog-title"><span><span class="icon"></span>测试结果</span></div><ul>' + str + '</ul><button class="okLink" onClick="closeDialog();">确定</button></section>';

function closeDialog() {
    $('.dialog-wrap').remove();
}

var switchTitle = function(isPractice, btn, currentAtiveFlag, beginFlag, endFlag, liWidth, liNode, titleNode, titleTimer, submitHtml) {
    if(isPractice) {
        if(btn == "prev") {
            $(titleNode).html(currentAtiveFlag);
            currentAtiveFlag--;
            if(currentAtiveFlag == beginFlag) {
                $('.prev,.submit').hide('slow');
                $('.next').show('slow');
            } else {
                $('.submit').hide('slow');
                $('.prev,.next').show('slow');
            }
        } else if(btn == "next") {
            currentAtiveFlag++;
            $(titleNode).html(currentAtiveFlag + 1);
            if(currentAtiveFlag == endFlag) {
                $('.next').hide('slow');
                $('.prev,.submit').show('slow');
            } else {
                $('.next,.prev').show('slow');
                $('.submit').hide('slow');
            }
        } else {
            clearInterval(titleTimer);
            $.dialog({
                type: 'list',
                contentHtml: submitHtml
            });
            return;

        }

        $(liNode).animate({
            left: -liWidth * currentAtiveFlag
        }, 500);
        $(liNode).removeClass("active").siblings().eq(currentAtiveFlag).addClass("active");
    } else {
        if(btn == "prev") {
            if(currentAtiveFlag == beginFlag) {
               return false;
            }
            currentAtiveFlag--;
        } else if(btn == "next") {
            if(currentAtiveFlag == endFlag) {
                return false;
            }
            currentAtiveFlag++;
        }

        $(liNode).animate({
            left: -liWidth * currentAtiveFlag
        }, 500);
        $(liNode).removeClass("active").siblings().eq(currentAtiveFlag).addClass("active");
    }

}

//上、下题，提交
$(".practice-submit button").click(function() {
    var f = $(this).prop('class'),
        liwidth = $(".practice-ul li").css("width").split("px")[0],
        numNext = $(".practice-ul>li:last-of-type").attr("data-num"),
        numPre = $(".practice-ul>li:first-of-type").attr("data-num"),
        numbers = $(".active").attr("data-num");

    switchTitle(true,f, numbers, numPre, numNext, liwidth, $(".practice-ul li"), $('.n'), titleTimer, choice);
});