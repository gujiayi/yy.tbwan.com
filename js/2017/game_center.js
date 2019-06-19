/**
 * @WebSite   :http://www.9377.com/game_center.php
 * @DateTime  :2017-08-28 15:57:27
 * 用户中心 2017
**/
setTab({
	'sel' : '#gc-kv .hd li',
	'obj' : '#gc-kv .bd li',
	'event' : 'mouseenter',
	'auto' : true
});
function showKvImg(){
	if (C9377.scrWidth >= 1200) {
		$('#gc-kv .a').each(function(index, el) {
			$(this).attr('src', $(this).attr('_src'));
		});
	}else{
		$('#gc-kv .b').each(function(index, el) {
			$(this).attr('src', $(this).attr('_src'));
		});
	}
}

$('.pc_game_btn').click(function(){
	$(this).addClass('active').siblings().removeClass('active');
	loadGame(); // 加载游戏
	$('.hotgame-list-pc').show();	
	$('.hotgame-list-mobile').hide();	
})
$('.mobile_game_btn').click(function(){
	$(this).addClass('active').siblings().removeClass('active');
	loadGameMobile(); // 加载游戏
	$('.hotgame-list-mobile').show();	
	$('.hotgame-list-pc').hide();	
})
//游戏推荐的高度
var h=$('.rank-list li').outerHeight();
var num=h*$('.rank-list li').length;
if(num<847){
	$('.rank-list').css('height',num+'px')
}

// 数据变量
var serarcData = {}, //搜索数据
	filterData = {}, //过滤过的数据
	filterParam = {}; //过滤筛选记录

$(window).resize(function() {
	C9377.scrWidth = $(window).width(); //页面尺寸变化，重新获取width
	if (C9377.scrWidth >= 1200) {
		C9377.num = 16;
	}else{
		C9377.num = 12;
	}
	
	showKvImg(); // 加载幻灯
	loadGame(); // 加载游戏
	
}).trigger('resize');


function loadGame(){
	// url参数判断; 筛选游戏
	var xtype = $_GET['type'];
	if (xtype) {
		$('.filter-box a').each(function(index, el) {
			var obj = $(this), xtxt = obj.html();
			if (xtxt.indexOf(xtype) > -1) {
				setTimeout(function(){
					obj.trigger('click');
				}, 0)
				return false;
			}
		});
	}
	var key = $_GET['q'];
	var vkey = serarcData[C9377.num+'_'+key];
	if (vkey) {
		$('.hotgame-list-pc').html(vkey.html);
	}else{
		var param = {
			'num' : C9377.num,
			'q' : key
		}
		$.getJSON('/game_center_data.php', param, function(result) {
			serarcData[C9377.num+'_'+key] = result;
			$('.hotgame-list-pc').html(result.html);
		});
	}
	resetParam();
}
//手游
// 数据变量
var serarcData2 = {}, //搜索数据
	filterData2 = {}, //过滤过的数据
	filterParam2 = {}; //过滤筛选记录

loadGameMobile()
function loadGameMobile(){
	// url参数判断; 筛选游戏
	var xtype = $_GET['type'];
	if (xtype) {
		$('.filter-box a').each(function(index, el) {
			var obj = $(this), xtxt = obj.html();
			if (xtxt.indexOf(xtype) > -1) {
				setTimeout(function(){
					obj.trigger('click');
				}, 0)
				return false;
			}
		});
	}
	var key = $_GET['q'];
	var vkey = serarcData2[C9377.num+'_'+key];
	if (vkey) {
		$('.hotgame-list-mobile').html(vkey.html);
	}else{
		var param = {
			'num' : C9377.num,
			'q' : key,
			'phone_game' : 1
		}
		$.getJSON('/game_center_data.php', param, function(result) {
			serarcData2[C9377.num+'_'+key] = result;
			$('.hotgame-list-mobile').html(result.html);
		});
	}
	resetParam();
}



