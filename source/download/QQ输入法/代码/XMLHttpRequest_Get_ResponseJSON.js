// 创建XMLHttpRequest
if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
} else {
    // code for IE6, IE5 
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
// 设置请求的方法，URL，
xmlhttp.open("GET", "GetSession", true);
// 设置响应处理的方法
xmlhttp.onreadystatechange = function() {
    // 响应成功处理
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        json = eval("(" + xmlhttp.responseText + ")")
        // 前端DOM操作
    }
}
// 发送请求
xmlhttp.send();