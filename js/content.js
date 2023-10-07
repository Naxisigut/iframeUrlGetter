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
  onClick(){
    console.log('select');
  },
  start(){
    const iframes = window
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