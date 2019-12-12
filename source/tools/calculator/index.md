---
title: 计算器
date: 2019-10-17 12:08:16
comments: false
---
<div id="panel"><table><tr><td>比价</td><td id='menu'><button onclick="cheapest()">比价</button><button onclick="add()">添加</button><button onclick="removeLast()">删除</button></td></tr></table><table id='cal_panel'><thead><tr><th>价钱</th><th>容量</th><th class="price_col">单价</th></tr></thead><tbody id='cal_panel_body'><tr><td><input type="text" title="价钱:输入整数或小数" pattern="\d+(?:\.\d+)?" class="price" id="price_1"></td><td><input type="text" title="容量:输入整数或小数" pattern="\d+(?:\.\d+)?" class="capacity" id="capacity_1"></td><td class="price_col"><input type="text" class="average" id="average_1" readonly="true"></td></tr><tr><td><input type="text" title="价钱:输入整数或小数" pattern="\d+(?:\.\d+)?" class="price" id="price_2"></td><td><input type="text" title="容量:输入整数或小数" pattern="\d+(?:\.\d+)?" class="capacity" id="capacity_2"></td><td class="price_col"><input type="text" class="average" id="average_2" readonly="true"></td></tr></tbody></table></div>
<style>
    .price_col {
        display: none;
        /* display: table-cell; */
    }
</style>
<script>
    function add() {
        var table = document.getElementById('cal_panel');
        var tbody = table.tBodies[0];
        var newIndex = table.rows.length;
        console.log(newIndex);
        var tr = document.createElement('tr');
        var priceTd = document.createElement('td');
        var priceInput = document.createElement('input');
        priceInput.type = 'text';
        priceInput.title = "价钱:输入整数或小数";
        priceInput.pattern = "\\d+(?:\\.\\d+)?";
        priceInput.className = "price";
        priceInput.id = "price_" + newIndex;
        priceTd.appendChild(priceInput);
        tr.appendChild(priceTd);
        var capacityTd = document.createElement('td');
        var capacityInput = document.createElement('input');
        capacityInput.type = 'text';
        capacityInput.title = "容量:输入整数或小数";
        capacityInput.pattern = "\\d+(?:\\.\\d+)?";
        capacityInput.className = "capacity";
        capacityInput.id = "capacity_" + newIndex;
        capacityTd.appendChild(capacityInput);
        tr.appendChild(capacityTd);
        var averageTd = document.createElement('td');
        averageTd.className = 'price_col';
        var averageInput = document.createElement('input');
        averageInput.type = 'text';
        averageInput.className = "average";
        averageInput.id = "average_" + newIndex;
        averageInput.readOnly = 'true';
        averageTd.appendChild(averageInput);
        tr.appendChild(averageTd);
        tbody.appendChild(tr);
    }
    function removeLast() {
        var table = document.getElementById('cal_panel');
        var tbody = table.tBodies[0];
        var last = tbody.lastChild;
        tbody.removeChild(last);
    }
    function cheapest() {
        var table = document.getElementById('cal_panel');
        var rowsLength = table.rows.length;
        for (var i = 1; i < rowsLength; i++) {
            avg(i);
        }
        showMin();
    }
    function showMin() {
        var shows = document.getElementsByClassName('price_col');
        for (var i = 0; i < shows.length; i++) {
            shows[i].style.display = 'table-cell';
        }
        findMin();
    }
    function avg(index) {
        var priceInput = document.getElementById('price_' + index);
        priceInput.parentNode.parentNode.style.background = "white";
        var price = Number(priceInput.value);
        var capacity = Number(document.getElementById('capacity_' + index).value);
        var average = price / capacity;
        console.log(price + '/' + capacity + '=' + average)
        document.getElementById('average_' + index).value = average;
    }
    function findMin() {
        var avgDoms = document.getElementsByClassName('average');
        var minIndex = 0;
        for (var i = 0; i < avgDoms.length; i++) {
            if (Number(avgDoms[i].value) < Number(avgDoms[minIndex].value)) {
                minIndex = i;
            }
        }
        console.log("minIndex:" + minIndex + ",min:" + avgDoms[minIndex].value)
        avgDoms[minIndex].parentNode.parentNode.style.background = 'LightCoral';
    }
</script>