function gameCenterSearch(_form){
	var _form = $(_form),
		key = _form.find('.key').val();
	
	var isPc = $('.hotgame-list-pc').css('display');
	if(isPc=='block'){
		var vkey = serarcData[C9377.num+'_'+key];
		if (vkey) {
			$('.hotgame-list-pc').html(vkey.html)
		}else{
			var param = {
				'num' : C9377.num,
				'q' : key
			}
			$.post('/game_center_data.php', param, function(result) {
				serarcData[C9377.num+'_'+key] = result;
				$('.hotgame-list-pc').html(result.html)
			},'json');
		}
		resetParam();
		return false;
	}else{
		var vkey = serarcData2[C9377.num+'_'+key];
		if (vkey) {
			$('.hotgame-list-mobile').html(vkey.html)
		}else{
			var param = {
				'num' : C9377.num,
				'q' : key,
				'phone_game' : 1
			}
			$.post('/game_center_data.php', param, function(result) {
				serarcData2[C9377.num+'_'+key] = result;
				$('.hotgame-list-mobile').html(result.html)
			},'json');
		}
		resetParam();
		return false;
	}
}

function resetParam(){
	filterParam = {}; // 重置为空，让搜索后分页按钮可用
	$('.filter-item .bd').each(function(){
		$(this).children('a').removeClass('active').eq(0).addClass('active');
	});
}


function gameFilter(_this, type, key){
	var _this = $(_this);
	_this.addClass('active').siblings().removeClass('active');
	filterParam.num = C9377.num;
	if (type == 'type') {
		filterParam.type = key;
	}else if(type == 'subject'){
		filterParam.subject = key;
	}else if(type == 'letter'){
		filterParam.letter = key;
	}
	
	var isPc = $('.hotgame-list-pc').css('display');
	if(isPc=='block'){
		var vkey = filterData[filterParam.num+'_'+filterParam.type+'_'+filterParam.subject+'_'+filterParam.letter]; //读取筛选过的数据
		if (vkey) {
			$('.hotgame-list-pc').html(vkey.html)
		}else{
			$.getJSON('/game_center_data.php', filterParam, function(result) {
				filterData[filterParam.num+'_'+filterParam.type+'_'+filterParam.subject+'_'+filterParam.letter] = result;
				$('.hotgame-list-pc').html(result.html)
			});
		}
	}else{
		var vkey = filterData2[filterParam.num+'_'+filterParam.type+'_'+filterParam.subject+'_'+filterParam.letter]; //读取筛选过的数据
		if (vkey) {
			$('.hotgame-list-mobile').html(vkey.html)
		}else{
			$.getJSON('/game_center_data.php?phone_game=1', filterParam, function(result) {
				filterData2[filterParam.num+'_'+filterParam.type+'_'+filterParam.subject+'_'+filterParam.letter] = result;
				$('.hotgame-list-mobile').html(result.html)
			});
		}
	}
}

// 分页操作
$('.mod-pages .pagex').live('click',function() {
	if ($(this).hasClass('on')) { return false;}
	var pid = $(this).attr('pid');
	if (!pid || pid == 0) { return false; }
	var key = $_GET['q'];
	var isPc = $('.hotgame-list-pc').css('display');
	if(isPc=='block'){
		if (key && !filterParam) {
			// 搜索分页
			var param = {
				'num' : C9377.num,
				'q': key,
				'p' : pid
			}
		}else{
			// 普通分页
			var param = {
				'num' : C9377.num,
				'type': filterParam.type,
				'subject': filterParam.subject,
				'letter': filterParam.letter,
				'p' : pid
			}
		}
		$.getJSON('/game_center_data.php', param, function(result) {
			$('.hotgame-list-pc').html(result.html);
		});
		return false;
	}else{
		if (key && !filterParam) {
			// 搜索分页
			var param = {
				'num' : C9377.num,
				'q': key,
				'p' : pid,
				'phone_game' : 1
			}
		}else{
			// 普通分页
			var param = {
				'num' : C9377.num,
				'type': filterParam.type,
				'subject': filterParam.subject,
				'letter': filterParam.letter,
				'p' : pid,
				'phone_game' : 1
			}
		}
		$.getJSON('/game_center_data.php?phone_game=1', param, function(result) {
			$('.hotgame-list-mobile').html(result.html);
		});
		return false;
	}
});


