const $ = obj => document.querySelector(obj)

// 图片
let imgArr = [],
// 图片大小
    sizeArr = [],
// 图片名称
    titleArr = []

const inputs = document.querySelectorAll('input')

inputs.forEach((item,index) => {
    item.onchange = function(){
        if(this.value){
            let files = this.files
            saveImg(files)
        }
    }
})

$('#dragBox').ondragover = function(e){
    this.innerText = '请释放鼠标'
    preventDefault(e)
}
$('#dragBox').ondragleave = function(e){
    this.innerText = '请将图片拖到此区域'
}
$('#dragBox').ondrop = function(e){
    this.innerText = '请将图片拖到此区域'
    let files = e.dataTransfer.files
    saveImg(files)
    preventDefault(e)
}
$('#uploadBtn').addEventListener('click',function(){
    if(imgArr.length){
        uploadImg()
    }else{
        alert('请先选择图片！')
    }
})

// 缓存图片信息
function saveImg(files){
    let length = files.length
    if(length){
        for(let i = 0; i<length; i++){
            let file = files.item(i)
            if(/image/.test(file.type)){
                imgArr.push(file)
                sizeArr.push(file.size)
                titleArr.push(file.name)
                showImg(file)
            }
        }
    }
}

// 展示图片
function showImg(file){
    let blob = new Blob([file]),
        url = window.URL.createObjectURL(blob),
        li = document.createElement('li')
        li.innerHTML = `<img src=${url} style="width:100%;height:100%;" /><p>${file.name}<i class="del"></i></p>`
    $('#imgBox').appendChild(li)
    computeImg()
}

// 计算图片数据
function computeImg(){
    let picLen = $('#picLen'),picSize = $('#picSize')
    if(imgArr.length){
        picLen.innerText = imgArr.length
        picSize.innerText = (sizeArr.reduce((pre,curr) => pre += curr)/1024/1024).toFixed(2)
    }else{
        picLen.innerText = 0
        picSize.innerText = 0
    }
    del()
}

// 删除图片
function del(){
    let lis = $('#imgBox').querySelectorAll('li')
    lis.forEach((item,index) => {
        item.children[1].children[0].addEventListener('click',function(){
            $('#imgBox').removeChild(item)
            imgArr.splice(index,1)
            sizeArr.splice(index,1)
            computeImg()
        })
    })
}

// 上传图片
function uploadImg(){
    imgArr.forEach((item,index) => {
        const xhr = new XMLHttpRequest()
        xhr.open('post','./upload.php',true)
        let data = new FormData()
        data.append('file',item)
        xhr.onreadystatechange = function(){
            if(xhr.status === 200){
                alert('上传成功！')
                imgArr = []
                sizeArr = []
                $('#imgBox').innerHTML = ''
                computeImg()
            }
        }
        xhr.send()
    })
}

// 阻止默认样式
function preventDefault(e){
    e.preventDefault()
    e.stopPropagation()
}
