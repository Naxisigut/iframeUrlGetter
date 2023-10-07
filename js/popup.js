import { sendMsg } from './communication/_popup.js';

// popup => content start: 开始选择元素
function onClick(){
  sendMsg.toContent('start').then((res)=>{
    window.close()
  })
}

const init= () => {
  const btn = document.querySelector('#selector')
  btn.addEventListener('click', onClick)
}




window.onload = function () { init(); };