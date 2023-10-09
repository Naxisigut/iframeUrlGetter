import { sendMsg } from './communication/_popup.js';

// popup => content start: 开始选择元素
function onStart(){
  sendMsg.toContent('start').then((res)=>{
    window.close()
  })
}

function onStop(){
  sendMsg.toContent('stop').then((res)=>{
    chrome.notifications.create('NOTFICATION_ID', {
      iconUrl: '../assets/img/logo.png',
      type: 'list',
      title: 'title',
      message: 'message',
      contextMessage: 'contextMessage',
      buttons: [{title: '确认'}, {title: '取消'}],
      items: [{title: 'item title', message: 'item msg'}, {title: 'item title', message: 'item msg'}]
    },
    (id) => {
      console.log(id);
    }
    )
  })
}

const init= () => {
  const btn = document.querySelector('#selector')
  btn.addEventListener('click', onStart)

  const stopBtn = document.querySelector('#stop')
  stopBtn.addEventListener('click', onStop)
}




window.onload = function () { init(); };