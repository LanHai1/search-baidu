/**
 * 获取id
 * @param {string} id 
 */
function $(id) {
    return document.getElementById(id)
}

// 联想数据
var keywords = ["林利群", "林利群为什么很黑", "林利群的经纪人是周林林吗", "林利群是谁", "广东人", "广东人爱吃", "广东人爱吃福建人", "林丹的生平", "JavaScript",
    "Java", "王思聪", "王健林", "社会王", "隔壁老王", "林绿群", "你打球像蔡徐坤", 'aaa', 'bbb', '王祖蓝', '你打球王祖蓝'
];

// 键盘弹起事件
$("txt").onkeyup = function() {
    // 每次弹起之前先清空之前的联想
    $("ul_box").innerHTML = ""

    // 为空直接跳出函数
    if (this.value.length == 0) {
        // 隐藏ul
        $("ul_box").style.display = "none"
        return
    }

    // 循环遍历 判断是否存在联想
    for (let i = 0; i < keywords.length; i++) {
        // indexOf => 为空"" 返回0 待处理
        if (keywords[i].indexOf(this.value) != -1) {
            // 存在联想 直接渲染页面
            renderUl(keywords[i])
        }
    }
}

/**
 * 渲染ul下的li
 * @param {array_string} arrString 
 */
function renderUl(arrString) {
    let li = document.createElement("li")
    li.innerHTML = arrString

    // 将li追加至ul里面
    $("ul_box").appendChild(li)

    // 显示ul
    $("ul_box").style.display = "block"
        // 高亮
    ul_li_syle(li)

    // 点击 li的值 赋值给 txt
    // 失去光标优先级大于点击 会先执行 
    // 失去光标的时候清空了ul里面的内容 所以这个时候就获取不到数据了
    // 解决方案 给失去光标延时器
    li.onclick = function() {
        $("txt").value = this.innerHTML
    }
}

/**
 * 高亮
 * @param {element} el 
 */
function ul_li_syle(el) {
    // 高亮
    el.onmouseover = function() {
        this.style.backgroundColor = "#cccccc96"
    }
    el.onmouseout = function() {
        this.style.backgroundColor = "#fff"
    }
}

// 本地存储 -> 历史记录

// 搜索后保存历史记录至本地
$("search").onclick = function() {
    // 为空不保存
    if ($("txt").value.length == 0) {
        $("ul_box").style.dispaly = "none"
        return
    }
    // 获取数据 => 进行拼接
    let old_data = localStorage.getItem("search_baidu") || ""

    // 判断数据是否已经存在本地
    if (old_data.indexOf($("txt").value) > -1) {
        return
    }

    // 数据逗号拼接
    // 判断是否右数据 拼接处理
    let new_data = old_data ? `${old_data},${$("txt").value}` : $("txt").value

    // 保存数据
    localStorage.setItem("search_baidu", new_data)
}

// 获取光标 历史记录提示
$("txt").onfocus = function() {
    // 获取数据
    let data = localStorage.getItem("search_baidu")

    // 判断是否已经有历史记录
    if (data == null) {
        return
    }
    // 逗号处理
    let arr_data = data.split(",").reverse()
    for (let i = 0; i < arr_data.length; i++) {
        renderUl(arr_data[i])
    }
}

// 失去光标 历史记录移除
$("txt").onblur = function() {
    // 延迟执行 失去光标的优先级大于点击事件
    setTimeout(() => {
        $("ul_box").innerHTML = ""
        $("ul_box").style.display = "none"
    }, 200)
}