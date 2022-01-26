// 创建XMLHttpRequest
if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
} else {
    // code for IE6, IE5 
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
// 设置请求：post方法，/login
xmlhttp.open("POST", "login", true);
// 设置处理响应的回调函数
xmlhttp.onreadystatechange = function() {
    // 如果响应成功
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        // 判断响应的字符串
        if (xmlhttp.responseText == "登录成功"){
            // 跳转到成功页面 
            location.href = "success.html";
        }
        else
            // 弹出提示信息 
            alert(xmlhttp.responseText);
    }
}
// 获取表单输入信息
userID = document.getElementById("userID").value;
pwd = document.getElementById("pwd").value;
// 设置请求头
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
// 发送带参数的请求体
xmlhttp.send("userID=" + userID + "&pwd=" + pwd);