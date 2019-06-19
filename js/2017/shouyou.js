// 首页
	$('#slide-box').slideBox({mode: 'show', delay: 5});
	var sobj = $('#slide-box .slide-nav'), sw = sobj.outerWidth(true);
	sobj.css('margin-left', -1*sw/2+'px');
	if(/(mobile|ipad|iphone|android|\s+adr\s+)/i.test(navigator.userAgent)){
		$('#slide-box').css('overflow','hidden');
	}

// 热门游戏交互
	$('#index-hotgame-list li').click(function(){
		$(this).children('.rec-box .glink').css('visibility','visible');
	});
	$('.glink-close').click(function(){
		$(this).parent('.rec-box .glink').css('visibility','hidden');
		return false;
	})	
	// 幻灯
	if($('#index-hotgame .item').length > 3){
		$('#index-hotgame').slide({titCell:'.mobile-hd',mainCell:'.mobile-bd',autoPage:true,effect:'left',vis:3,scroll:3});
	}

// 截图幻灯
	$('.gamepic-box').slide({mainCell:'.slidepic-bd',nextBtn : '.next', prevBtn : '.prev', autoPlay:true,effect:'left'});

// 游戏资讯幻灯
	$("#news-slider").slide({titCell:".hd",mainCell:".bd",autoPage:true,effect:"left",autoPlay:true});

	
// 设置tab模块
	setIndexTab('.mod-opser');
	setIndexTab('.mod-news', function(id){
		$('.mod-news .mod-hd .more').hide().eq(id).show();
	});
	function setIndexTab(ele,cb){
		$(ele).find('.mod-select').click(function() {
			var _index = $(this).index(ele+' .mod-select');
			$(this).parent().find('.mod-select span').removeClass('active');
			$(this).find('span').addClass('active');
			$(this).closest('.mod').find('.J-tab-box').hide().eq(_index).show();
			if (cb) {
				cb(_index);
			}
		}).eq(0).trigger('click');
	}

//弹窗
$('.pay_tip_btn').click(function(){
	$('#lot_tip .text').html('目前手游仅能在手机下载后，才能在手机端进行充值，快去下载喜欢的游戏吧！');
	popSelect('#pop_box');
});

$('.go_homeweb,.down_ios').click(function(){
	$('#lot_tip .text').html('不负光阴不负卿，敬请期待！');
	popSelect('#pop_box');
});

//ie6 hover 无法控制子元素层级改变，使用js控制。
if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
  $("#index-hotgame-list .item a").live("mouseenter", function() {
    var _this = this;
    setTimeout(function() {
      $(_this).find(".back").css({
        "z-index": 10
      });
    }, 200);
    return false;
  });

  $("#index-hotgame-list .item a").live("mouseleave", function() {
    var _this = this;
    setTimeout(function() {
      $(_this).find(".back").css({
        "z-index": 0
      });
    }, 200);
    return false;
  });
}

// 懒加载
	function lazy_img(){
		var top = $(document).scrollTop();
		var height = $(window).height();
		lazy_img.img.each(function(){
			var _this = $(this);
			if(_this.attr('src')){
				_this.removeClass('lazy_load');
				return;
			}
			
			var y = _this.offset().top;
			var h = _this.height();
			if(y >= top && y <= top + height || y < top && y + h >= top){
				_this.attr('src', _this.attr('_src')).removeClass('lazy_load');
			}
		});
		lazy_img.img = $('img.lazy_load');
	}
	lazy_img.img = $('img.lazy_load');
	$(window).scroll(lazy_img);
	lazy_img();

