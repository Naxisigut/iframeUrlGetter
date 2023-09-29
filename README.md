# iframeUrlGetter
a chrome extension to get the root iframe's url by select an element

## manifest.json
1. version => 2

## communication
background, contentScripts, popup 三者之间通信机制的建立
1. background => contentScripts  ✅
2. contentScripts => background  ✅
3. background => popup  ✅
4. popup => background  ✅
5. contentScripts => popup  ✅
6. popup => contentScripts  ✅
