const Runtime = chrome.runtime
const Tabs = chrome.tabs
const Notifications = chrome.notifications
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



// 复制指定文本到剪切板
function copyText(str){
  const ipt = document.createElement('input')
  ipt.value = str
  document.body.appendChild(ipt)
  ipt.select()
  const copyRes = document.execCommand('copy')
  document.body.removeChild(ipt)
  return copyRes
}
