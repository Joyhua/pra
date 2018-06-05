//原生事件封装
let addEvent = (function(window, undefined) {        
	var _eventCompat = function(event) {
		var type = event.type;
		if (type == 'DOMMouseScroll' || type == 'mousewheel') {
			event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
		}
            //alert(event.delta);
            if (event.srcElement && !event.target) {
            	event.target = event.srcElement;    
            }
            if (!event.preventDefault && event.returnValue !== undefined) {
            	event.preventDefault = function() {
            		event.returnValue = false;
            	};
            }
            /* 
            ......其他一些兼容性处理 */
            return event;
        };
        if (window.addEventListener) {
        	return function(el, type, fn, capture) {
        		if (type === "mousewheel" && document.mozFullScreen !== undefined) {
        			type = "DOMMouseScroll";
        		}
        		el.addEventListener(type, function(event) {
        			fn.call(this, _eventCompat(event));
        		}, capture || false);
        	}
        } else if (window.attachEvent) {
        	return function(el, type, fn, capture) {
        		el.attachEvent("on" + type, function(event) {
        			event = event || window.event;
        			fn.call(el, _eventCompat(event));    
        		});
        	}
        }
        return function() {};    
    })(window);
   /*
wrap_height : 外层容器的高度

content_height : 内容的实际高度，通常大于外层容器的高度

content_dis : 内容当前的位置

bar_height : 滚动条的长度

bar_dis : 滚动条当前的位置

bar_height/wrap_height = wrap_height/content_height;
bar_height = wrap_height*wrap_height/content_height;  // 滚动条的长度

bar_dis/(wrap_height-bar_height) = content_dis/(content_height-wrap_height);
content_dis = (content_height-wrap_height)*bar_dis/(wrap_height-bar_height); // 内容当前的位置
*/
/*
$wrapObj,$contentObj,$scrollObj
*/
var init =(function(window,undefined){
	let $that = this;
	let fun={
		changePos:function(end,bar_height,content_height,wrap_height,$scrollObj,$contentObj){
			if(0>end){
				end=0;
			}else if(end>wrap_height-bar_height){
				end=wrap_height-bar_height;
			}

			$scrollObj.css('top',end+'px'); 
			$contentObj.css('top',-(content_height-wrap_height)*end/(wrap_height-bar_height));
		},
		scrollerFun:function($wrapObj,$contentObj,$scrollObj,bar_height,content_height,wrap_height){
			$scrollObj.css('height',bar_height).on('mousedown',function(event){
				let $this = $(this),
				startX=event.pageY || event.offsetY,
				top = $this.position().top;

				$(document).on('mousemove',function(e){
					let diff = (e.pageY || e.offsetY)-startX;
					fun.changePos(top+diff,bar_height,content_height,wrap_height,$scrollObj,$contentObj);
				}).on('mouseup',function(event){
					$(this).off('mousemove mouseup');
				});

			});
		}
		

	};

	return function($wrapObj,$contentObj,$scrollObj){
		let [wrap_height,content_height]=[$wrapObj.height(),$contentObj.height()],
		content_dis,
		bar_height,
		bar_dis;

		bar_height=wrap_height*wrap_height/content_height;
		$scrollObj.css('height',bar_height+'px'); 

		fun.scrollerFun($wrapObj,$contentObj,$scrollObj,bar_height,content_height,wrap_height);

		addEvent($wrapObj[0],'mousewheel',function(e){
			let offsetW =e.deltaY/2;
			fun.changePos($scrollObj.position().top+offsetW,bar_height,content_height,wrap_height,$scrollObj,$contentObj);

		});

	}

})(window);
