// import { sendMsg2Bg } from './tool/_content.js';



setInterval(() => {
  console.log('content');
}, 3000);

chrome.runtime.onMessage.addListener((request, senderInfo, sendBack) => {
  // request: the message listened
  // senderInfo: the message sender info
  // sendBack: send back function
  console.log('request', request);
  console.log('senderInfo', senderInfo);
  console.log('sendBack', sendBack);
  sendBack({
    type: 'content back',
    data_get: request
  })
})

// sendMsg2Bg('from content')
//   .then((res) => {
//     console.log(res); 
//   })