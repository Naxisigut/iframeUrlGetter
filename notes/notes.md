## 小记

#### 关于manifest
manifest里面定义了background和content的js，数组里的js文件会被依次执行，并且是放在同一个作用域下面
也就是说前一个文件定义的全局变量和方法可以给下一个js文件使用

#### 关于background接收消息
使用chrome.runtime.onMessage.addListener接收
content => bg: chrome.runtime.sendMessage
popup => bg: chrome.runtime.sendMessage

#### 关于content接收消息
使用chrome.runtime.onMessage.addListener接收
bg => content: chrome.tabs.sendMessage 注意要先获取当前content的id
popup => content: chrome.tabs.sendMessage 注意要先获取当前content的id

#### 关于popup接收消息
使用chrome.runtime.onMessage.addListener接收
bg => popup: chrome.tabs.sendMessage
content => popup: chrome.tabs.sendMessage



bg => popup: popup可以通过chrome.extension.getBackgroundPage()获取background里所有的可访问数据



#### 关于chrome.tabs.query
在使用chrome.tabs.query()获取当前tab时，这个tab需要在聚焦状态。如果刚刚刷新，需要点击页面里的任意元素一下。
如果当前页面没有聚焦，那么会返回一个空数组。


#### 信道
bg => content
content => bg
bg => popup
popup => bg
content => popup
popup => content