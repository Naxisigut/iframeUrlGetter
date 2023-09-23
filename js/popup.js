import { sendMsg2Tab, sendMsg2Bg, queryTab, getBgMsg} from './tool/_popup.js';

function onClick(){
  // sendMsg('msg').then(test)

  // queryTab()
  //   .then((tab) => {
  //     return sendMsg2Tab(tab.id, '111111')
  //   })
  //   .then((tabRes) => {
  //     console.log(tabRes);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  console.log('bgMsg', getBgMsg());

}

const init= () => {
  const btn = document.querySelector('#selector')
  btn.addEventListener('click', onClick)
}




window.onload = function () { init(); };