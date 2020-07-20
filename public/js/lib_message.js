//
function message_func1(){
  alert("# message_func1");
}
/**********************************************
 *
 *********************************************/    
function valid_notification(){
	if (!('Notification' in window)) {//対応してない場合
		alert('未対応のブラウザです');
	}
	else {
		// 許可を求める
		Notification.requestPermission()
		.then((permission) => {
			if (permission === 'granted') {// 許可
			}
			else if (permission == 'denied') {// 拒否
				$("#message_index_flash_wrap").css('display','inherit');
				$("#message_index_flash").text("ブラウザ通知を許可に設定すると。自動更新の通知を受信できます。");
			}
			else if (permission == 'default') {// 無視
			}
//			console.log(permission);
		});
	}  
}
/**********************************************
 * Notification 通知
 *********************************************/    
function display_notification(title, body ){
	if (!('Notification' in window)) {//対応してない場合
		alert('未対応のブラウザです');
	}
	else {
		// 許可を求める
		Notification.requestPermission()
		.then((permission) => {
			if (permission === 'granted') {// 許可
				var options ={
					body: body,
					icon: 'https://code-kuc.netlify.app/pwa//images/icon_code.png',					                    
					tag: ''
				};
				var n = new Notification(title,options);
				console.log(n);
				setTimeout(n.close.bind(n), 5000);
			}
			else if (permission == 'denied') {// 拒否
			}
			else if (permission == 'default') {// 無視
			}
		});
	}  
}  

