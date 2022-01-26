## 问题描述
在使用XMLHttp
```javascript
/**
 * 显示插入数据的表单。
 */
function insert() {
	// console.log("插入");
	// 创建XMLHttpRequest
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5 
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	// 设置请求：post方法，/login
	xmlhttp.open("POST", "insert", true);
	// 设置处理响应的回调函数
	xmlhttp.onreadystatechange = function() {
		// 如果响应成功
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			// 判断响应的字符串
			// if (xmlhttp.responseText == "插入成功")
			// 前端DOM操作
			if (xmlhttp.responseText == "插入成功") {
				// 跳转到成功页面
				location.href = "ShowAllUser.html";
			} else {
				// 弹出提示信息 
				// alert(xmlhttp.responseText);
			}
		}
	}
	// 获取表单输入信息
	userID = document.getElementById("insert_userID").value;
	name = document.getElementById("insert_name").value;
	pwd = document.getElementById("insert_pwd").value;
	loginTime = document.getElementById("insert_loginTime").value;
	count = document.getElementById("insert_count").value;
	// 设置请求头
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	sendStr = "userID=" + userID +
		"&name=" + name + "&pwd=" + pwd + "&loginTime=" + loginTime + "&count=" + count;
	// 发送带参数的请求体
	xmlhttp.send(sendStr);
}
```
在跳转语句时，控制台有如下错误输出:
```
XML 解析错误：格式不佳
位置：http://localhost:8080/Login3WebFenLi/insert
行 1，列 3：

```
对应的后端Java如下：
```java
/**
    * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
    *      response)
    */
protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    request.setCharacterEncoding("utf-8");
    response.setCharacterEncoding("utf-8");

    String userID = request.getParameter("userID");

    Userinfo userinfo = new Userinfo();
    userinfo.setUserID(userID);
    userinfo.setName(request.getParameter("name"));
    String loginTime = request.getParameter("loginTime");
    // 如果没有输入登录时间，则使用录入的时间作为登录的时间
    if ("".equals(loginTime)) {
        userinfo.setLoginTime(DateTools.format(new Date()));
    } else {
        userinfo.setLoginTime(loginTime);
    }
    userinfo.setCount(Integer.parseInt(request.getParameter("count")));
    userinfo.setPwd(request.getParameter("pwd"));
    System.out.println(userinfo);
    UserInfoDao userInfoDao = UserInfoDaoImpl.getInstance();
    // 如果插入成功
    if (userInfoDao.insertUserInfo(userinfo)) {
        response.getWriter().write("插入成功");
    } else {
        response.getWriter().write("插入失败");
    }
}
```
## 原因
可以看到后端输出一段字符串作为响应给前端，前端通过接受到的响应文本进行跳转。

但是呢，后端没有设置响应的格式，这样前端不知道如何解析，所以会报错。
## 解决方案
在response.getWriter().write()语句之前写上：
```
response.setContentType("text/plain");
```
也就是修改为如下形式：
```java
/**
    * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
    *      response)
    */
protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    request.setCharacterEncoding("utf-8");
    response.setCharacterEncoding("utf-8");

    // 解决“XML 解析错误：格式不佳”，在response.getWriter().write()前面写上如下代码:
    response.setContentType("text/plain");

    String userID = request.getParameter("userID");
    Userinfo userinfo = new Userinfo();
    userinfo.setUserID(userID);
    userinfo.setName(request.getParameter("name"));
    String loginTime = request.getParameter("loginTime");
    // 如果没有输入登录时间，则使用录入的时间作为登录的时间
    if ("".equals(loginTime)) {
        userinfo.setLoginTime(DateTools.format(new Date()));
    } else {
        userinfo.setLoginTime(loginTime);
    }
    userinfo.setCount(Integer.parseInt(request.getParameter("count")));
    userinfo.setPwd(request.getParameter("pwd"));
    System.out.println(userinfo);
    UserInfoDao userInfoDao = UserInfoDaoImpl.getInstance();
    // 如果插入成功
    if (userInfoDao.insertUserInfo(userinfo)) {
        response.getWriter().write("插入成功");
    } else {
        response.getWriter().write("插入失败");
    }
}
```