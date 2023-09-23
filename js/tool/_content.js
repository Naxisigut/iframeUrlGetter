const Runtime = chrome.runtime

function sendMsg2Bg(msg){
  return new Promise((resolve, reject) => {
    Runtime.sendMessage(msg, (res) => {
      resolve(res)
    })
  })
}