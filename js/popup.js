import { sendMsg } from './communication/_popup.js';

let selectBtn = null
let isSelecting = false

function onSelect(){
  const res = sendMsg.toContent(isSelecting ? 'stop' : 'start')
  console.log(res);
  window.close()
}

function queryIsSelecting(){
  return sendMsg.toContent('isSelecting').then((res) => {
    // console.log(111, res);
    isSelecting = res.data
    return 'query over'
  })
}



async function init(){
  selectBtn = document.querySelector('#selector')
  selectBtn.addEventListener('click', onSelect)

  await queryIsSelecting()
  if(isSelecting){
    selectBtn.textContent = 'stop'
  }else{
    selectBtn.textContent = 'select'
  }
}
window.onload = function () { init(); };