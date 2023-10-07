# 关于content, background, popup三者的通信
这里只讨论短连接，不讨论connectAPI长连接。
网上对这三者的通信的总结很表面。其实三者之间都是可以通过chrome.runtime这个API进行通信，没有必要分开进行讨论。

## 接收信息：chrome.runtime.onMessage.addListener
在三者的代码里，均需要添加如下代码, 没有区别：
```js
chrome.runtime.onMessage.addListener((message, senderInfo, sendBack)=>{
  // message: 接收到的信息
  // senderInfo: 发送者信息
  // sendBack: 回复函数，所获的参数将会传回给发送函数所给的回调
  // 涉及到异步回复时，本函数return true，然后异步执行sendBack即可
})
```

## 发送消息：chrome.runtime.sendMessage
这个函数所发送的消息，将会被background和popup(若发送时处于打开状态)里的监听器接收到，发送者的监听器除外。
比如说，content里面调用此函数所发出的消息，会被background和popup里的监听器接收到，但不会被content里的监听器接收到。
至于content里的监听器，不会收到此函数发出的消息，稍后讨论。
```js
// msg: 要发送的消息
chrome.runtime.sendMessage(msg, (res) => {
  // 回复回调
  // res: 接收消息者回复的消息
})
```

## 发送消息至content
由于在每个tab页都有一个独立的content，所以想要消息被content内的监听器接收到，需要先获取tabId，然后使用chrome.tabs.sendMessage()函数来发送给特定tab内的content。
```js
let tabId = null
chrome.tabs.query({ 
  active: true, 
  currentWindow: true 
}, (tabs)=>{
  if(tabs.length){
    tabId = tabs[0].id
  }
})

chrome.tabs.sendMessage(tabId, msg, (res)=>{
  // 回复回调
  // res: 接收消息者回复的消息
})
```

## 信道冲突
按照以上内容，有一种情况需要注意，那就是消息发出后，被多个listener接收到。每个listener都会返回一个回复消息，但是注意，这里会产生冲突，所回复的消息只有一个会被接收到并执行回复回调。
比如说在content内发出消息，同时被background和popup接收到，那么它们两个返回的消息只有一个会触发content内的回复回调。实测结果是popup的被接收到。
另外，需要对发送消息的数据格式进行规范，清楚指明这条消息所发往的对象，而不是直接发送一个裸数据。


## 消息数据结构
```js
// send
{
  // type: send 

  // from: content/backgroud/popup 发送者
  // to: content/backgroud/popup 接收者

  // action: 决定接收到消息后如何进行处理

  // args: 处理时用到的参数
}


// sendback
{
  // type: sendBack

  // from: content/backgroud/popup 发送者
  // to: 暂时不启用

  // success: true/false 表示消息是否成功接收
  // data: 返还数据, 无数据时为null
}
```
