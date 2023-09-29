const Runtime = chrome.runtime
const Tabs = chrome.tabs
var msgBg2Popup = ['test']


// 获取当前tab
function queryTab(){
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
