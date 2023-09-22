setInterval(() => {
  console.log('hi');
}, 1000)

console.log(chrome);

chrome.runtime.onMessage.addListener((request, sender, sendRes) => {
  console.log('request', request);
  console.log('sender', sender);
  console.log('sendRes', sendRes);
})