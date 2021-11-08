const { ipcRenderer } = require('electron');

const ipc = ipcRenderer;

// const closeWindow = document.getElementById('close-window');
//  closeWindow.addEventListener('click', ()=> {
//     ipc.send('closeApp')
// });


// const minimizeBtn = document.getElementById('minimize-app');

// minimizeBtn.addEventListener('click', ()=> {
//     ipc.send('minimizeApp')
// });

const isLoading = document.getElementById('loader');
const goToGoogleDrive = document.getElementById('goToGoogleDrive');

goToGoogleDrive.addEventListener('click', ()=> {
    isLoading.style.display = "unset";
    ipc.send('navToGoogleDive');
    setTimeout(()=> {
        isLoading.style.display = "none"
      }, 3000)
});


