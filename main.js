if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('sw.js',{scope:'./'})
    .then(()=>{
      console.log("Navigator working")
    })
    .catch(err=>{
      console.log("Navigator Error",err)
    })
  })
}
