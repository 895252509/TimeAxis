//debugger;

window.onload = function() {
    var obj = document.getElementById("TimeAxisArea");
    obj.onclick = function() {

    }

    var i = new TimeAxis("TimeAxisArea");
    var initDate = new Date("2017/03/03");
    var btn = new i.ZButton(10, 30, 80, 30, "增加滑块");

    i.addCom(btn);
    i.addCom(new i.ZAxis(50, 106, 500, 4));

    var axisData = {
        axisleft: 50,
        axisright: 550,
        axisBaseLine: 106,
        axisLength: 500,
        axisUseLength: 500 * 0.9,
        axisUnUseLength: 500 * 0.1,
        axisTick1: 450 / 12
    }

    var objarr = [];
    btn.onclick = function() {
        addSlider(i, objarr, axisData, new Date(initDate.setDate(initDate.getDate() + 14)));
    }
    for (var pos = 0; pos < 12; pos++) {
        i.addCom(new i.ZTickMark(axisData.axisleft + axisData.axisUnUseLength / 2 + pos * axisData.axisTick1,
            axisData.axisBaseLine, 1, 8, "#FF6347"));
        i.addCom(new i.ZText("17/" + itranNum(pos + 1),
            axisData.axisleft + axisData.axisUnUseLength / 2 + pos * axisData.axisTick1 - 14,
            axisData.axisBaseLine + 14, 8));
    }
    var pos = 12;
    i.addCom(new i.ZTickMark(axisData.axisleft + axisData.axisUnUseLength / 2 + pos * axisData.axisTick1,
        axisData.axisBaseLine, 1, 12, "#FF6347"));
    i.addCom(new i.ZText("18/" + itranNum(1),
        axisData.axisleft + axisData.axisUnUseLength / 2 + pos * axisData.axisTick1 - 14,
        axisData.axisBaseLine + 14, 8));

    addSlider(i, objarr, axisData, new Date());

}

function ObjMap() {
    this.zslider = null;
    this.color = null;
    this.id = null;
    this.ztext = null;
    this.zbox = null;
    this.text = null;
}

function itranNum(num) {
    if (0 <= num && num <= 9)
        return "0" + num.toString();
    else
        return num.toString();

}

function randColor() {
    var r = zzz.lib.getRandomInt(0, 255);
    var g = zzz.lib.getRandomInt(0, 255);
    var b = zzz.lib.getRandomInt(0, 255);
    return "rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")";
}

function getDaysInOneMonth(year, month) {
    month = parseInt(month, 10);
    var d = new Date(year, month, 0);
    return d.getDate();
}

function addSlider(_i, _arr, _axisObj, currDate, _color) {

    var boxheight = 14;
    var boxline = 6;

    var objdef = new ObjMap();
    var mon = currDate.getMonth();
    var day = currDate.getDate();
    var dayLength = day * (_axisObj.axisTick1 / getDaysInOneMonth(2017, mon));
    objdef.color = _color || randColor();
    objdef.text = currDate.getFullYear().toString() + "/" + itranNum(currDate.getMonth() + 1) + "/" +
        itranNum(currDate.getDate());

    objdef.zslider = new _i.ZSlider(_axisObj.axisleft + 25 + mon * _axisObj.axisTick1 + dayLength,
        0, 12, 20, 0.3, objdef.color);

    objdef.zslider.onmousemove = function(e) {
        if (objdef.zslider.isClick) {
            var ioffset = e.offsetX - _axisObj.axisleft - _axisObj.axisUnUseLength / 2;
            var mon = Math.floor(ioffset / _axisObj.axisTick1);
            if (mon < 0) mon = -1;
            var day = (ioffset % _axisObj.axisTick1) / _axisObj.axisTick1 * getDaysInOneMonth(2017, mon + 1);
            day = Math.round(day);
            if (day < 0) day = 0;
            else if (day >= 31) day = 31;
            var createDateText = null;
            if (day === 0) {
                createDateText = "2017/" + itranNum(mon + 1);
            } else {
                createDateText = "2017/" + itranNum(mon + 1) + "/" + itranNum(day);
            }

            var currDate = new Date(createDateText);
            var dateText = currDate.getFullYear().toString() + "/" + itranNum(currDate.getMonth() + 1) + "/" +
                itranNum(currDate.getDate());
            if (dateText.substring(0, 1) === "N")
                dateText = "超出范围";
            objdef.text = dateText;
            objdef.ztext.setText(dateText);

        }
    }

    objdef.zslider.ondelete = function(e) {

        _i.deleteCom(objdef.zbox);
        _i.deleteCom(objdef.zslider);
        _i.deleteCom(objdef.ztext);
        var pos = _arr.indexOf(objdef);
        var arrdate = [];
        var arrcolor = [];
        for (var i = pos + 1; i < _arr.length; i++) {
            arrdate.push(_arr[i].text);
            arrcolor.push(_arr[i].color);
            _i.deleteCom(_arr[i].zbox);
            _i.deleteCom(_arr[i].zslider);
            _i.deleteCom(_arr[i].ztext);
        }
        _arr.splice(pos, _arr.length - pos);
        for (var i = 0; i < arrdate.length; i++) {
            addSlider(_i, _arr, _axisObj, new Date(arrdate[i]), arrcolor[i]);
        }
    }

    objdef.zbox = new _i.ZAxis(_axisObj.axisleft, _axisObj.axisBaseLine + 50 + (boxline + boxheight) * _arr.length, 26, 14, objdef.color);
    objdef.ztext = new _i.ZText(objdef.text, _axisObj.axisleft + 30, _axisObj.axisBaseLine + 62 + (boxline + boxheight) * _arr.length, 12);

    _i.addCom(objdef.zslider);
    _i.addCom(objdef.zbox);
    _i.addCom(objdef.ztext);

    _arr.push(objdef);

}

function removeCom(_i, _arr, _axisObj, _obj) {

}