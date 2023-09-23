const Runtime = chrome.runtime
const Tabs = chrome.tabs
var msg2Popup = ['test']

Runtime.onMessage.addListener((request, senderInfo, sendBack) => {
  // request: the message listened
  // senderInfo: the message sender info
  // sendBack: send back function
  console.log('request', request);
  console.log('senderInfo', senderInfo);
  console.log('sendBack', sendBack);
  sendBack('back msg' + request)
})

// 获取当前tab
function queryTab(){
  return new Promise((resolve, reject) => {
    Tabs.query({ 
      active: true, 
      currentWindow: true 
    }, (tabs)=>{
      // console.log('shared', tabs);
      resolve(tabs[0])
    })
  })
}

// 发送消息至tab / content
function sendMsg2Tab(tabId, msg){
  return new Promise((resolve, reject) => {
    Tabs.sendMessage(tabId, msg, (res) => {
      resolve(res)
    })
  })
}