/**
 * 定义常用错误
 * 
 */
function TypeError(_functionName) {
    return new Error("at: " + _functionName + "\n\t 参数类型不一致!");
}

/**
 *  通用JS库
 * 
 * 
 */

if (typeof zzz === 'undefined') var zzz = {};

zzz.lib = (function() {
    /**
     * 判断参数是不是一个对象
     */
    function isObject(value) {
        return (value !== null &&
            (typeof value === 'object' || typeof value === 'function'));
    }
    /**
     * 判断参数是不是一个对象，通过Object包装对象实现
     * @param {*} value 
     */
    function isObjectOfObj(value) {
        return value === Object(value);
    }
    /**
     * 判断参数是否是NaN
     * @param {*} value 
     */
    function isNaN(value) {
        return value !== value;
    }

    /**
     * 判断参数值是否存在
     * @param {*参数对象} value 
     */
    function isExist(value) {
        return typeof value !== 'undefined';
    }


    /**
     * 获取对象的自有属性，以数组返回
     */
    function getOwnPrototypeToArray(obj) {
        var arr = [];
        if (!isObject(obj)) return arr;

        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                arr.push(key);
            };
        }

        return arr;
    }

    /*把这个对象的属性从orig复制到copy*/
    function copyOwnPropertiesFrom(target, source) {
        Object.getOwnPropertyNames(source)
            .forEach(function(propKey) {
                var desc = Object.getOwnPropertyDescriptor(source, propKey);
                Object.defineProperty(target, propKey, desc);
            });
        return target;
    }

    /*复制对象*/
    function copyObject(orig) {
        if (!isObject(orig)) throw new Error('函数的参数必须是一个对象!');
        var copy = Object.create(Object.getPrototypeOf(orig));
        copyOwnPropertiesFrom(copy, orig);
        return copy;
    }

    /*
    列出对象所有属性，包括不可枚举的
    */
    function getAllPrototypeNames(obj) {
        if (!isObject(obj)) throw new Error("函数的参数必须是一个对象!");

        var arr = [];
        while (obj) {
            Array.prototype.push.apply(arr, Object.getOwnPropertyNames(obj));
            obj = Object.getPrototypeOf(obj);
        }

        return arr;
    }

    /**
     * 获取一个从lower到upper的随机整数
     * @param {*最小值} lower 
     * @param {*最大值} upper 
     */
    function getRandomInt(lower, upper) {
        if (arguments.length === 1) {
            upper = lower;
            lower = 0;
        }

        return Math.floor(Math.random() * (upper - lower)) + lower;
    }

    return {
        isExist: isExist,
        isObject: isObject,
        isObjectOfObj: isObjectOfObj,
        isNaN: isNaN,
        copyObject: copyObject,
        getRandomInt: getRandomInt,
        getOwnPrototypeToArray: getOwnPrototypeToArray,
        getAllPrototypeNames: getAllPrototypeNames
    }
})();

