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

#### 关于content在iframe中的执行
默认在iframe中content脚本不会执行。可以在manifest.json的content_scripts中进行设置，添加属性all_frames为true，可以使content在iframe中执行
```json
"content_scripts":[{
  "matches":["http://*/*", "https://*/*"],
  "js":["js/tool/_content.js", "js/communication/_content.js", "js/content.js"],
  "all_frames": true
}],
```
js动态生成的iframe不会执行content的脚本

#### 流程：选择元素
点击按钮 => popup发送开始指令到content => 顶层页面获取所有iframes

#### 关于window.frames
window.frames是一个类数组对象。但是，typeof window.frames === 'object'。
直接打印frames, 结果为window；直接打印frames[index], 结果为iframe的window(注意，与document.getElementsByTagName('iframe')不同)
遍历window.frames不能使用foreach等数组方法，可以采用for循环
在操作里面的frameWindow对象时，注意如果是非同源的iframe，可能会报跨域错误，比如给frameWindow对象添加/删除监听器时。
另外，通过document.getElementByTagName('iframe')获得的iframe，添加的监听器不会生效，原因不明。


#### 关于获取frame的src
frame为上面window.frames的成员对象
src为frame.frameElement.src
frame.location里也有路径和参数的相关信息

#### notifications.create
chrome.notifications.create 可以在chrome右下角发起提示信息
这个函数需要三个参数：id， options， callback
参考链接： 
https://developer.chrome.com/docs/extensions/reference/notifications/
https://developer.chrome.com/docs/extensions/mv2/richNotifications/
```js
// id: notification id。可选。
// options：文档里面说里面的properties都是可选的，但实测发现type, iconUrl, title, message这四个字段是必填项，就算没用上，也必须要有这个字段（可以为空字符串），否则会报错。
// callback：回调，会传入id。可选。
chrome.notifications.create(id, {
  iconUrl: '../assets/img/logo.png',
  type: 'list', // 模板类型，list/basic/image/progress
  title: '解析结果', // 大标题 
  message: 'message', // 主要消息。type为list时不显示
  contextMessage: 'contextMessage', // 左上角小标题，不传时默认为扩展名称
  buttons: [{title: '复制'}, {title: '复制全部'}], // 按钮，最多两个
  items
},(id) => {
  console.log(id);
})
```

#### notification id
chrome.notifacations.clear/update都需要使用到id
多次create时使用相同的id不会报错

#### notification 失效
在某些时候，任何notification都失效，也没有任何报错信息，这可能是浏览器设置导致的。
在 `chrome://flags/` 搜索 `notifications`, 找到 `Enable system notifications`选项，改为 `disabled`，实测有效果。
参考资料：https://juejin.cn/post/6992889349213782030