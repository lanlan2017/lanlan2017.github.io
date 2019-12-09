var input = document.getElementById("input");
var inputBackup;
var timeOut;
// 代码深度计数器
var depth = 0;
// 工具方法.
function checkInput() {
    return !(input.value === null || input.value === "");
}
// 备份输入
function backupInput() {
    inputBackup = input.value;
}

function undo() {
    input.value = inputBackup;
    if (timeOut != null) {
        // 去掉定时器 
        window.clearTimeout(timeOut);
    }
    // 全选文本域中的内容
    input.select();
    // 复制到剪贴板
    document.execCommand("Copy");
    input.blur();
}

function tags() {
    input.value = "\ntags: 有空了解一下";
    copy();
}

function linksTOC(text) {
    if (text == null) {
        result(linksTOC(input.value));
        // linksTOC(input.value);
    } else {
        var toc = '';
        var head = "<div id=\"my_toc\">\n\n";
        var tail =
            "\n</div>\n<script>if (navigator.platform.search('arm')==-1){document.getElementById('my_toc').style.display = 'none';}" +
            "<__script>\n".replace("__", "/");
        // markdown 标题正则表达式
        var regex = /^(#+) (.+?)(?: #*)?$/mg;
        var matchs = text.match(regex);
        var resultStr = "";
        var item = '';
        var tabs = '';
        var title = '';
        // markdown超链接正则表达式
        var MdLinkRegex = /\[(.+?)\]\(.+?\)/;
        for (var i = 0; i < matchs.length; i++) {
            // 根据#号的数量生成缩进
            tabs = generateIndentation(matchs[i].replace(regex, "$1").length - 1);
            // 取出标题.
            title = matchs[i].replace(regex, "$2");
            // 如果标题中有Markdown超链接时
            if (title.match(MdLinkRegex)) {
                title = title.replace(MdLinkRegex, '$1');
            }
            // 拼接成完整的无序列表
            item = tabs + "- [" + title + "](/links/#" + title + ")" + "\n"
            // console.log(item);
            resultStr += item;
        }
        toc = head + resultStr + tail;
        var regexs = /[<]div id='my_toc'>\n\n(.+\n)+\n<[/]div>\n[<]script>.+<[/]script>\n/m;
        text = text.replace(regexs, toc);
        return text;
    }
}
// 生成缩进
function generateIndentation(count) {
    var indentation = '';
    for (var i = 0; i < count; i++) {
        indentation += "    ";
    }
    return indentation;
}
// 清除输入文本框
function clearInput() {
    input.value = "";
}
// 将文本框中的内容复制到剪贴板
function copy() {
    if (timeOut != null) {
        // 去掉定时器 
        window.clearTimeout(timeOut);
        // alert("移除定时器");
    }
    // 全选文本域中的内容
    input.select();
    // 复制到剪贴板
    document.execCommand("Copy");
    // 显示提示文本
    input.placeholder = "运行结果已经复制到剪贴板中!";
    // 让选中的文本失去焦点.
    input.blur();
    // 延时2秒后清除输入框中的内容.
    timeOut = window.setTimeout(clearInput, 10000);
}
// 显示处理结果
function result(text) {
    backupInput();
    input.value = text;
    copy();
}

function plus() {
    var counter = document.getElementById('counter');
    counter.value = Number(counter.value) + 1
}

function minus() {
    var counter = document.getElementById('counter');
    var minus1 = Number(counter.value) - 1;
    counter.value = (minus1) > 0 ? minus1 : 1;
}
// ########################################## 功能方法开始
// 字符串处理函数 开始
function upperCase() {
    if (checkInput()) {
        result(input.value.toUpperCase());
    } else {
        input.placeholder = "请先输入!";
    }
}

function lowerCase() {
    if (checkInput()) {
        result(input.value.toLowerCase());
    } else {
        input.placeholder = "请先输入!";
    }
}

function deleteSingleLineComment(text) {
    // 没有参数的情况
    if (typeof (text) == "undefined") {
        // 递归调用,输出结果
        result(deleteSingleLineComment(input.value));
    }
    // 带参数的情况
    else {
        // 删除HTML注释:<!-- -->
        text = text.replace(/^[ ]*<!--.+-->/mg, "");
        // 删除单独一行的单行注释
        text = text.replace(/^[ ]*\/\/.*\n/mg, "");
        return text;
    }
}
// 删除空行
function deleteBlankLine(text) {
    //没有参数的情况
    if (typeof (text) == "undefined") {
        text = input.value;
        result(text.replace(/^[ ]*\n/mg, ""));
    }
    // 传入参数的情况
    else {
        text = text.replace(/^[ ]*$\n/mg, "");
        text = text.replace(/\n^[ ]*$/mg, "");
        return text;
    }
}

function tab() {
    result(input.value.replace(/^/mg, "    "));
}
// 删除开头的四个空格
function unTab(text) {
    // 没有参数的情况
    if (typeof (text) == "undefined") {
        result(unTab(input.value));
    }
    // 传入参数的情况
    else {
        // 删除第一行的缩进
        return text.replace(/^    /mg, "");
    }
}
// \t变成4个空格
function tabTo4Spaces(text) {
    if (typeof (text) == "undefined") {
        result(tabTo4Spaces(input.value));
    } else {
        return text.replace(/\t/mg, "    ");
    }
}

function deleteMultilineComments(text) {
    if (typeof (text) == "undefined") {
        result(deleteMultilineComments(input.value));
    } else {
        return text.replace(/\/\*{1,2}\n(?:[ ]*\*.*?\n)+/mg, "");
    }
}
// 删除每行开头的空白符.
function deleteSpaceStart(text) {
    if (typeof (text) == "undefined") {
        result(deleteBlankLine(input.value));
    } else {
        return text.replace(/^[ ]+/mg, "");
    }
}
// 变成一行
function toOneLine(text) {
    // 没有传入参数的情况
    if (typeof (text) == "undefined") {
        // 使用输入框中的文本作为函数的参数递归调用
        result(toOneLine(input.value));
    }
    // 传入参数的情况
    else {
        text = text.replace(/^[ ]+/mg, "");
        text = text.replace(/\n/mg, "");
        return text;
    }
}
// 转成英文表单符号
function toEnPunctuation(text) {
    // 没有传入参数的情况
    if (typeof (text) == "undefined") {
        // 使用输入框中的内容作为输入,递归调用
        result(toEnPunctuation(input.value));
    }
    // 传入参数的情况
    else {
        text = text.replace(/“/g, '"');
        text = text.replace(/”/g, '"');
        text = text.replace(/‘/g, "'");
        text = text.replace(/’/g, "'");
        text = text.replace(/，/g, ",");
        text = text.replace(/！/g, "!");
        text = text.replace(/：/g, ":");
        text = text.replace(/；/g, ";");
        text = text.replace(/（/g, "(");
        text = text.replace(/）/g, ")");
        return text;
    }
}
// 压缩div标签中的html代码
function miniDiv(text) {
    // 获取第一个匹配正则的内容
    var miniText = text.match(/([ ]*<div id="panel">\n(?:.*\n)+?[ ]*<\/div>)/m)[0];
    console.log(miniText);
    miniText = toOneLine(miniText);
    // 删除div
    text = text.replace(/([ ]*<div id="panel">\n(?:.*\n)+?[ ]*<\/div>)/m, "");
    return miniText + text;
}

function toTools() {
    var header = "---\ntitle: 在线工具\ndate: 2019-10-17 12:08:16\ncomments: false\n---\n"
    var text = input.value;
    // 删除单行注释
    text = deleteSingleLineComment(text);
    // 删除空行
    text = deleteBlankLine(text)
    // 删除其他标签
    text = text.replace(/(?:.*\n)+<body>\n/m, "");
    text = text.replace(/<\/body>\n(?:.*\n?)*/m, "");
    // 压缩DIV标签
    text = miniDiv(text);
    // 删除开头多余的tab键
    text = unTab(text);
    text = header + text;
    result(text)
}

function switchHttpsSsh(text) {
    if (text == null) {
        result(switchHttpsSsh(input.value));
    } else {
        var httpsRegex = /^https:\/\/(.+?)\/(.+?\/.+?\.git)$/;
        var sshRegex = /^git@(.+?):(.+?\/.+?\.git)$/;
        if (httpsRegex.test(text)) {
            // 将https的git仓库地址转为ssh
            text = text.replace(httpsRegex, "git@$1:$2");
        } else if (sshRegex.test(text)) {
            // 将ssh的git仓库地址转为https
            text = text.replace(sshRegex, "https://$1/$2");
        }
        return text;
    }

}

function swap(text) {
    if (text == null) {
        result(swap(input.value));
    } else {
        var LegalInput = /^(.+?)([, _])(.+?)$/;
        if (LegalInput.test(text)) {
            return text.replace(LegalInput, "$3$2$1");
        } else {
            return "非法输入,请输入一个以[,_ ]";
        }
    }
}

// 字符串处理函数 结束
// markdown处理函数
// 实现markdown无序列表
function mdU() {
    // 读取输入
    var text = input.value;
    // 删除空行
    text = deleteBlankLine(text);
    var ErrorStartCharacterRegex = /^[^a-zA-Z0-9\u4e00-\u9fa5][ ]+/mg;
    text = text.replace(ErrorStartCharacterRegex, "");
    text = text.replace(/^(.+)/mg, "- $1");
    text = deleteBlankLine(text);
    text = text + "\n";
    result(text);
}
// 实现markdown有序列表
function mdO() {
    // 读取输入
    var text = input.value;
    text = deleteBlankLine(text);
    // 删除无关字符
    var ErrorStartCharacterRegex = /^[^a-zA-Z0-9\u4e00-\u9fa5][ ]+/mg;
    text = text.replace(ErrorStartCharacterRegex, "");
    // 按行分割
    var lines = text.split(/\n/mg);
    // 缓存
    var outText = "";
    lines.forEach(function (item, index) {
        outText += (index + 1) + ". " + item + "\n";
    })
    outText = outText + "\n";
    result(outText);
}
// 实现markdown引用块.
function mdQ() {
    // 读取输入
    var text = input.value;
    text = deleteBlankLine(text);
    // 删除无关字符
    var ErrorStartCharacterRegex = /^[^a-zA-Z0-9\u4e00-\u9fa5][ ]+/mg;
    text = text.replace(ErrorStartCharacterRegex, "")
    text = text.replace(/^/mg, "> ");
    text = text + "\n";
    result(text);
}
// 实现markdown行内代码.
function mdK() {
    result("`" + input.value + "`");
}
// 标出所有的代码.
function mdKs(text) {
    // 如果没有参数
    if (typeof (text) == "undefined") {
        // console.log("text=" + text)
        // var text = input.value;
        result(mdKs(input.value));
    } else {
        text = text.replace(/`?((?:-(?! ))?[a-zA-Z<][a-zA-Z0-9 ():\_.\/\[\]<>,+="?-]*[a-zA-Z0-9);>/.\*\]])`?/mg,
            "`$1`");
        text = text.replace(/\(`(.+?)\)`/mg, "(`$1`)");
        return text;
    }
}
// 实现markdown加粗.
function mdB() {
    result("**" + input.value + "**");
}

function toggleFold(text) {
    if (text == null) {
        toggleFold(input.value);
    } else {
        var first = "<details><summary>展开/折叠</summary>\n\n" + text + "\n\n</details>";
        result(first);
        return first;
    }
}
// 生成java代码.
function mdCb(Language) {
    result("```" + Language + "\n" + input.value + "\n```");
}

function mdCbOption() {
    mdCb(document.getElementById('Option').value);
}
// 将无序列表转成表格
function mdU2T() {
    var tableHead = "||描述|\n|:--|:--|\n"
    var text = input.value;
    // 删除行首空白
    text = deleteSpaceStart(text);
    // 删除空行
    text = deleteBlankLine(text);
    // 将中文字符转成英文字符
    text = toEnPunctuation(text);
    // 标记行内代码
    text = mdKs(text);
    // 删除无序列表的标记
    text = text.replace(/^[-*] /mg, "");
    text = text.replace(/^(`.+?`):/mg, "$1|");
    text = text.replace(/^/mg, "|");
    text = text.replace(/$/mg, "|");
    text = tableHead + text;
    // console.log(text);
    result(text);

}
// 生成markdown表格
function mdtableCopy() {
    var text = input.value;
    text = text.replace(/[ ]{2,}/mg, "|");
    text = text.replace(/^/mg, "|");
    text = text.replace(/$/mg, "|");
    var strs = text.split("\n");
    text = '';
    strs.forEach(function (item, index) {
        console.log(index)
        if (index == 1) {
            text += item.replace(/[^|]+/mg, ":--") + "\n";
        }
        text += item + "\n";
    });

    result(text);
}

function frontMatter(text) {
    if (text == null) {
        result(frontMatter(input.value))
    } else {
        // /storage/emulated/0/blog/blog/source/_posts/Git/Debug/fatal refusing to merge unrelated histories.md
        var legalLinuxHexoPostsPath = /^.+\/source\/_posts(\/.+)\/(.+)\.md/;
        if (legalLinuxHexoPostsPath.test(text)) {
            // 生成分类
            var categories = "categories: " + text.replace(legalLinuxHexoPostsPath, "$1").replace(/\//mg,
                "\n  - ");
            // 生成标题
            var title = "title: " + text.replace(legalLinuxHexoPostsPath, "$2");
            // console.log('true');
            var fm = "---\n" + title + "\n" + categories + "\n---\n";
            // console.log(title);
            // console.log(categories);
            // console.log(fm);
            return fm;
        }
        return text;
    }
}
// 格式化函数 开始
function unNiuke() {
    undo();
    minus();
}
// 格式化从 牛客网网页版 复制得到的选择题 为markdown格式.
function niuke() {
    // 保存问题
    var problem = '';
    // 保存选项
    var selects = '';
    // 保存答案
    var answer = '';
    // 选项开始的下标
    var selectStart = 0;
    // 选项结束的下标
    var selectEnd = 0;
    var counter = document.getElementById("counter");
    var text = input.value;
    // 使用英文标点符号
    text = toEnPunctuation(text);
    // 取出选项
    selects = text.match(/(?:[A-z]\n.+?\n)+/mg)[0];
    selectStart = text.indexOf(selects);
    selectEnd = selectStart + selects.length;
    // 格式化选项
    selects = mdKs(selects);
    // 标记行内代码
    selects = selects.replace(/([A-Z])\n(.+)/mg, "- $1 $2");
    // 取出问题
    problem += text.substring(0, selectStart);
    // 删除空行
    problem = deleteBlankLine(problem) + "\n";
    // 取出答案
    answer = text.substring(selectEnd);
    answer = deleteBlankLine(answer);
    answer = answer.replace(/(^正确答案: `?[A-Za-z]+`?$)/mg,
        "\n## 解析\n<details><summary>显示答案/隐藏答案</summary>$1</details>\n\n");
    // 拼接结果
    text = "\n# 题目" + counter.value + " 考点:\n" + problem + selects + answer;
    // 输出结果
    result(text);
    // 计数器加1
    plus();
}
// 替换单行注释,在单行注释结尾处加入结尾标记
function convertSingleLineComments(text) {
    return text.replace(/(?:[ ]*)(\/\/.+)/mg, "$1__newLine__");
}
// 恢复单行注释,将结尾标记转为换行符.
function restoreSingleLineComment(text) {
    var textTemp = '';
    var regex = /([ ]*)(?:(\/\/.+?)__newLine__)+(.*)/mg;
    var flag;
    if ((flag = regex.test(text))) {
        // 取出单行注释
        var singleLineComments = text.match(regex);
        // 保存单行注释的缩进
        var tabs = '';
        // 多个单行注释的起始位置
        var start = 0;
        // 单行注释结束的位置
        var end = 0;
        // 恢复后的单行注释
        // 
        for (var i = 0; i < singleLineComments.length; i++) {
            var recovery = '';
            // 获取当前这段单行注释的下标
            start = text.indexOf(singleLineComments[i]);
            // 截取上一次结束位置到当前位置(这个范围不是单行注释的内容)
            textTemp += text.substring(end, start);
            // 保存单行注释的介绍位置,这个位置也是非单行注释的开始的地方
            end = start + singleLineComments[i].length;
            // 使用特殊的字符分割这些单行注释
            var singleLineCommentArr = singleLineComments[i].split("__newLine__");
            for (var j = 0; j < singleLineCommentArr.length; j++) {
                if (j == 0) {
                    // 取出缩进
                    tabs = singleLineCommentArr[j].substring(0, singleLineCommentArr[j].indexOf("//"));
                    // 保存这个单行注释
                    recovery += singleLineCommentArr[j] + "\n";
                } else {
                    // 其他单行注释使用和第一个一行的缩进
                    recovery += tabs + singleLineCommentArr[j] + "\n";
                }
            }
            // 将恢复好的单行注释写入缓存.
            textTemp += recovery;
        }
    }
    // 保存剩下的非单行注释的代码.
    textTemp += text.substring(end);
    // 返回所有处理好的代码.
    return textTemp;
}
// 恢复for循环
function restoreFor(text) {
    return text.replace(/for[ ]*\((.*?);\n?[ ]*(.*?);\n?[ ]*(.+)\)/mg, "for($1;$2;$3)");
}
// 设置java代码的缩进和换行符.
function formatJavaCode(text) {
    if (typeof (text) == "undefined") {
        console.log("请输入参数");
    } else {
        var lineTemp = '';
        var value = '';
        for (var i = 0; i < text.length; i++) {
            value = text[i];
            if (value == "{") {
                depth++;
                lineTemp
                    += "{" + "\n" + depthTab(depth);
            } else if (value == "}") {
                depth--;
                lineTemp += "\n" + depthTab(depth) +
                    "}" + "\n" + depthTab(depth);
                if (depth == 0) {
                    lineTemp += "\n";
                }
            } else if (value == ";") {
                lineTemp
                    += ";" + "\n" + depthTab(depth);
            } else {
                lineTemp += value;
            }
        }
        return lineTemp;
    }
}
// 格式化java代码.
function formatJava(text) {
    // 不带参数的情况
    if (typeof (text) == "undefined") {
        result(formatJava(input.value));
    }
    // 带参数的情况
    else {
        // 将中文标点字符转为英文标点字符.
        text = toEnPunctuation(text);
        // 转换单行注释
        text = convertSingleLineComments(text);
        // 变成一行
        text = toOneLine(text);
        // 格式化设置换行的缩进
        text = formatJavaCode(text);
        // 恢复单行注释
        text = restoreSingleLineComment(text);
        // 删除多余的空行
        text = deleteBlankLine(text);
        text = restoreFor(text);
        return text;
    }
}
// 打印tab键(四个空格)
function depthTab(depth) {
    var tab = "    ";
    var depthTabs = '';
    for (var i = 0; i < depth; i++) {
        depthTabs += tab;
    }
    // console.log("xx" + depthTabs + "xx");
    return depthTabs;
}
// 只保留java代码,删除注释和空行
function miniJava() {
    var text = input.value;
    // 删除多行注释
    text = deleteMultilineComments(text);
    // 删除单行注释
    text = deleteSingleLineComment(text);
    // 格式化java代码
    text = formatJava(text);
    // 删除单行注释
    text = deleteSingleLineComment(text);
    // 删除空行
    text = deleteBlankLine(text);
    result(text);
}
// 生成C语言头文件声明.
function cHeader() {
    if (checkInput()) {
        var legalFileName = /^[a-zA-Z_]\w*$/;
        if (legalFileName.test(input.value)) {
            var upperCase = input.value.toUpperCase();
            var text = "//" + input.value + ".h\n" + "#ifndef _" + upperCase + "_H_ //如果没有引入头文件" + input
                .value + ".h\n" + "    #define _" + upperCase + "_H_ //那就引入头文件" + input.value + ".h\n" +
                "#endif";
            result(text);
        } else {
            input.placeholder = "输入文件名格式错误,请以字母或下划线开头!";
        }
    } else {
        input.placeholder = "请先输入不带后缀的头文件名称";
    }
}