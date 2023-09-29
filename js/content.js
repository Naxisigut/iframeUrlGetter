const btn = document.createElement('button')
const text = document.createTextNode('test')
btn.appendChild(text)
document.body.prepend(btn)
btn.addEventListener('click', ()=>{
  sendMsg('content test').then((res)=>{
    console.log("get send back");
    console.log(res);
  })
})


// sendMsg2Bg('from content')
//   .then((res) => {
//     console.log(res); 
//   })