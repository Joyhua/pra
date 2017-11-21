(function(win, $) {
    var settings, dialogWrapper,timer;
    $.dialog = function(options) {
        settings = $.extend({}, $.fn.dialog.defaults, options);
        $.dialog.init();
        return this;
    };

    var _renderDOM = function() {
        if($('.dialog-wrap').length > 0) {
            return;
        }
        
        clearTimeout(timer);

        $('body').append(dialogWrapper = $('<div class="dialog-wrap ' + settings.dialogClass + '"></div>'));
        dialogWrapper.append(content = $('<div class="dialog-content"></div>'));

        switch(settings.type) {
            case 'list':
                content.append(settings.contentHtml);
                break;
            case 'info':
                var htmlString = '<div class="dialog-alert"><img src="'+settings.successImg+'"/><p>' + settings.infoText + '</p></div>';
                content.append(htmlString);
                
                timer=setTimeout(function(){
                	$.dialog.close();
                },settings.autoClose);
                
                break;
            default:
                break;
        }

    };

    $.dialog.init = function() {
        _renderDOM();

    };
    
    $.dialog.close=function(){
    	dialogWrapper.remove();
    };

    $.fn.dialog = function(options) {
        return this;
    };

    $.fn.dialog.defaults = {
        type: 'info',
        titleText: '',
        contentHtml: '',
        dialogClass: '',
        infoText: '保存成功',
        successImg:'',
        autoClose:3000
    }
})(window, window.Zepto || window.jQuery)