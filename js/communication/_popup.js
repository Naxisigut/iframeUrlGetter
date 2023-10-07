import { queryTab } from '../tool/_popup.js';
import { MsgEnum } from './enum.js';

const Runtime = chrome.runtime
const Tabs = chrome.tabs

Runtime.onMessage.addListener((message, senderInfo, sendBack)=>{
  // message: the message listened
  // senderInfo: the message sender info
  // sendBack: send back function
  console.log("                                                ");
  console.log("------------ popup onMesssage begin ------------");

  console.log('message', message);
  sendBack({
    type: MsgEnum.SENDBACK,
    from: MsgEnum.POPUP,
  })

  console.log("------------ popup onMesssage over------------");
  console.log("                                              ");

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

export const sendMsg = {
  // toBackground: sendFactory(MsgEnum.CONTENT, MsgEnum.BACKGROUND),
  toBackGround: sendFactory(MsgEnum.POPUP, MsgEnum.BACKGROUND),
  toContent(action, args){
    return queryTab()
      .then((tab)=>{
        return new Promise((resolve, reject) => {
          Tabs.sendMessage(tab.id, {
            type: MsgEnum.SEND,
            from: MsgEnum.POPUP,
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