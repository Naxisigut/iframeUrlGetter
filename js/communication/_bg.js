const MsgEnum = {
  // type
  SEND: 1,
  SENDBACK: 2,

  // from & to
  CONTENT: 3,
  BACKGROUND: 4,
  POPUP: 5,
}

// background 收信
Runtime.onMessage.addListener((message, senderInfo, sendBack) => {
  // message: the message listened
  // senderInfo: the message sender info
  // sendBack: send back function
  console.log("                                                     ");
  console.log("------------ background onMesssage begin ------------");

  console.log('message', message);
  bgCmdHandler.exec(message, sendBack)
  sendBack({
    type: MsgEnum.SENDBACK,
    from: MsgEnum.BACKGROUND
  })

  console.log("------------ background onMesssage over------------");
})

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
  // toBackground: sendFactory(MsgEnum.CONTENT, MsgEnum.BACKGROUND),
  toPopup: sendFactory(MsgEnum.BACKGROUND, MsgEnum.POPUP),
  toContent(action, args){
    return queryTab()
      .then((tab)=>{
        return new Promise((resolve, reject) => {
          Tabs.sendMessage(tab.id, {
            type: MsgEnum.SEND,
            from: MsgEnum.BACKGROUND,
            to: MsgEnum.CONTENT,
            action, 
            args,
          }, (res) => {
            resolve(res)
          })
        })
      })
      // .catch(err =>{
      //   console.log(err);  
      // })
  }
}

