Runtime.onMessage.addListener((message, senderInfo, sendBack) => {
  // message: the message listened
  // senderInfo: the message sender info
  // sendBack: send back function
  
  console.log("                                                  ");
  console.log("------------ content onMesssage begin ------------");

  console.log('message', message);
  console.log('senderInfo', senderInfo);
  console.log('sendBack', sendBack);
  sendBack({
    type: 'content back',
    data_get: message
  })

  console.log("------------ content onMesssage over ------------");
  console.log("                                                  ");
})

// 发送消息
function sendMsg(msg){
  return new Promise((resolve, reject) => {
    Runtime.sendMessage(msg, (res) => {
      resolve(res)
    })
  })
}