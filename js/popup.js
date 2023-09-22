const Tabs = chrome.tabs


function onClick(){
  chrome.runtime.sendMessage()
  // queryTab().then((tab) => {
  //   const command = {
  //     cmd: 'start'
  //   }
  //   console.log(tab);
    // Tabs.sendMessage(tab.id, command, function (response) {
    //   if (typeof (response) == 'undefined') {
    //     throw new Error('error')
    //   } else {
    //     console.log(response);
    //   }
    // });
  // }).catch((err) => {
  //   console.log(err);
  // })
}

const init= () => {
  const btn = document.querySelector('#selector')
  btn.addEventListener('click', onClick)
}

const queryTab = () => {
  return new Promise((resolve, reject) => {
    Tabs.query({ 
      active: true, 
      currentWindow: true 
    }, (tab)=>{
      queryedTab = tab[0]
      resolve(tab[0])
    })
  })
}


window.onload = function () { init(); };