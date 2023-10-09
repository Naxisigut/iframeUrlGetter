if(isTop){
  const btn = document.createElement('button')
  const text = document.createTextNode('test')
  btn.appendChild(text)
  document.body.prepend(btn)
  btn.addEventListener('click', ()=>{
    sendMsg.toBackground('content test').then((res)=>{
      console.log(res);
    })
  })
}

const cmdHandler = {
  exec(message, sendBack){
    const { action, args } = message
    switch (action) {
      case 'start':
        selectHandler.start()
        break;
      case 'stop':
        selectHandler.stop()
        break;
    
      default:
        break;
    }
  },
  sendBack(sendBack){

  }
}

const selectHandler = {
	blockEvent(e) {
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
	},
  onClickMap: new Map(),
  onClickFactory(frame){
    const func = function(e){
      // 获取iframe路径 => stop
      // const src = frame.frameElement.src
      const frameLocation = frame.location
      let locationItems = [
        { title: 'href', message: frameLocation.href },
        { title: 'pathname', message: frameLocation.pathname },
        { title: 'search', message: frameLocation.search },
        { title: 'hash', message: frameLocation.hash },
      ]
      locationItems = locationItems.filter((i) => i.message)
      sendMsg.toBackground('location', locationItems)
      selectHandler.stop()
    }
    return func
  },
  start(){
    this.listen(window)
    const iframes = window.frames
    for (let index = 0; index < iframes.length; index++) {
      const frameWindow = iframes[index];
      this.listen(frameWindow)
    }
  },
  stop(){
    this.onClickMap.forEach((value, key, map) => {
      try {
        key.removeEventListener('click', value)
      } catch (error) {
        console.log(error);        
      }
    })
  },
  listen(currWindow){
    // debugger
    const isExist = this.onClickMap.has(currWindow)
    let onClickFunc = null
    if(isExist){
      onClickFunc = this.onClickMap.get(currWindow)
    }else{
      onClickFunc = this.onClickFactory(currWindow)
      this.onClickMap.set(currWindow, onClickFunc)
    }

    try {
      currWindow.addEventListener('click', onClickFunc)
      console.log('listen');
    } catch (error) {
      console.log('listen error');
      this.onClickMap.delete(currWindow, onClickFunc)
    }
  }
}