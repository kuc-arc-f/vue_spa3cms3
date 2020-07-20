/**********************************************
 * Notification 通知
 *********************************************/    
function recv_pushMessage(title, body){
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

/**********************************************
 * Send POST
 *********************************************/    
function fcm_send(send_title, send_body, IID_TOKEN, FCM_SERVER_KEY){
// console.log("IID_TOKEN=" + IID_TOKEN);
    if(IID_TOKEN == null ){ return; }
    if(IID_TOKEN.length < 1){ return; }
    var key = FCM_SERVER_KEY;
    var to = IID_TOKEN;
    var notification = {
        'title': send_title,
        'body': send_body,
        'icon': 'firebase-logo.png',
        'click_action': 'http://localhost'
    };
    fetch('https://fcm.googleapis.com/fcm/send', {
    'method': 'POST',
    'headers': {
        'Authorization': 'key=' + key,
        'Content-Type': 'application/json'
    },
    'body': JSON.stringify({
        'notification': notification,
        'to': to,
        })
    }).then(function(response) {
// console.log(response);
    }).catch(function(error) {
        console.error(error);
    })
};

/**********************************************
 *
 *********************************************/
function fcm_send_proc(){
    fcm_send(elem_title.value, elem_body.value, IID_TOKEN, FCM_SERVER_KEY);
}
/**********************************************
 *
 *********************************************/    
function fcm_send_member(CHAT_MEMBERS, CHAT_ID, body, FCM_SERVER_KEY){
    CHAT_MEMBERS.forEach(function(item){
        var send_title = CHAT_ID + "," + item.user_id;
//console.log(send_title )
//console.log(item.token )
//console.log(body )
//console.log(FCM_SERVER_KEY )
        window.fcm_send(send_title, body, item.token, FCM_SERVER_KEY);
    });
}
/**********************************************
 *
 *********************************************/    
function get_receiveUserId( title ){
    console.log("#get_receiveUserId: " + title);
}
/**********************************************
 *
 *********************************************/
function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
        console.log('Sending token to server...');
        // TODO(developer): Send the current token to your server.
        setTokenSentToServer(true);
    } else {
        console.log('Token already sent to server so won\'t send it again ' +
        'unless it changes');
    }
}
/**********************************************
 *
 *********************************************/
function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') === '1';
}
/**********************************************
 *
 *********************************************/
function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? '1' : '0');
}
/**********************************************
 *
 *********************************************/
function fcm_init_proc(messagingSenderId , PublicVapidKey){
    firebase.initializeApp({
        'messagingSenderId': messagingSenderId
    });
    messaging = firebase.messaging();
    messaging.usePublicVapidKey(PublicVapidKey);
    return messaging;
}
/**********************************************
 *
 *********************************************/
function fcm_get_token(messaging,  CHAT_MEMBER_ID ,post_url){
    var textInstanceIdToken = document.getElementById('textInstanceIdToken');
    this.messaging.getToken().then((currentToken) => {
        if (currentToken) {
            window.sendTokenToServer(currentToken);
            var IID_TOKEN = currentToken;
            textInstanceIdToken.value = IID_TOKEN;
            window.send_token(IID_TOKEN, CHAT_MEMBER_ID ,post_url);
            console.log(currentToken);
            console.log(CHAT_MEMBER_ID);
        } else {
            alert("ブラウザ通知を許可に設定下さい。メッセージを送受信できません");
            console.log('No Instance ID token available. Request permission to generate one.');
            //updateUIForPushPermissionRequired();
            window.setTokenSentToServer(false);
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token.', err);
        window.setTokenSentToServer(false);
    });
}
/**********************************************
 *
 *********************************************/
function fcm_onMessage(messaging,  CHAT_MEMBER_ID ){
    messaging.onMessage((payload) => {
// console.log('Message received. ', payload);
        var notify = payload.notification;
        window.recv_pushMessage("", notify.body);
        window.set_time_text();
    });
}
/**********************************************
 *
 *********************************************/
function send_token(token, CHAT_MEMBER_ID, post_url ){
    var data = {
        'chat_member_id': CHAT_MEMBER_ID,
        'token': token,
    };
    axios.post(post_url , data ).then(res => {
        console.log(res.data );
    });
}
/**********************************************
 *
 *********************************************/
function set_time_text(){
    var date = new Date();
    var iso_date = date.toISOString();
    $("input#chat_time_text").val( iso_date );
}
/**********************************************
 *
 *********************************************/
function chat_modal_open(){
    $('#modal1').modal('show');
}
