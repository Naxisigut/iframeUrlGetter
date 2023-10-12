# iframeUrlGetter
a chrome extension to get the root iframe's url by select an element

## v0.1
### manifest.json
1. version => 2

### communication
background, contentScripts, popup 三者之间通信机制的建立
1. background => contentScripts  ✅
2. contentScripts => background  ✅
3. background => popup  ✅
4. popup => background  ✅
5. contentScripts => popup  ✅
6. popup => contentScripts  ✅

### communication message structure
借助runtime.onMessage和sendMessage建立起来的通信机制，对其中流通的信息进行结构上的设计 ✅

### feature: select 
流程如下：
1. 点击popup的select按键 ✅ 
2. => 点击页面上的任意位置 ✅ 
3. => 获取该位置所属的iframe location信息 ✅ 
4. => 以notifications的形式展示获取到的信息 ✅
5. => 点击notifications的按键，复制需要的信息至剪切板 ✅
5. => 更新notification，显示复制是否成功 ✅

