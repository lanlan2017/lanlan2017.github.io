---
title: 小本子
date: 2019-10-16 10:49:05
comments: false
---
## 纪念日 ##
2017-3-1
## 生日 ##
农历6月20日
## 要求 ##
- 要甜

## flags
- 我也要成为一个优秀的人！虽然不能像小丁他们那样！但是我也要努力
- 我不能把时间放在FY和DC他们身上
- 我不能把为了拿奖学金发文章
- 我要好好写文章
- 我要少在意鸡毛蒜皮的小事
- 要23点就睡觉

## 教训
- 送人东西前要注意看是否快过期

<details><summary>展开/折叠</summary>

## 计算 ##
<div id='show' style="text-align:center"></div>
<script>function timeFn() {var dateBegin = Date.parse("2017-3-1");var dateEnd = new Date();var dateDiff = dateEnd.getTime() - dateBegin;var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));var leave1 = dateDiff % (24 * 3600 * 1000);var hours = Math.floor(leave1 / (3600 * 1000));var leave2 = leave1 % (3600 * 1000);var minutes = Math.floor(leave2 / (60 * 1000));var leave3 = leave2 % (60 * 1000);var seconds = Math.round(leave3 / 1000);var leave4 = leave3 % (60 * 1000);var timeFn = "酸臭味持续了:" + dayDiff + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";document.getElementById('show').innerText = timeFn;}setInterval("timeFn();", 1000);</script>
<div style="display: none;">

## 源码 ##
```html
<div id='show' style="text-align:center"></div>
<script>
    // 计算两个时间差 dateBegin 开始时间
    function timeFn() {
        // 预制时间
        var dateBegin = Date.parse("2017-3-1");
        //获取当前时间
        var dateEnd = new Date();
        //时间差的毫秒数
        var dateDiff = dateEnd.getTime() - dateBegin;
        //计算出相差天数
        var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
        //计算天数后剩余的毫秒数
        var leave1 = dateDiff % (24 * 3600 * 1000)
        //计算出小时数
        var hours = Math.floor(leave1 / (3600 * 1000))
        //计算小时数后剩余的毫秒数
        var leave2 = leave1 % (3600 * 1000)
        //计算相差分钟数
        var minutes = Math.floor(leave2 / (60 * 1000))
        //计算分钟数后剩余的毫秒数
        var leave3 = leave2 % (60 * 1000)
        //计算相差秒数
        var seconds = Math.round(leave3 / 1000)
        //计算分钟数后剩余的毫秒数
        var leave4 = leave3 % (60 * 1000)
        // 毫秒数
        var minseconds = Math.round(leave4 / 1000)
        // 拼接字符串.
        var timeFn = "酸臭味持续了:" + dayDiff + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒" + minseconds + "毫秒";
        // 更新dom
        document.getElementById('show').innerText = timeFn;
    }
    setInterval("timeFn();", 1000);
</script>
```
</div>


</details>
