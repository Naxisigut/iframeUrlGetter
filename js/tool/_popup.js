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
      if(tabs.length){
        resolve(tabs[0])
      }else{
        reject(new Error('current page not found'))
      }
    })
  })
}

// 获取background的消息
export function getBgMsg(){
  const bgMsg = Extension.getBackgroundPage().msgBg2Popup
  return bgMsg
}
