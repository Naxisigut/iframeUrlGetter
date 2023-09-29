import { sendMsg, sendMsg2Content } from './communication/_popup.js';

function onClick(){
  sendMsg('popup test').then((res)=>{
    console.log(res);
  })
}

const init= () => {
  const btn = document.querySelector('#selector')
  btn.addEventListener('click', onClick)
}




window.onload = function () { init(); };