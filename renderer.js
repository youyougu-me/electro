

// const electro = require("electron")
const fs = require('fs');
const {dialog}  = require('electron').remote
const {ipcRender} = require("electron")

// 一个div对象
// 文件拖拽事件
const dragWapper = document.getElementById("drag_test")
dragWapper.addEventListener("drop",e=>{
    //阻止默认行为
    e.preventDefault()
    const files = e.dataTransfer.files
    if(files && files.length > 0){
        const path = files[0].path
        // console.log('path:',path)
        const content = fs.readFileSync(path)
        console.log(content.toString());
    }
})

dragWapper.addEventListener("dragover",e=>{
    e.preventDefault()
})

// 打开文件选择框
const button = document.getElementById("button")
button.addEventListener("click",()=>{
    dialog.showOpenDialog({
        title: "请选择您喜欢的文件",
        buttonLabel: "走你",
        filters: [
            { name: 'Custom File Type', extensions: ['js', 'html', 'json'] },
          ]
    }).then(result => {
        console.log(result.filePaths)
      }).catch(err => {
        console.log(err)
      })
})

// 保存文件
const saveButton = document.querySelector("#saveButton")
saveButton.addEventListener("click",()=>{
    dialog.showSaveDialog({
        title: "保存文件",
        buttonLabel: "保存",
        filters: [
            { name: 'Custom File Type', extensions: ['js', 'html', 'json'] },
          ]
    }).then(result => {
        fs.writeFileSync(result,"试试保存文件")
      }).catch(err => {
        console.log(err)
      })
})

// 发送信息给子进程
sendMessage(){

}





