// 9377 H5
var H9377 = {
	init: function(){
		H9377.setSlide();
		H9377.setIndexTab();
		H9377.setTab();
		H9377.showFocus();
		H9377.getUserInfo();
		// H9377.checkUserLogin();
		$('.dialog-close').live('click', function() {
			$(this).closest('.mask').hide(); 
			if ($('#floatmod').length) {
				$('#floatmod').show();
				$('#floaticon').trigger('touchend');
			}
		});

		// 全局通用按钮事件，通过data-opt绑定
		$('.btn').click(function() {
			var opt = $(this).attr('data-opt');
			if (opt == "get-gift") {
				H9377.getGift();
			}
		});
		// 底部企业信息 pc显示
		// try {
		// 	if (footer == 0) {
				
		// 	}
		// } catch(e) {
		// 	H9377.footerInfo();
		// 	$('.wrapper').css({'marginBottom':'80px'});
		// 	// console.log(e);
		// }
		
		// 自动注册+登录
		if ($_GET['auto']) {
			setTimeout(function(){
				H9377.loadLoginMode('onekey');
			},300)
		}

		// IOS提审链接
		try {
        	calliPhoneNative('actiVation',{});
		} catch(e) {
			try {
				actiVation();
			} catch(e) {
				console.log(e);
			}
			console.log(e);
		}
		
		$('.login-save, .login-auto').click(function() {
			$(this).find('i').toggleClass('icon-cbed');
		});
	},
	setSlide: function(){
		// 首页幻灯
		if($('#slideBox .bd li').length > 1){
			C9377.include_once(C9377.resource+'/js/2017/h5/TouchSlide.1.1.js',function(){
				TouchSlide({slideCell:"#slideBox", titCell:".hd ul", mainCell:".bd ul", effect:"leftLoop", interTime:7000, autoPage:true, autoPlay:true });
				document.getElementById('slideBox').getElementsByTagName('img')[0].onload = function(){
					var nh = $('#slideBox img').eq(0).height();
					$('#slideBox, #slideBox .bd').height(nh);
					$('#slideBox .hd').css({'bottom':'10px'});
				}
			})
		}
	},
	setIndexTab: function(){
		$('#Js-nav li').click(function(){
			var navi = $(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$('#Js-navitem-box .Js-navitem').hide().eq(navi).show();
		})
	},
	setTab: function(tri, cnt){
		$('.Js-pubtab li').click(function() {
			var pti = $(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$(this).closest('.Js-pubtab-wrap').find('.Js-tabitem-box .Js-tabitem').hide().eq(pti).show();
		});
	},
	showFocus: function(){
		var html = '<div class="mask"> <div class="dialog-box"> <a href="javascript:;" title="关闭" class="dialog-close icon-close"></a> <div class="login-hd mx10"><img src="'+C9377.resource+'/images/2017/h5/logo.png?'+C9377.build+'" alt=""></div> <div class="qr"> <img src="'+C9377.resource+'/images/2017/h5/qr.jpg?'+C9377.build+'" alt=""> </div> </div> </div>';

		$('#btn-focus').click(function(){ 
			$('body').append(html);
		});
	},
	getGift: function(){
		H9377.confirmDialog({txt:'<label>礼包码：</label><span>caaabf345c06a4af</span><br>每个账号只能领取一次'})
	},
	confirmDialog: function(obj){
		var params = {
				txt: obj.txt || null,
				oklabel: obj.oklabel || '确定',
				cancelable: obj.cancelable || '取消',
				okcallback: obj.okcallback || null,
				cancelcallback: obj.cancelcallback || null
			}
		var html = '<div class="mask" id="confirmDialog"> <div class="dialog-box"> <p class="title">提示信息</p> <div class="info"> '+params.txt+' </div> <div class="flex opt"> <a href="javascript:;" class="flex-list ok" data-opt="ok">'+params.oklabel+'</a><a href="javascript:;" class="flex-list cancel" data-opt="cancel">关闭</a> </div> </div> </div>';

		$('body').append(html);
		$('#confirmDialog .opt a').click(function(){
			var opt = $(this).attr('data-opt');
			if (opt == "ok") {
				if (obj.okcallback) {
					obj.okcallback();
				}
			}else if (opt == "cancel"){
				if (obj.cancelcallback) {
					obj.cancelcallback();
				}
			}
			$('#confirmDialog').remove();
		})
	},
	dialog: function(txt, callback, tit){
		var xtit = tit ? tit : '提示信息';
		var html = '<div class="mask" id="dialog"> <div class="dialog-box"> <p class="title">'+xtit+'</p> <div class="info"> '+txt+' </div> <div class="flex opt"><a href="javascript:;" class="flex-list cancel">确定</a></div> </div> </div>';
		$('body').append(html);
		$('#dialog .cancel').click(function(){
			$('#dialog').remove();
		});
		if (callback) {
			callback();
		}
	},
	userImei : $_GET['device_imei'] ? $_GET['device_imei'] : ($_COOKIE['imei'] ? $_COOKIE['imei'] : ''),
	goUrl : $_GET['gourl'] ? $_GET['gourl'] : '',
	loadLoginMode: function(mode){
		$('#login-pop .mod-login-module').hide();
		switch (mode) {
			case 'guide':
				$('#login-pop .mod-login-guide').show();
				break;
			case 'phone':
				$('#login-pop .mod-reg-phone').show();
				break;
			case 'reg':
				$('#login-pop .mod-reg-pub').show();
				break;
			case 'onekey':
				$('#login-pop .mod-reg-onekey').show();
				break;
			case 'normal':
				$('#login-pop .mod-login-ulogin').show();
				break;
			default:
				if (C9377.wechat || $_GET['openid'] == 1) {
					H9377.loadLoginMode('guide');
				}else{
					$('#login-pop .mod-login-ulogin').show();
					$('.mod-login-ulogin input[name=username]').keydown(function(event) {
						if (event.keyCode == 8) {
							$('.mod-login-ulogin input[name=username], .mod-login-ulogin input[name=password]').val('')
						}
					});
					$('.mod-login-ulogin input[name=password]').keydown(function(event) {
						if (event.keyCode == 8) {
							$(this).val('')
						}
					});
				}
				break;
		}
		$('#login-pop').show();

		if (mode == 'onekey') {
			// 快速注册
			H9377.createAccount();
			H9377.userRegister($('.mod-reg-onekey'),'onekey');
		}
		if (!mode) {
			if (H9377.userImei) {
				H9377.getLoginList('.w-item');
			}else{
				H5Local.getList();
			}
		}

		// 正常注册 [备用]
		function H5Register(){
			var urn = $('#J-username').val(),
				psw = $('#J-password').val(),
				name = $('#J-name').val(),
				idc = $('#J-idc').val();

			if (urn.length < 4 || psw.length < 6 || name.length < 1 || idc.length < 15) {
				H9377.dialog('请输入正确信息');
				return false;
			}
			var param = {
				'do' : 'register',
				'LOGIN_ACCOUNT' : urn,
				'PASSWORD' : psw,
				'PASSWORD1' : psw,
				'NAME' : name,
				'ID_CARD_NUMBER' : idc,
				'gid' : C9377.gid,
				'login_save' : 50,
				'device_imei' : H9377.userImei,
				'client' : 1,
				'is_ajax' : 1
			}
			getJson(param, function(result){
				if (result.msg == '注册成功, 正在为您跳转' || result.msg == '登录成功') {
					if (H9377.goUrl) {
						window.location.href = H9377.goUrl;
					}else{
						$('.dialog-close').trigger('click');
						H9377.checkUserLogin();
					}
				}else{
					H9377.dialog(result.msg);
					return false;
				}
			}, '/h5/register.php','POST');
		} 
	},
	userLogin : function(ele){
		var _form = $(ele).closest('.mod-login-module'),
			urn = _form.find('input[name=username]').val(),
			psw = _form.find('input[name=password]').val();
		if (!CSRegular.uname(urn)) {
			H9377.dialog('请输入正确帐号');
			return false;
		}
		
		if (!CSRegular.pass(psw)) {
			H9377.dialog('请输入正确密码');
			return false;
		}

		var param = {
			'do' : 'login',
			'username' : urn,
			'password' : psw,
			'gourl' : H9377.goUrl,
			'device_imei' : H9377.userImei,
			'gid' : C9377.gid,
			'login_save' : 50,
			'return_json' : 1
		}
		getJson(param, function(result){
			if (result.status == 0) {
				var al_cookie = $('[name=login_auto]').hasClass('icon-cbed');
					al_cookie = al_cookie ? 1 : 0;
				C9377.setcookie('h5_autoLogin',al_cookie,(new Date('2099-12-28 08:00:00')/1000));
				
				if (!H9377.userImei) {
					var isrem = $('[name=login_save]').hasClass('icon-cbed');
					if (isrem) {
						H5Local.set(urn, psw, 1);
					}else{
						H5Local.set(urn, '', 0);
					}
				}

				if (window['isRefresh']) {
					window.location.reload();
				}else{
					if (H9377.goUrl) {
						window.location.href = H9377.goUrl;
					}else{
						$('.dialog-close').trigger('click');
						H9377.checkUserLogin();
					}
				}
			}else{
				H9377.dialog(result.msg);
				return false;
			}
		}, '/h5/login.php','POST');
	},
	userRegister : function(ele, mod, terms, pass2){
		var _form = $(ele).closest('.mod-login-module');

		if (mod == 'phone') {
			// 手机注册
			var cellphone = _form.find('input[name=cellphone]').val(),
				psw = _form.find('input[name=password]').val(),
				captcha = _form.find('input[name=captcha]').val();
			if (!CSRegular.phone(cellphone)) {
				H9377.dialog('请输入正确手机号码');
				return false;
			}
			if (!CSRegular.pass(psw)) {
				H9377.dialog('请输入6~20位密码');
				return false;
			}
			if (!CSRegular.captcha(captcha)) {
				H9377.dialog('请输入正确验证码');
				return false;
			}
			var param = {
				'do' : 'register',
				'LOGIN_ACCOUNT' : cellphone,
				'PASSWORD' : psw,
				'PASSWORD1' : psw,
				'cellphone' : 1,
				'captcha' : captcha,
				'gid' : C9377.gid,
				'login_save' : 50,
				'device_imei' : H9377.userImei,
				'device_model' : getCookie('device_model'),
				'device_network' : getCookie('device_network'),
				'client' : 1,
				'is_ajax' : 1,
				'return_json' : 1
			}
			getJson(param, function(result){
				if (result.status == 0) {
					if (!H9377.userImei) {
						var isrem = $('[name=login_save]').hasClass('icon-cbed');
						if (isrem) {
							H5Local.set(urn, psw, 1);
						}else{
							H5Local.set(urn, '', 0);
						}
					}
					try {window.AndroidUtils.todayCollectRegister(); } catch(e) {console.log(e); } //统计注册
					if (window['isRefresh']) {
						window.location.reload();
					}else{
						if (H9377.goUrl) {
							window.location.href = H9377.goUrl;
						}else{
							$('.dialog-close').trigger('click');
							H9377.checkUserLogin();
						}
					}
				}else{
					H9377.dialog(result.msg);
					return false;
				}
			}, '/h5/register.php','POST');
		}
		if (mod == 'reg' || mod == 'onekey') {
			// 普通注册
			var urn = _form.find('input[name=username]').val(),
				psw = _form.find('input[name=password]').val();
			if (!urn && !psw) { H9377.loadLoginMode('onekey'); return false;}
			if (!CSRegular.uname(urn)) {
				H9377.dialog('请输入6~20位帐号');
				return false;
			}
			if (!CSRegular.pass(psw)) {
				H9377.dialog('请输入6~20位密码');
				return false;
			}
			if (pass2) {
				var psw2 = _form.find('input[name=password2]').val();
				if (!CSRegular.pass(psw2)) {
					H9377.dialog('请输入6~20位密码');
					return false;
				}
				if (psw != psw2) {
					H9377.dialog('两次密码输入不一致');
					return false;
				}
			}
			
			if (terms) {
				var ts = _form.find('input[name=terms]').attr('checked');
				if (!ts) {
					H9377.dialog('同意用户协议才能注册哦！');
					return false;
				}
			}
			var param = {
				'do' : 'register',
				'LOGIN_ACCOUNT' : urn,
				'PASSWORD' : psw,
				'PASSWORD1' : psw,
				'login_save' : 50,
				'device_imei' : H9377.userImei,
				'device_model' : getCookie('device_model'),
				'device_network' : getCookie('device_network'),
				'gid' : C9377.gid,
				'client' : 1,
				'is_ajax' : 1
			}
			getJson(param, function(result){
				if (result.msg == '注册成功, 正在为您跳转' || result.msg == '登录成功') {
					if (!H9377.userImei) {
						var isrem = $('[name=login_save]').hasClass('icon-cbed');
						if (isrem) {
							H5Local.set(urn, psw, 1);
						}else{
							H5Local.set(urn, '', 0);
						}
					}
					try {window.AndroidUtils.todayCollectRegister(); } catch(e) {console.log(e); } //统计注册
					if (mod == 'onekey') {
						// PrtSc(1); // 一键注册+安卓截屏
						if (H9377.OS().name == 'Android') {
							PrtSc(1, urn, psw); //2017.12.08之前双端截屏
						}else{
							try {
								calliPhoneNative('PrtSc',{'status':1,'msg':'success'}); //2017.12.08之后ios端使用
							} catch(e) {
								PrtSc(1, urn, psw); //2017.12.08之前双端截屏
								console.log(e);
							}
						}
						var cd = 3, cdinter, ebtn = $('.mod-reg-onekey .btn-enter');
						cdinter = setInterval(function(){
							cd--;
							if (cd < 1) {
								regJump();
							}else{
								ebtn.html('进入游戏（'+cd+'）');
							}
						}, 1000);
						ebtn.click(function() {
							clearInterval(cdinter);
							regJump();
						});
					}else{
						regJump();
					}

					
					function regJump(){
						if (window['isRefresh']) {
							window.location.reload();
						}else{
							if (H9377.goUrl) {
								window.location.href = H9377.goUrl;
							}else{
								$('.dialog-close').trigger('click');
								H9377.checkUserLogin();
							}
						}
					}
				}else{
					H9377.dialog(result.msg);
					return false;
				}
			}, '/h5/register.php','POST');
		}
	},
	getLoginList: function(ele, mod){
		if (mod != '') {
			relList(mod);
		}else{
			if (!H9377.userImei) { return false;}
			var param = {
				'device_imei' : H9377.userImei,
				'list' : 1
			}	
			getJson(param, function(result){
				relList(result);
			}, '/api/openid_imei.php', 'GET', 'jsonp');
		}
		
		function relList(result){
			if(result.length && result[0].username){
				var tpl = '';
				var ull_len = result.length > 3 ? 3 : result.length;
				for(var i = 0; i < ull_len; i++){
					if (result[i].username) {
						tpl += '<li><span>'+result[i].username+'</span> <em class="del icon-close"></em></li>';
					}
				}
				if (tpl) {
					tpl = '<ul class="userlogin-list">'+tpl+'</ul>';
					$(ele).eq(0).append(tpl);
					var ew = $(ele).eq(0).width();
					$('.userlogin-list').width(ew);

					// 点击事件
					$('.w-item .more').click(function() {
						$('.userlogin-list').toggle();
					});
					if (mod != '') {
						// web端
						$('.userlogin-list li span').click(function() {
							var val = $(this).html(), xid = $(this).index();
							$('.mod-login-ulogin input[name=username]').val(val);
							$('.mod-login-ulogin input[name=password]').val(H5Local.xdata[xid].pass);
							$('.userlogin-list').hide();
						}).eq(0).trigger('click');

						$('.userlogin-list .del').click(function() {
							var uid = $(this).siblings('span').html(),
								_li = $(this).parent();

							H5Local.del(uid);
							_li.remove();
						});
					}else{
						// 手机app -- 有imei
						$('.userlogin-list li span').click(function() {
							var val = $(this).html();
							$('.mod-login-ulogin input[name=username]').val(val);
							$('.mod-login-ulogin input[name=password]').val(H9377.userImei);
							$('.userlogin-list').hide();
						});
						// 指定游戏id不自动填充帐号密码
						if ($.inArray(parseInt(C9377.gid), [538]) == -1) {
							$('.userlogin-list li span').eq(0).trigger('click');
						}
						$('.userlogin-list .del').click(function() {
							var uid = $(this).siblings('span').html(),
								_li = $(this).parent();

							var param = {
								'device_imei' : H9377.userImei,
								'list' : 1,
								'del' : uid
							}
							$.getJSON('/api/openid_imei.php', param, function(result){
								_li.remove();
							});
						});
					}
					
					// 自动登录
					var h5_autoLogin = getCookie('h5_autoLogin');
					if (parseInt(h5_autoLogin) == 1) {
						$('.login-auto').click();
						$('.w-submit').click(); 
					}

				}
			}
		}
	},
	createAccount : function(){
		// 帐号规则 日期加随机字母
		var str1 = 'abcdefghijklmnopqrxtuvwxyz',
			str2 = 'abcdefghijklmnopqrxtuvwxyz0123456789',
			myacc = {account:'',password:'123456789'},
			now = new Date;
		myacc.account = 'yd'+ randomNum(10000000,99999999);
		
		function randomNum(minNum,maxNum){ 
			switch(arguments.length){ 
				case 1: 
					return parseInt(Math.random()*minNum+1,10); 
					break; 
				case 2: 
					return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
					break; 
				default: 
					return 0; 
					break; 
			} 
		} 

		$('.mod-reg-onekey .aitem').eq(0).html('账号：'+myacc.account);
		$('.mod-reg-onekey input[name=username]').val(myacc.account);
		$('.mod-reg-onekey input[name=password]').val(myacc.password);
		if (H9377.OS().name == 'PC') { $('.dialog-message').hide(); } //PC上不显示截屏提示

		return myacc;
	},
	sendCaptcha : function(ele, mod, dhpone){
		var _parent = $(ele).closest('.dialog-box2'),
			cellphone = _parent.find('input[name=cellphone]').val(),
			url = '/users/users_do.php';

		if (!CSRegular.phone(cellphone) && dhpone != 1) {
			H9377.dialog('请输入正确的手机号码');
			return false;
		}
		if (mod == 'bindphone') {
			// 绑定手机
			var param = {
				'do' : 'bind_cellphone',
				'step' : '1',
				'cellphone' : cellphone,
				'json' : 1
			}
		}else if(mod == 'bp@code'){
			// 绑定手机+验证码
			var code = _parent.find('input[name=code]').val();
			if (!code) {
				H9377.dialog('请输入验证码');
				return false;
			}
			var param = {
				'do' : 'bind_cellphone',
				'step' : '1',
				'cellphone' : cellphone,
				'code' : code
			}
		}else if(mod == 'ubp@code'){
			// 绑定手机+验证码
			var code = _parent.find('input[name=code]').val();
			if (!code) {
				H9377.dialog('请输入验证码');
				return false;
			}
			var param = {
				'do' : 'bind_cellphone',
				'step' : '3',
				'code' : code
			}
		}else if(mod == 'email'){
			// 发送邮件验证码
			var vemail = _parent.find('input[name=email]').val();
			if (!vemail) {
				H9377.dialog('请输入正确邮箱');
				return false;
			}
			var param = {
				'do' : 'send_mail',
				'email' : vemail
			}
		}else if(mod == 'ubemail'){
			// 发送邮件验证码
			var vcode = _parent.find('input[name=code]').val();
			if (!vcode) {
				H9377.dialog('请输入验证码');
				return false;
			}
			var param = {
				'do' : 'send_mail',
				'code' : vcode
			}
		}else if(mod == 'forgetpass'){
			// 忘记密码 todo
			var param = {
				'do' : 'cellphone',
				'step' : '2',
				'type' : '2',
				'cellphone' : cellphone,
				'json' : 1
			}
			url = '/getpass.php';
		}else if(mod == 'modpsw1'){
			// 修改密码
			var param = {
				'do' : 'send_sms',
				'vpwd2' : 0
			}
			url = '/users/users_modpass.php';
		}else if(mod == 'retpass@phone'){
			// 找回密码
			var param = {
				'do' : 'send_sms',
				'vpwd2' : 1
			}
			url = '/users/users_modpass.php';
		}else if(mod == 'retpass@email'){
			// 找回密码
			var param = {
				'do' : 'send_sms',
				'vpwd2' : 1
			}
			url = '/users/users_modpass.php';
		}else{
			// 手机注册
			var param = {
				'LOGIN_ACCOUNT' : cellphone,
				'cellphone' : 1,
				'send_captcha' : 'sent'
			}
			url = '/h5/register.php';
		}
		if (mod == 'bindphone' || mod == 'bp@code' || mod == 'ubp@code') {
			// 绑定手机返回参数不同
			getJson(param, function(result){
				if (result.status == 1) {
					$('.J-sendcaptcha').attr('disabled','disabled').addClass('w-button-disabled');
					capt_cd = 60;
					var capt_timer = setInterval(function(){
						capt_cd--;
						$('.J-sendcaptcha').text(capt_cd+'秒后重试');
						if (capt_cd == 1) {
							$('.J-sendcaptcha').text('发送验证码').removeAttr('disabled').removeClass('w-button-disabled');
							clearInterval(capt_timer);
						}
					},1000)
				}else{
					H9377.dialog('发送失败');
				}
			}, url,'POST');
		}else{
			getJson(param, function(result){
				if (result.status == 0) {
					$('.J-sendcaptcha').attr('disabled','disabled').addClass('w-button-disabled');
					capt_cd = 60;
					var capt_timer = setInterval(function(){
						capt_cd--;
						$('.J-sendcaptcha').text(capt_cd+'秒后重试');
						if (capt_cd == 1) {
							$('.J-sendcaptcha').text('发送验证码').removeAttr('disabled').removeClass('w-button-disabled');
							clearInterval(capt_timer);
						}
					},1000)
				}else{
					H9377.dialog(result.msg);
				}
			}, url,'POST');
		}
	},
	checkUserLogin : function(){
		$.getJSON(C9377.app_url+'/api/user_info_jsonp.php?level=1&last_game=1&num=3&callback=?', function(json){
			H9377.Uinfo = json;
			if(!json.LOGIN_ACCOUNT) {
				H9377.loadLoginMode();
				return;
			}else{
				var json_name = json.BBS_NAME ? json.BBS_NAME : (!json.IS_OPENID ? json.LOGIN_ACCOUNT : (json.openid && json.openid.nickname ? json.openid.nickname : json.LOGIN_ACCOUNT));

				var avatar = $_COOKIE['user_avatar_big'] || 'http://bbs.9377.com/uc_server/images/noavatar_big.gif';
				$('.avatar').attr('src', avatar);
				// 首页登录信息
				$('.nick-name').text(json_name);
				$('.uid').text('UID: '+json.ID);
				if( json.last_games != '' ) {
					var html = '';
					html += '<h2 class="played-tit">我玩过的</h2>'+
					'<div class="played-list">'+
					'<div class="played-lists">'+
					'<ul class="flex">';
					for( i in json.last_games ) {
						if( !json.last_games[i].NAME ) continue;
						html += '<li>';
						html +='<a href="'+json.last_games[i].site+'">';
						html +=' <img src="'+C9377.resource+'/images/2017/h5/icon/'+json.last_games[i].ALIAS+'.png?'+C9377.build+'">';
						html += '<span>'+json.last_games[i].NAME+'</span> </a>';
						html += '</li>';
					}
					html +='</ul></div></div>';

					$('.played').html(html);
				}
				// 个人中心
				if (json.PHONE) {
					var ns = json.PHONE.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2");
					$('.btn-bindphone span').text(ns);
				}else {
					$('.btn-bindphone').click(function() {
						H9377.selectUcMod('bindphone');
					});
				}
				if (json.ID_CARD_NUMBER) {
					var ns = json.ID_CARD_NUMBER.replace(/^(\d{4})\d{12}(\d+)/,"$1****$2");
					$('.btn-bindidc span').text(ns);
				}else {
					$('.btn-bindidc').click(function() {
						H9377.bindIdc();
					});
				}
			}
		});
	},
	getUserInfo : function(){
		if(!$('#pay-form').length && !$('.login-bg').length){
			// 充值页面|登陆界面，不在这里获取用户数据	
			$.getJSON(C9377.app_url+'/api/user_info_jsonp.php?level=1&last_game=1&num=3&callback=?', function(json){
				H9377.Uinfo = json;
			});
		}
	},
	selectUcMod : function(mode){
		$('#floatmod').hide();
		// 游戏界面弹窗
		$('#uc-pop .mod-uc').hide();
		$('#uc-pop .mod-uc-'+mode).show();

		if (mode == 'pass') {
			var isnew = getCookie('defpsw');
			if (!isnew || isnew == '0') {
				// 修改过初始密码
				H9377.selectUcMod('pass2');
			}else{
				H9377.selectUcMod('pass1');
				$('input[name=oldpassword]').val(isnew);
			}
		}else if(mode == 'pass2-2'){
			$('#uc-pop .mod-uc-pass2').show();
			$('#uc-pop .mu-pass2').hide();
			$('#uc-pop .mu-pass2-2').show();
		}else if(mode == 'ubp' || mode == 'ubemail' || mode == 'bindphone'){
			$('#uc-pop .mod-uc-'+mode).find('.php-code').click();
		}else if(mode == 'ggc'){
			moveStop(); //关闭页面滚动
		}

		if(!mode) {
			$('#uc-pop .mod-uc-ctl').show();
			$('.php-code').attr('src','');
		}

		$('#uc-pop').show();
	},
	bindIdc: function(ele){
		var obj = $(ele), part = obj.closest('.mod-uc');
		var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"} 

		var idcname = part.find('input[name=realname]').val(),
			idc = part.find('input[name=idc]').val();
		if (!verName(idcname)) {
			H9377.dialog('请输入正确姓名');
			return false;
		}
		if (!verName(idcname) || !verIdc(idc)) {
			H9377.dialog('请输入正确身份证');
			return false;
		}
		var param = {
			'do' : 'fcm',
			'return_json' : '1',
			'name' : idcname,
			'id_card_number' : idc
		}
		getJson(param, function(result){
			if (result.showmsg) {
				// window.location.reload();
				// part.find('input[name=realname]').attr('disabled','disabled');
				// part.find('input[name=idc]').attr('disabled','disabled');
				part.find('.btn-submit').attr('onClick','').html('认证成功');
			}else{
				H9377.dialog(result.msg);
			}
		},'/users/users_do.php','POST');
		function verName(value){
			var str=value.replace(/ /g,"")
			if (str==''|| DataLength(str)<4 || DataLength(str)>16){return false}
			var reg = /^[\u4E00-\u9FA5]+$/; 
			if(!reg.test(str)){return false}
			return true;
		}
		function DataLength(fData){
		    var intLength=0
		    for (var i=0;i<fData.length;i++)
		    {
		        if ((fData.charCodeAt(i) < 0) || (fData.charCodeAt(i) > 255))
		            intLength=intLength+2
		        else
		            intLength=intLength+1    
		    }
		    return intLength
		}
		function verIdc(sId){
			var iSum=0
			if(!/^\d{17}(\d|x)$/i.test(sId))return false;
			sId=sId.replace(/x$/i,"a");
			if(aCity[parseInt(sId.substr(0,2))]==null)return false;
			sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
			var d=new Date(sBirthday.replace(/-/g,"/"))
			if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return false;
			for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11)
			if(iSum%11!=1)return false;
			return true;
		}
	},
	modifyPass: function(ele){
		// 直接修改密码
		var obj = $(ele), part = obj.closest('.mod-uc');
		
		var pass_old = part.find('input[name=oldpassword]').val(),
			pass_new = part.find('input[name=newpassword]').val();
		if (!CSRegular.pass(pass_old)) {
			H9377.dialog('请输入旧密码');
			return false;
		}
		if (!CSRegular.pass(pass_new)) {
			H9377.dialog('请输入6~20位新密码');
			return false;
		}
		var param = {
			'do' : 'pwd_up',
			'password_old' : pass_old,
			'password' : pass_new,
			'password1' : pass_new,
			'device_imei' : H9377.userImei,
			'return_json' : 1
		}
		getJson(param, function(result){
			if (result.status == "1") {
				$('.dialog-close').trigger('click');
				part.find('input[name=oldpassword]').val(''); //清空输入的密码
				part.find('input[name=newpassword]').val(''); //清空输入的密码
				H9377.selectUcMod('pass4');
			}else{
				H9377.dialog(result.msg);
			}
		},'/users/users_do.php','POST');
	},
	modpsw : function(sid){
		// 分步骤修改密码
		if (!sid) { return false;}
		if (sid == 1) {
			// 提交验证码
			var vc = $('.mod-uc-pass2 input[name=captcha]').val();
			if (!vc) {
				H9377.dialog('请输入验证码');
				return false;
			}
			var param = {
				'do' : 'phone',
				'captcha' : vc,
				'vpwd2' : 0
			}
			getJson(param, function(result){
				if (result.status == 0) {
					H9377.selectUcMod('pass2-2');
				}else{
					H9377.dialog(result.msg);
				}
			},'/users/users_modpass.php','POST');
		}
		if (sid == 2) {
			// 确认修改密码
			var password = $('.mod-uc-pass2 input[name=newpassword]'),
				password1 = $('.mod-uc-pass2 input[name=newpassword2]'),
				vpass = password.val(),
				vpass1 = password1.val();
			if (vpass.length < 6) {
				H9377.dialog('密码输入有误');
				password.focus();
				return false;
			}
			if (vpass1.length < 6) {
				H9377.dialog('密码输入有误');
				password1.focus();
				return false;
			}
			if (vpass != vpass1) {
				H9377.dialog('两次密码输入不一致');
				password1.focus();
				return false;
			}

			var param = {
				'do' : 'pwd_up',
				'password' : vpass,
				'password1' : vpass1,
				'vpwd2':0
			}
			getJson(param, function(result){
				if (result.status == 0) {
					H9377.selectUcMod('pass3');
				}else{
					H9377.dialog(result.msg);
				}
			},'/users/users_modpass.php','POST');
		}
	},
	bindPhone: function(ele){
		var obj = $(ele), part = obj.closest('.mod-uc');

		var cellphone = part.find('input[name=cellphone]').val(),
			captcha = part.find('input[name=captcha]').val();
		if (!CSRegular.phone(cellphone)) {
			H9377.dialog('请输入正确手机号');
			return false;
		}
		if (!CSRegular.captcha(captcha)) {
			H9377.dialog('请输入正确验证码');
			return false;
		}
		var param = {
			'do' : 'bind_cellphone',
			'step' : '2',
			'cellphone' : cellphone,
			'captcha' : captcha,
			'json' : 1
		}
		getJson(param, function(result){
			if (result.status == "0") {
				H9377.selectUcMod();
				// $('.dialog-close').trigger('click');
				H9377.Uinfo.BIND_CELLPHONE = '1';
				H9377.Uinfo.PHONE = cellphone;
				H9377.dialog(result.message);
				$('.mod-uc-bindphone .w-item-wp').hide();
				$('.mod-uc-bindphone .btn-submit').hide();
				// 弹出礼包弹窗
				// $('.btn-getBPcard').trigger('click');
			}else{
				H9377.dialog(result.message);
			}
		},'/users/users_do.php','POST');
	},
	unbindPhone: function(ele){
		var obj = $(ele), part = obj.closest('.mod-uc');

		var cellphone = part.find('input[name=cellphone]').val(),
			captcha = part.find('input[name=captcha]').val();
		if (!CSRegular.phone(cellphone)) {
			H9377.dialog('请输入正确手机号');
			return false;
		}
		if (!CSRegular.captcha(captcha)) {
			H9377.dialog('请输入正确验证码');
			return false;
		}
		var param = {
			'do' : 'bind_cellphone',
			'step' : '4',
			'captcha' : captcha,
			'json' : 1
		}
		getJson(param, function(result){
			if (result.status == "0") {
				$('.mod-uc-bindphone .w-form-s').show();
				$('.mod-uc-bindphone .w-form-e').hide();
				H9377.selectUcMod('bindphone');
			}else{
				H9377.dialog(result.message);
			}
		},'/users/users_do.php','POST');
	},
	bindEmail: function(ele){
		var obj = $(ele), part = obj.closest('.mod-uc'),
			vemail = part.find('input[name=email]').val(),
			vcode = part.find('input[name=code]').val();

		if (!vemail) {H9377.dialog('请输入正确邮箱'); return false; }
		if (!vcode) {H9377.dialog('请输入邮箱验证码'); return false; }
		var param = {
			'do' : 'code_mail',
			'email' : vemail,
			'code' : vcode
		}
		getJson(param, function(result){
			if (result.status == 0) {
				$('.mod-uc-email .w-form-s').hide();
				$('.mod-uc-email .w-form-e').show();
			}else{
				H9377.dialog(result.msg);
				return false;
			}
		}, '/users/users_do.php','POST');
	},
	unbindEmail: function(ele){
		var obj = $(ele), part = obj.closest('.mod-uc'),
			vcode = part.find('input[name=captcha]').val();

		if (!vcode) {H9377.dialog('请输入邮箱验证码'); return false; }
		var param = {
			'do' : 'code_mail',
			'code' : vcode
		}
		getJson(param, function(result){
			if (result.status == 0) {
				$('.mod-uc-email .w-form-s').show();
				$('.mod-uc-email .w-form-e').hide();
				H9377.selectUcMod('email');
			}else{
				H9377.dialog(result.msg);
				return false;
			}
		}, '/users/users_do.php','POST');
	},
	kfOnline: function(){
		$('.mod-uc-kf .dialog-close').click();
		$('.kf-wp').show();
    	$('.kf-wp iframe').attr('src', 'https://tb.53kf.com/code/client/10165082/1');
	},
	footerInfo: function(){
		var html = '<footer id="footer"> <p>上海誉点信息技术有限公司</p> <p>沪网文【2015】0075-025号 沪ICP备14052946号-5</p> <p>增值电信业务经营许可证沪B2-20150073</p> </footer>';
		$('body').append(html);
	},
	OS : function(){
		var ua = navigator.userAgent,
			iPad = ua.match(/(iPad).*OS\s([\d_]+)/),
			isIphone = !iPad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
			isAndroid = ua.match(/(Android)\s+([\d_]+)/),
			isMobile = isIphone || isAndroid;
		if (isAndroid) {
			return {name:'Android', ver : isAndroid};
		}else if(iPad){
			return {name:'iPad', ver : iPad};
		}else if(isIphone){
			return {name:'iPhone', ver : isIphone};
		}else{
			return {name: 'PC', ver : ua};
		}
	},
	getCard : function(ele, vcid, vbp, vtid){
		var _this = $(ele),
			cnt = _this.find('.desc').html();
		if (H9377.Uinfo && H9377.Uinfo.LOGIN_ACCOUNT) {
			var cid = vcid, isBP = vbp, tid = vtid;
			var tpl = '';
			if (cid) {
				// 普通礼包 
				if (isBP) {
					// 领取手机礼包
					if (H9377.Uinfo.BIND_CELLPHONE == '1' && H9377.Uinfo.PHONE) {
						H9377.cardBox(cid, cnt);
					}else{
						H9377.selectUcMod('bindphone');
					}
				}else{
					H9377.cardBox(cid, cnt);
				}
			}else{
				// 系统礼包
				if (!isBP || (isBP && H9377.Uinfo.BIND_CELLPHONE == '1' && H9377.Uinfo.PHONE)) {
					$.getJSON(C9377.app_url+'/game_card.php?card_type='+tid+'&gid='+C9377.gid+'&sign=1', function(json){
						if (json.status == 1) {
							H9377.cardBox(json.msg, cnt);
						}else if(json.status == -12){
							H9377.selectUcMod('bindphone');
						}else{
							H9377.dialog(json.msg);
						}
					}); 
				}else{
					H9377.selectUcMod('bindphone');
				}
			}
		}else {
			H9377.loadLoginMode();
			return;
		}
	},
	cardBox : function(sid, cnt, callback){
		var html = '<div class="mask" id="dialog-gift"> <div class="dialog-box3 mod-uc"> <a href="javascript:;" title="关闭" class="dialog-gift-close icon-close"></a> <div class="tips-gift-tit"><img src="/images/2017/h5/right2.png?{{$CONFIG.build}}" width="28" height="28" class="img">领取成功</div> <div class="tips-gift-txt">礼包内容：'+cnt+'</div> <div class="tips-gift-node">'+sid+'</div> <a href="javascript:;" class="tips-gift-btn">复制礼包码</a> </div> </div>';
		$('body').append(html);
		$('#dialog-gift .dialog-gift-close').click(function(){
			$('#dialog-gift').remove();
		});
		if (callback) {
			callback();
		}
		C9377.include_once(C9377.resource+'/js/plugin/clipboard.min.js',function(){
			var clipboard = new ClipboardJS('.tips-gift-btn', {
				text: function() {
					return sid;
				}
			});
			clipboard.on('success', function(e) {
				console.log(e);
			});
			clipboard.on('error', function(e) {
				console.log(e);
			});
		})
	},
	maskClose : function(ele){
		var m = $(ele).closest('.mask');
		m.hide();
	},
	logout : function(){
		C9377.setcookie('h5_autoLogin',0,(new Date('2099-12-28 08:00:00')/1000)); //取消自动登录
		window.location.href = C9377.app_url+'/login.php?do=logout&gourl='+ encodeURIComponent(window.location.href);
	}
}
H9377.init();

// 找回密码
var retPass = {
	view : function(){
		$('.mod-login-module').hide();
		$('.mod-uc-retpass').show();
	},
	ver : function(){
		var acc = $('.retpass-step-1 input[name=account]').val(),
			code = $('.retpass-step-1 input[name=code]').val();
			uexist = false;
		if (!CSRegular.uname(acc)) {
			H9377.dialog('请输入正确帐号');
			return false;
		}
		var param = {
			'do' : 'user',
			'LOGIN_ACCOUNT' : acc,
			'username' : acc,
			'new' : 1
		}
		$.ajax({
			url: '/check_user.php',
			type: 'GET',
			dataType: 'json',
			data: param,
			cache: false,
			async: false,
			success: function(result){
				if (result) {
					H9377.dialog('用户名不存在');
					uexist = false;
				}else{
					uexist = true;
				}
			}
		});
		if (!uexist) {return false; }

		if (!code) {
			H9377.dialog('请输入验证码');
			return false;
		}
		var param = {
			'do' : 'set_getpass_user',
			'return_json' : 1,
			'username' : acc,
			'code' : code,
			'vpwd2' : 1
		}
		$.post('/h5/getpass.php', param, function(result) {
			if (result.status == 0) {
				$('.rp-user').html(result.set_getpass_user)
				var tpl_select = '';
				if (result.getpass_user.BIND_CELLPHONE == '1') {tpl_select += '<option value="1">密保手机</option>'; }
				if (result.getpass_user.EMAIL != '') {tpl_select += '<option value="2">密保邮箱</option>'; }
				$('.rp-phone').html(result.getpass_user.PHONE);
				$('.rp-email').html(result.getpass_user.EMAIL);
				$('#rp-type-list').html(tpl_select).change(function() {
					var val = $(this).val();
					if (val == '1') {
						$('.type-email').hide();
						$('.type-phone').show();
					}else if (val == '2') {
						$('.type-phone').hide();
						$('.type-email').show();
					}
				});
				
				$('.mod-uc-retpass .w-form').hide();
				$('.retpass-step-2').show();
			}else{
				$('.php-code').click();
				H9377.dialog('请输入验证码');
			}
		}, 'json');
	},
	verType : function(type){
		if (type == 'phone') {
			var captcha = $('.type-phone [name=captcha]').val();
			if (!captcha) {
				H9377.dialog('请输入验证码');
				return false;
			}
			var param = {
				'do' :  'phone',
				'captcha' : captcha,
				'vpwd2' : 1
			}
		}
		if (type == 'email') {
			var code = $('.type-email [name=code]').val();
			if (!code) {
				H9377.dialog('请输入验证码');
				return false;
			}
			var param = {
				'step' : 3,
				'code' : code,
				'vpwd2' : 1
			}
		}
		$.post('/users/users_modpass.php', param, function(result) {
			if (result.status == 0) {
				$('.mod-uc-retpass .w-form').hide();
				$('.retpass-step-3').show();
			}else{
				H9377.dialog(result.msg);
			}
		},'json');
	},
	verPass : function(){
		var password = $('.retpass-step-3 [name=password]'),
			password1 = $('.retpass-step-3 [name=password1]'),
			vpass = password.val(),
			vpass1 = password1.val();
		if (vpass.length < 6) {
			H9377.dialog(0, '密码输入有误');
			password.focus();
			return false;
		}
		if (vpass1.length < 6) {
			H9377.dialog(1, '密码输入有误');
			password1.focus();
			return false;
		}
		if (vpass != vpass1) {
			H9377.dialog(1, '两次密码输入不一致');
			password1.focus();
			return false;
		}

		var param = {
			'do' : 'pwd_up',
			'password' : vpass,
			'password1' : vpass1,
			'vpwd2':1
		}
		$.post('/users/users_modpass.php', param, function(result) {
			if (result.status == 0) {
				$('.mod-uc-retpass .w-form').hide();
				$('.retpass-step-4').show();
			}else{
				H9377.dialog(result.msg);
			}
		},'json');
	},
	close : function(){
		$('.mod-login-module').hide();
		$('.mod-login-ulogin').show();
		$('.mod-uc-retpass .w-form').hide();
		$('.retpass-step-1').show();
	}
}
// 本地帐号存储
var H5Local = {
	key : 'h5_user_info',
	xdata : '',
	db : function(){
		var data = C9377.data(H5Local.key);
		if(!data || !data.length){
			data = [];
		}
		return data;
	},
	set : function(user, pass, remp){
		var data = H5Local.db();
		for(var i = 0; i < data.length; i++){
			if(data[i].username == user){
				data.splice(i, 1);
			}
		}
		data.unshift({"username": user, "pass": pass, "remp": remp});
		data = data.slice(0, 3);
		C9377.data(H5Local.key, data);
	},
	read : function(user){
		var data = H5Local.db();
		var r = 0; //返回值
		if (user && data.length) {
			// 通过用户名读取数据
			for(var i = 0; i < data.length; i++){
				if(data[i].username == user){
					$('#username').val(data[i].username);
					if (data[i].remp || C9377.data('auto_login')) {
						// 参数remp为1 或者 设置了自动登录 的时候，才读取密码
						$('#password').val(data[i].password).focus();
						$('.log_label').eq(0).children('span').addClass('checked');
						r = 1;
					}else{
						$('.log_label').eq(0).children('span').removeClass('checked');
					}
				};
			}
		}
		return r;
	},
	del : function(user){
		var data = H5Local.db();
		if(!data) return;
		
		for(var i = 0; i < data.length; i++){
			if(data[i].username == user){
				data.splice(i, 1);
			}
		}
		C9377.data(H5Local.key, data);
	},
	getList : function(){
		var data = H5Local.db();
		if (data && data.length) {
			H5Local.xdata = data;
			H9377.getLoginList('.w-item', data);
		}
	}
}

var CSRegular = {
	uname : function(v){
		var rule1 = /^[a-zA-Z0-9\_]{4,20}$/.test($.trim(v));
		var rule2 = !/9377/.test($.trim(v));
		return rule1 && rule2;
	},
	pass : function(v){
		return /^.{6,}$/.test(v);
	},
	phone : function(v){
		return /^\d{11}$/.test(v);
	},
	captcha : function(v){
		return /^\d{4,6}$/.test(v);
	}
}

// 获取json数据
function getJson(data, callback, url, type, dType){
	$.ajax({
		'url': url ? url : 'index.php',
		'type': type ? type : 'GET',
		'data': data,
		'dataType': dType ? dType : 'json',
		'async': true,
		'cache': false,
		success: function(info){
			callback(info);
			return false;
		},
		error: function(e){
			alert('网络繁忙！');
		}
	})
}

function PrtSc(status, acc, psw){
	try {
		window.PrtScFun.add(status); //2017.11.23之前的端使用
		window.PrtScFun.screenShot(1, acc, psw); 
	} catch(e) {
		console.log(e);
	}
}

// 登录注册参数
var timestamp = (new Date).getTime()/1000 + 3600;
if ($_GET['lm']) {
	C9377.setcookie('lm', $_GET['lm'], timestamp);
}


function calliPhone(handlerInterface,handlerMethod,parameters){
	//handlerInterface由iOS addScriptMessageHandler与andorid addJavascriptInterface 代码注入而来。
	var dic = {'handlerInterface':handlerInterface,'function':handlerMethod,'parameters': parameters};
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
		window.webkit.messageHandlers[handlerInterface].postMessage(dic);
	}
	// else{
	// 	//安卓传输不了js json对象
	// 	window[handlerInterface][handlerMethod](JSON.stringify(dic));
	// }
}
function calliPhoneNative(handlerMethod,parameters){
	calliPhone("Native",handlerMethod,parameters);
}