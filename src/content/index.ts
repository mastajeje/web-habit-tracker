const startTime = Date.now();

window.addEventListener('beforeunload', ()=> {
    console.log('Time spent on this page: ', Date.now() - startTime);
})