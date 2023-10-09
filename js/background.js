const bgCmdHandler = {
  exec(message, sendBack){
    const { action, args } = message
    switch (action) {
      case 'location':
        // notify
        locationNotifyHandler.locationNotify(args)
        break;
    
      default:
        break;
    }
  },
  sendBack(sendBack){

  }
}

Notifications.onButtonClicked.addListener((notificationId, btnIndex) => {
  // console.log('btn clicked', notificationId, btnIndex);
  if(notificationId === 'locationNotify'){
    switch (btnIndex) {
      case 0: // 复制hash
        const hashItems = locationNotifyHandler.findItems('hash')
        if(hashItems){
          copyText(hashItems.message)
        }
        break;
      case 1: // 复制全部
        const hrefItems = locationNotifyHandler.findItems('href')
        if(hrefItems){
          copyText(hrefItems.message)
        }
        break;
    
      default:
        break;
    }
  }
})

const locationNotifyHandler = {
  locationInfo: [], // 当前iframe信息
  // 发送chrome提示：location
  locationNotify(items){
    const id = 'locationNotify'
    this.locationInfo = items
    Notifications.create(id, {
      iconUrl: '../assets/img/logo.png',
      type: 'list',
      title: '解析结果',
      message: '',
      buttons: [{title: '复制hash'}, {title: '复制全部'}],
      items
    },(id) => {
      console.log(id);
    })
    return id
  },

  findItems(key){
    if(key === 'hash')return this.locationInfo.find((i) => i.title === 'hash')
    if(key === 'href')return this.locationInfo.find((i) => i.title === 'href')
    
  }
}