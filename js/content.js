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


// console.log(111, frames);
// console.log(222, document.getElementsByTagName('iframe'));

const cmdHandler = {
  exec(message, sendBack){
    const { action, args } = message
    switch (action) {
      case 'start':
        selectHandler.start()
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
  onClick(e){
    console.log(e.target);
  },
  onClickWrapper(e, frame){
    this.onClick()
  },
  onClickMap: new Map(),
  onClickFactory(frame){
    
    const func = function(e){
      console.log(e);
    }
    return func
  },
  start(){
    const iframes = window.frames
    // console.log(12122, window);
    // iframes.foreach(frame => {
    //   // const document = frame.document
    //   // if(!document)return
    //   frame.addEventListener('click', this.onClick)
    // });
    for (let index = 0; index < iframes.length; index++) {
      const frameWindow = iframes[index];
      const isExist = this.onClickMap.has(frameWindow)
      if(!isExist){
        this.onClickMap.set(frame, func)
      }
      frameWindow.addEventListener('click', this.onClick)
    }
    window.addEventListener('click', this.onClick)
  },
  stop(){
    window.removeEventListener('click', this.onClick)
  },
}


// sendMsg2Bg('from content')
//   .then((res) => {
//     console.log(res); 
//   })