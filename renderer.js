const { ipcRenderer } = require('electron');

ipcRenderer.on("create-list", () => {
    document.querySelector(".createList").click()
})