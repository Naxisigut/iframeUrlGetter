const MsgEnum = {
  // type
  SEND: 1,
  SENDBACK: 2,

  // from & to
  CONTENT: 3,
  BACKGROUND: 4,
  POPUP: 5,
}

// 只对顶层页面通信
if(window == top){
  Runtime.onMessage.addListener((message, senderInfo, sendBack) => {
    // message: the message listened
    // senderInfo: the message sender info
    // sendBack: send back function
    
    console.log("                                                  ");
    console.log("------------ content onMesssage begin ------------");
  
    console.log('message', message);
    console.log('sendBack', sendBack);
    sendBack({
      type: MsgEnum.SENDBACK,
      data_get: message
    })
  
    console.log("------------ content onMesssage over ------------");
  })
}

// 发送消息
function send(from, to, action, args){
  return new Promise((resolve, reject) => {
    Runtime.sendMessage({
      type: MsgEnum.SEND,
      from,
      to,
      action,
      args,
    }, (res) => {
      resolve(res)
    })
  })
}
function sendFactory(from, to){
  return function(action, args){
    return send(from, to, action, args)
  }
}

const sendMsg = {
  toBackground: sendFactory(MsgEnum.CONTENT, MsgEnum.BACKGROUND),
  toPopup: sendFactory(MsgEnum.CONTENT, MsgEnum.POPUP),
}