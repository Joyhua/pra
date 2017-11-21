var choiceNum = 5,
    choiceLi = null;

for(var i = 0; i < choiceNum; i++) {
    choiceLi == null ? choiceLi = '<li><a href="title.html">这是难度' + (i + 1) + '</a></li>' : choiceLi += '<li><a href="title.html">这是难度' + (i + 1) + '</a></li>';
}
var choice = '<div class="dialog_b"></div><section class="dialog-sec"><ul><li class="dialog-title">选择难度</li>' + choiceLi + '</ul></section>';

$('.difficult_chose').click(function() {
    $.dialog({
    	type:'list',
        contentHtml: choice
    })
});