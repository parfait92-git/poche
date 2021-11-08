const electron = require('electron');
const  ipc = require('ipc');

const remote = electron.remote;
  document.getElementById("minimize").addEventListener("click", function (e) {
    var window = remote.geCurrentWindow();
    window.minimize();
});

document.getElementById("close-window").addEventListener("click", function (e) {
    var window = remote.geCurrentWindow();
    window.close();
})