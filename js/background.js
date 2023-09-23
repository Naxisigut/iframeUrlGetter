// setInterval(() => {
//   console.log('background');
// }, 3000)

// console.log(chrome);

// chrome.runtime.onMessage.addListener((request, senderInfo, sendBack) => {
//   // request: the message listened
//   // senderInfo: the message sender info
//   // sendBack: send back function
//   console.log('request', request);
//   console.log('senderInfo', senderInfo);
//   console.log('sendBack', sendBack);
//   sendBack({
//     type: 'background back',
//     data_get: request
//   })
// })


setTimeout(() => {
  console.log('send begin');
  queryTab()
    .then((tab) => {
      return sendMsg2Tab(tab.id, 'from bg to content')
    }).then((res) => {
      console.log(res);
    })
}, 5000)