var TimeAxis = (function() {
    //alert(__window.document.baseURI);

    /**
     * 私有变量定义
     * 
     */
    var __SVGDomChilds = [];
    var __SVGDom = null;
    /**
     * 数据结构定义
     * 
     */
    function Point(_x, _y) {
        this.x;
        this.y;
        if (_x instanceof Point) {
            this.x = _x.x;
            this.y = _y.y;
        }
        this.x = _x || 0;
        this.y = _y || 0;
    }

    function ZItem(_x, _y) {

    }

    function ZSlider(_x, _y, _w, _h, _r) {
        this.SVGDom = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        this.baseLine = 110;
        this.baseX = _x || 0;
        this.baseY = this.baseLine || _y || 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.width = _w || 0;
        this.height = _h || 0;
        this.rat = _r || 0.0;
        this.isClick = false;

        this.SVGDom.setAttribute("points",
            this.baseX.toString() + "," + this.baseY.toString() + " " +
            (this.baseX + this.width / 2).toString() + "," + (this.baseY + this.height * this.rat).toString() + " " +
            (this.baseX + this.width / 2).toString() + "," + (this.baseY + this.height).toString() + " " +
            (this.baseX - this.width / 2).toString() + "," + (this.baseY + this.height).toString() + " " +
            (this.baseX - this.width / 2).toString() + "," + (this.baseY + this.height * this.rat).toString()
        );
        /*
                this.SVGDom.onmousedown = function(e) {
                    this.isClick = true;
                    var tmpslider = findSlider(this);
                    tmpslider.offsetX = e.offsetX; // - tmpslider.baseX;
                    if (typeof tmpslider.baseLine === 'undefined')
                        tmpslider.offsetY = e.offsetY; // - tmpslider.baseY;

                }
                this.SVGDom.onmouseup = function() {
                        this.isClick = false;
                    }
                    
                    this.SVGDom.onmousemove = function(e) {
                        if (this.isClick) { //
                            var tmpslider = findSlider(this);

                            tmpslider.baseX += (e.offsetX - tmpslider.offsetX);
                            if (typeof tmpslider.baseLine === 'undefined')
                                tmpslider.baseY += (e.offsetY - tmpslider.offsetY);

                            tmpslider.offsetX = e.offsetX; // - tmpslider.baseX;
                            if (typeof tmpslider.baseLine === 'undefined')
                                tmpslider.offsetY = e.offsetY; // - tmpslider.baseY;

                            if (tmpslider != null)
                                tmpslider.ReMoveAndReSize();

                        }
                    }*/

    }
    ZSlider.prototype = new ZItem();
    ZSlider.prototype.ReMoveAndReSize = function() {
        this.SVGDom.setAttribute("points",
            this.baseX.toString() + "," + this.baseY.toString() + " " +
            (this.baseX + this.width / 2).toString() + "," + (this.baseY + this.height * this.rat).toString() + " " +
            (this.baseX + this.width / 2).toString() + "," + (this.baseY + this.height).toString() + " " +
            (this.baseX - this.width / 2).toString() + "," + (this.baseY + this.height).toString() + " " +
            (this.baseX - this.width / 2).toString() + "," + (this.baseY + this.height * this.rat).toString()
        );
    }


    function ZAxis() {
        this.baseX = 100;
        this.baseY = 100;
        this.width = 400;
        this.height = 10;
        this.strokeWidth = 1;
        this.fill = "#777777";
        this.SVGDom = document.createElementNS("http://www.w3.org/2000/svg", "g");
        var mainDom = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        mainDom.setAttribute("x", this.baseX.toString());
        mainDom.setAttribute("y", this.baseY.toString());
        mainDom.setAttribute("width", this.width.toString());
        mainDom.setAttribute("height", this.height.toString());
        this.SVGDom.appendChild(mainDom);

        this.SVGDom.setAttribute("style",
            "stroke-width:1;fill:" + this.fill + ";opacity:0.9;");
    }
    ZAxis.prototype = new ZItem();

    function ZButton(_x, _y, _w, _h, _text) {
        this.SVGDom = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.baseX = _x || 0;
        this.baseY = _y || 0;
        this.width = _w || 0;
        this.height = _h || 0;
        this.fontSize = 16;
        var fontlen = this.fontSize * _text.length;
        var box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        box.setAttribute("x", this.baseX.toString());
        box.setAttribute("y", this.baseY.toString());
        box.setAttribute("width", this.width.toString());
        box.setAttribute("height", this.height.toString());
        box.setAttribute("style", "opacity:0.2");

        this.SVGDom.setAttribute("style", "stroke-width:1;fill:#eeeeee;stroke:#000000;");
        this.SVGDom.appendChild(new ZText(_text, _x + Math.floor((this.width - fontlen) / 2), _y + this.fontSize + Math.floor((_h - this.fontSize) / 2) - 2, this.fontSize, "blue").SVGDom);
        this.SVGDom.appendChild(box);
    }
    ZButton.prototype = new ZItem();

    function ZText(_text, _x, _y, _size, _color) {
        this.SVGDom = document.createElementNS("http://www.w3.org/2000/svg", "text");
        this.SVGDom.setAttribute("style", "font-family:Verdana;font-size:" + (_size.toString() || Number(10).toString()) +
            ";fill: " + (_color || "black") + ";stroke: none;");
        this.SVGDom.setAttribute("x", _x.toString() + "");
        this.SVGDom.setAttribute("y", _y.toString() + "");
        this.SVGDom.innerHTML = _text || "";
    }
    ZText.prototype = new ZItem();



    /**
     * 私有函数定义
     * 
     */
    function findSlider(obj) {
        if (!obj instanceof SVGPolygonElement)
            throw TypeError("findSlider");
        for (var i = 0; i < __SVGDomChilds.length; i++) {
            if (__SVGDomChilds[i].SVGDom === obj)
                return __SVGDomChilds[i];
        }
        return null;
    }

    function setAttr(_svgdom, key, value) {
        if (!_svgdom instanceof SVGElement)
            throw Error("设置属性的对象必须是一个SVG元素.");
        if (typeof key !== 'string' || typeof value !== 'string')
            throw Error("属性必须是字符串.");

    }

    /**
     * 接管DOM事件
     */
    function adapterEvent(e) {

        var timeAxisObj = e.currentTarget.TimeAxis;
        var actDom = [];

        for (var i = 0; i < timeAxisObj.ArrayDom.length; i++) {
            var isOn = false;
            if (timeAxisObj.ArrayDom[i] instanceof ZSlider) {
                isOn = isOnObj(timeAxisObj.ArrayDom[i], new Point(e.offsetX + timeAxisObj.ArrayDom[i].width / 2, e.offsetY));
            } else {
                isOn = isOnObj(timeAxisObj.ArrayDom[i], new Point(e.offsetX, e.offsetY));
            }

            if (isOn) {
                actDom.push(timeAxisObj.ArrayDom[i]);

            }
        }

        switch (e.type) {
            case "click":
                actDom.forEach(function(element) {
                    if (typeof element.onclick !== "undefined") element.onclick(e);
                }, this);
                break;
            case "mousedown":
                timeAxisObj.isClick = true;
                actDom.forEach(function(element) {
                    element.isClick = true;
                    element.offsetX = e.offsetX - 10 - element.baseX;
                    //if (typeof element.onmousedown !== "undefined") element.onmousedown(e);
                }, this);

                break;
            case "mouseup":
                timeAxisObj.isClick = false;
                timeAxisObj.ArrayDom.forEach(function(element) {
                    element.isClick = false;
                }, this);
                actDom.forEach(function(element) {
                    //if (typeof element.onmouseup !== "undefined") element.onmouseup(e);
                }, this);
                break;
            case "mousemove":
                timeAxisObj.ArrayDom.forEach(function(element) {
                    if (element.isClick)
                        element.baseX = e.offsetX - element.offsetX - 10;
                    if (element instanceof ZSlider) element.ReMoveAndReSize();
                }, this);
                actDom.forEach(function(element) {
                    //if (typeof element.onmousemove !== "undefined") element.onmousemove(e);

                }, this);
                break;
            case "mouseout":

                break;
            default:
                break;
        }
    }
    /**
     * 检测点是否在对象内
     */
    function isOnObj(_obj, _point) {
        if (!_obj instanceof ZItem) throw TypeError();
        if (!_point instanceof Point) throw TypeError();

        if (_point.x >= _obj.baseX && _point.x <= _obj.baseX + _obj.width &&
            _point.y >= _obj.baseY && _point.y <= _obj.baseY + _obj.height)
            return true;
        else return false;
    }

    function areaInit(_id) {
        if (typeof _id === 'undefined')
            __SVGDom = document.getElementById("TimeAxis");
        __SVGDom = document.getElementById(_id);
        zzz.lib.getAllPrototypeNames(__SVGDom).forEach(function(element) {
            if (element === "onselectstart") {
                __SVGDom[element] = function() {
                    return false;
                }
            }
            if (element.substring(0, 2) === "on")
                __SVGDom[element] = adapterEvent;
        }, this);

    }

    return function(id) {
        areaInit(id);
        this.ZAxis = ZAxis;
        this.ZButton = ZButton;
        this.ZItem = ZItem;
        this.ZSlider = ZSlider;
        this.ZText = ZText;
        this.SVGDom = __SVGDom;
        this.isClick = false;

        this.ArrayDom = __SVGDomChilds;

        this.SVGDom.TimeAxis = this;
    }

})();
TimeAxis.prototype = {
    display: function() {

    },
    addCom: function(_com) {
        if (typeof _com === "undefiend") throw TypeError();
        if (!_com instanceof this.ZItem) throw TypeError();

        this.ArrayDom.push(_com);
        this.SVGDom.appendChild(_com.SVGDom);
    }
}