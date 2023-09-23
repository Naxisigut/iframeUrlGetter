const Tabs = chrome.tabs
const Runtime = chrome.runtime
const Extension = chrome.extension
// export const bgMsg = Runtime.getBackgroundPage().msg2Popup

// 获取当前tab
export function queryTab(){
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

// 发送消息至background
export function sendMsg2Bg(msg){
  return new Promise((resolve, reject) => {
    Runtime.sendMessage(msg, (res) => {
      resolve(res)
    })
  })
}

// 发送消息至tab / content
export function sendMsg2Tab(tabId, msg){
  return new Promise((resolve, reject) => {
    Tabs.sendMessage(tabId, msg, (res) => {
      resolve(res)
    })
  })
}

// 获取background的消息
export function getBgMsg(){
  const bgMsg = Extension.getBackgroundPage().msg2Popup
  return bgMsg
}