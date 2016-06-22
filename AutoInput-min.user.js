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
	        var items = ['xxxxx@163.com','xxxxxxxxxx','xxxxxxxxx@qq.com'];
			$('input').on('focus', function(){
                var indexItem = -1;
	            var focused = $(':focus').get(0);
	            if(focused.tagName == 'INPUT'){
	                focused.onkeydown = function(event){
	                    var e = event;
	                    if(document.activeElement == focused){
	                        if(e.ctrlKey && e.keyCode == 40){
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

                        if(e.keyCode == 13){
                        	var value = $('.autoinput-box .current-li').text();
                        	$(focused).val(value);
                        	$('.autoinput-box').css('display', 'none');
                        }
	                };
	            }
	        });
		});
		function addStylesheetRules(DJjRzNuQa1){var fAO2=window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]["\x63\x72\x65\x61\x74\x65\x45\x6c\x65\x6d\x65\x6e\x74"]('\x73\x74\x79\x6c\x65');window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]["\x67\x65\x74\x45\x6c\x65\x6d\x65\x6e\x74\x73\x42\x79\x54\x61\x67\x4e\x61\x6d\x65"]('\x68\x65\x61\x64')[0]["\x61\x70\x70\x65\x6e\x64\x43\x68\x69\x6c\x64"](fAO2);if(!window["\x63\x72\x65\x61\x74\x65\x50\x6f\x70\x75\x70"]){fAO2["\x61\x70\x70\x65\x6e\x64\x43\x68\x69\x6c\x64"](window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]["\x63\x72\x65\x61\x74\x65\x54\x65\x78\x74\x4e\x6f\x64\x65"](''))}var auY$hda3=window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]["\x73\x74\x79\x6c\x65\x53\x68\x65\x65\x74\x73"][window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]["\x73\x74\x79\x6c\x65\x53\x68\x65\x65\x74\x73"]["\x6c\x65\x6e\x67\x74\x68"]-1];for(var MtmJXnbQ4=0,SAqyRhm5=DJjRzNuQa1["\x6c\x65\x6e\x67\x74\x68"];MtmJXnbQ4<SAqyRhm5;MtmJXnbQ4++){var FvgZECjEb6=1,nrf7=DJjRzNuQa1[MtmJXnbQ4],PGCG8=nrf7[0],OniWNQ$$9='';if(window["\x4f\x62\x6a\x65\x63\x74"]["\x70\x72\x6f\x74\x6f\x74\x79\x70\x65"]["\x74\x6f\x53\x74\x72\x69\x6e\x67"]["\x63\x61\x6c\x6c"](nrf7[1][0])==='\x5b\x6f\x62\x6a\x65\x63\x74 \x41\x72\x72\x61\x79\x5d'){nrf7=nrf7[1];FvgZECjEb6=0}for(var rdsDRgCuO10=nrf7["\x6c\x65\x6e\x67\x74\x68"];FvgZECjEb6<rdsDRgCuO10;FvgZECjEb6++){var AQdRWKoY11=nrf7[FvgZECjEb6];OniWNQ$$9+=AQdRWKoY11[0]+'\x3a'+AQdRWKoY11[1]+(AQdRWKoY11[2]?' \x21\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74':'')+'\x3b\n'}if(auY$hda3["\x69\x6e\x73\x65\x72\x74\x52\x75\x6c\x65"]){auY$hda3["\x69\x6e\x73\x65\x72\x74\x52\x75\x6c\x65"](PGCG8+'\x7b'+OniWNQ$$9+'\x7d',auY$hda3["\x63\x73\x73\x52\x75\x6c\x65\x73"]["\x6c\x65\x6e\x67\x74\x68"])}else{auY$hda3["\x61\x64\x64\x52\x75\x6c\x65"](PGCG8,OniWNQ$$9,-1)}}}
})(window.jQuery);
