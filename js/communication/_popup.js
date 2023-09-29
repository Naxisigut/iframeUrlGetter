import { queryTab } from '../tool/_popup.js';

const Runtime = chrome.runtime

Runtime.onMessage.addListener((message, senderInfo, sendBack)=>{
  // message: the message listened
  // senderInfo: the message sender info
  // sendBack: send back function
  console.log("                                                ");
  console.log("------------ popup onMesssage begin ------------");

  console.log('message', message);
  console.log('senderInfo', senderInfo);
  console.log('sendBack', sendBack);
  sendBack('back msg' + message)

  console.log("------------ popup onMesssage over------------");
  console.log("                                              ");

})


// 发送消息至tab / content
export function sendMsg2Content(msg){
  return queryTab()
    .then((tab)=>{
      return new Promise((resolve, reject) => {
        Tabs.sendMessage(tab.id, msg, (res) => {
          resolve(res)
        })
      })
    })
    // .catch(err =>{
    //   console.log(err);  
    // })
}

// 发送消息
export function sendMsg(msg){
  return new Promise((resolve, reject) => {
    Runtime.sendMessage(msg, (res) => {
      resolve(res)
    })
  })
}