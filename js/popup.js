const Tabs = chrome.tabs


const init= () => {
  const btn = document.querySelector('#selector')
  btn.addEventListener('click', () => {
    const command = {
      cmd: 'start'
    }
    queryTab().then((tab) => {
      console.log(tab);
      Tabs.sendMessage(tab.id, command, function (response) {
				if (typeof (response) == 'undefined') {
					throw new Error('error')
				} else {
					console.log(response);
				}
			});
    }).catch((err) => {
      console.log(err);
    })
  })
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