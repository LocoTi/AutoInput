// ==UserScript==
// @name         AutoInput
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  自动键入账户名
// @include      *
// @require      http://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js
// @author       xiaoyao9610@163.com
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_getResourceURL
// @run-at      document-start
// ==/UserScript==

(function($){
    $(function(){
    var items = ['***********@163.com','***********@hotmail.com','***********@qq.com'];
	$('input').on('focus', function(){
                var indexItem = -1;
	            var focused = $(':focus').get(0);
	            if(focused.tagName == 'INPUT'){
	                focused.onkeydown = function(event){
	                    var e = event;
	                    if(document.activeElement == focused){
                            //Ctrl+→键
	                        if(e.ctrlKey && e.keyCode == 39){
	                            var top = $(focused).offset().top + $(focused).outerHeight() + 5;
	                            var left = $(focused).offset().left;
	                            var str = '<div class="autoinput-box">'+ '<ul>';
	                            for(var i = 0, len = items.length; i < len; i++){
	                                str += '<li>'+ items[i] + '</li>';
	                            }
	                            str += '</ul>'+ '</div>';
	                            addStylesheetRules([
									['.autoinput-box',[['position', 'absolute'],['top',top + 'px'],['left',left + 'px'],['background-color', '#fff'],['border', '1px solid #ccc'],['border-radius','5px'],['font-size','0'],['text-align','center'],['z-index','99999']]],
									['.autoinput-box ul',[['list-style', 'none'],['padding', '0']]],
									['.autoinput-box ul li',[['display', 'block'],['width','220px'],['height','24px'],['line-height','24px'],['border-bottom', '1px solid #ccc'],['font-size','16px'],['cursor','pointer']]],
									['.autoinput-box .current-li',[['background', '#ddd']]],
									['.autoinput-box ul li:hover',[['background', '#ddd']]]
								]);
								$('.autoinput-box').remove();
	                            $('body').append(str);

	                            $('.autoinput-box li').on('click', function(){
	                            	var value = $(this).text();
	                            	$(focused).val(value);
	                            	$('.autoinput-box').css('display', 'none');
	                            });
	                            $(document).on('click', function(event){
	                            	if(event.target != focused){
	                            		$('.autoinput-box').css('display', 'none');
	                            	}
	                            });
	                        }
                            //绑定enter
                            if(e.keyCode == 13){
                                var value = $('.autoinput-box .current-li').text();
                                if(value){
                                    $(focused).val(value);
                                }
                                $('.autoinput-box').css('display', 'none');
                            }
	                    }

	                    if(!e.ctrlKey && e.keyCode == 40){
                        	indexItem = $('.autoinput-box .current-li').index();
                        	if(indexItem == items.length - 1){
                        		indexItem = -1;
                        	}
                        	indexItem++;
                        	$('.autoinput-box li').removeClass('current-li');
                        	$('.autoinput-box li').eq(indexItem).addClass('current-li');
                        }

                        if(!e.ctrlKey && e.keyCode == 38){
                        	indexItem = $('.autoinput-box .current-li').index();
                        	if(indexItem === 0){
                        		indexItem = items.length;
                        	}
                        	indexItem--;
                        	$('.autoinput-box li').removeClass('current-li');
                        	$('.autoinput-box li').eq(indexItem).addClass('current-li');
                        }
	                };
	            }
	        });
	});

	function addStylesheetRules (decls) {
		var style = document.createElement('style');
		document.getElementsByTagName('head')[0].appendChild(style);
		if (!window.createPopup) { /* For Safari */
			style.appendChild(document.createTextNode(''));
		}
		var s = document.styleSheets[document.styleSheets.length - 1];
		for (var i=0, dl = decls.length; i < dl; i++) {
			var j = 1, decl = decls[i], selector = decl[0], rulesStr = '';
			if (Object.prototype.toString.call(decl[1][0]) === '[object Array]') {
				decl = decl[1];
				j = 0;
			}
			for (var rl=decl.length; j < rl; j++) {
				var rule = decl[j];
				rulesStr += rule[0] + ':' + rule[1] + (rule[2] ? ' !important' : '') + ';\n';
			}
			if (s.insertRule) {
				s.insertRule(selector + '{' + rulesStr + '}', s.cssRules.length);
			}
			else { /* IE */
				s.addRule(selector, rulesStr, -1);
			}
		}
	}
})(window.jQuery);
