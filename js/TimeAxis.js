

/**
 * 定义常用错误
 * 
 */
function TypeError(_functionName){
    return new Error("at: "+_functionName + "\n\t 参数类型不一致!");
}

var TimeAxis= (function (){
    //alert(__window.document.baseURI);


/**
 * 数据结构定义
 * 
 */
    function Point(_x,_y){
        this.x;
        this.y;
        if(_x instanceof Point){
            this.x = _x.x;
            this.y = _y.y;
        }
        this.x = _x || 0;
        this.y = _y || 0;
    }

    function ZSlider(_x,_y,_w,_h,_r){
        this.SVGDom = document.createElementNS("http://www.w3.org/2000/svg","polygon");
        this.baseLine = 110;
        this.baseX = _x || 0;
        this.baseY = this.baseLine || _y || 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.width = _w || 0;
        this.height = _h || 0;
        this.rat = _r || 0.0;
        this.isClick = false;
        
        
        __SVGDomChilds.push(this);

        this.SVGDom.setAttribute("points",
            this.baseX.toString()+","+this.baseY.toString()+" "+
            (this.baseX+this.width/2).toString()+","+(this.baseY+this.height*this.rat).toString()+" "+
            (this.baseX+this.width/2).toString()+","+(this.baseY+this.height).toString()+" "+
            (this.baseX-this.width/2).toString()+","+(this.baseY+this.height).toString()+" "+
            (this.baseX-this.width/2).toString()+","+(this.baseY+this.height*this.rat).toString()
        );

        this.SVGDom.onmousedown = function (e){
            this.isClick = true;
            var tmpslider = findSlider(this);
            tmpslider.offsetX = e.offsetX;// - tmpslider.baseX;
            if(typeof tmpslider.baseLine === 'undefined')
                tmpslider.offsetY = e.offsetY;// - tmpslider.baseY;
            
        }
        this.SVGDom.onmouseup = function(){
            this.isClick = false;
        }
        this.SVGDom.onmousemove = function (e){
            if(this.isClick){//debugger;
                var tmpslider = findSlider(this);

                tmpslider.baseX += (e.offsetX - tmpslider.offsetX);
                if(typeof tmpslider.baseLine === 'undefined')
                    tmpslider.baseY += (e.offsetY - tmpslider.offsetY);

                tmpslider.offsetX = e.offsetX;// - tmpslider.baseX;
                if(typeof tmpslider.baseLine === 'undefined')
                    tmpslider.offsetY = e.offsetY;// - tmpslider.baseY;

                if( tmpslider!= null )
                    tmpslider.ReMoveAndReSize();

            }
        }

    }
    ZSlider.prototype.ReMoveAndReSize= function (){
        this.SVGDom.setAttribute("points",
            this.baseX.toString()+","+this.baseY.toString()+" "+
            (this.baseX+this.width/2).toString()+","+(this.baseY+this.height*this.rat).toString()+" "+
            (this.baseX+this.width/2).toString()+","+(this.baseY+this.height).toString()+" "+
            (this.baseX-this.width/2).toString()+","+(this.baseY+this.height).toString()+" "+
            (this.baseX-this.width/2).toString()+","+(this.baseY+this.height*this.rat).toString()
        );
    }


    function ZAxis(){
        this.baseX = 100;
        this.baseY = 100;
        this.width = 400;
        this.height = 10;
        this.strokeWidth = 1;
        this.fill = "#777777";
        this.SVGDom = document.createElementNS("http://www.w3.org/2000/svg","g");
        var mainDom = document.createElementNS("http://www.w3.org/2000/svg","rect");
        mainDom.setAttribute("x",this.baseX.toString());
        mainDom.setAttribute("y",this.baseY.toString());
        mainDom.setAttribute("width",this.width.toString());
        mainDom.setAttribute("height",this.height.toString());
        this.SVGDom.appendChild(mainDom);

        this.SVGDom.setAttribute("style",
            "stroke-width:1;fill:"+this.fill+";opacity:0.9;");
    }

    function ZButton(_x,_y,_w,_h){
        this.SVGDom = document.createElementNS("http://www.w3.org/2000/svg","g");
        this.baseX = _x || 0;
        this.baseY = _y || 0;
        this.width = _w || 0;
        this.height = _h || 0;

        var box = document.createElementNS("http://www.w3.org/2000/svg","rect");
        box.setAttribute("x",this.baseX.toString());
        box.setAttribute("y",this.baseY.toString());
        box.setAttribute("width",this.width.toString());
        box.setAttribute("height",this.height.toString());
        box.setAttribute("style","opacity:0.2");

        var text = document.createElementNS("http://www.w3.org/2000/svg","text");
        text.setAttribute("style","font-family:Verdana;font-size:16");
        text.setAttribute("x", this.baseX.toString()+"");
        text.setAttribute("y", (this.baseY+20).toString()+"");
        text.innerHTML = "创建滑块";

        this.SVGDom.setAttribute("style","stroke-width:1;fill:#eeeeee;stroke:#000000;");
        this.SVGDom.appendChild(text);
        this.SVGDom.appendChild(box);

        box.onclick = function (){  debugger;
            __SVGDom.appendChild(new ZSlider(150,110,20,20,0.5).SVGDom);
        }
    }

/**
 * 私有变量定义
 * 
 */
    var __SVGDomChilds = [];
    var __SVGDom = null;

/**
 * 私有函数定义
 * 
 */
    function findSlider(obj){
        if(! obj instanceof SVGPolygonElement)
            throw TypeError("findSlider");
        for(var i=0;i<__SVGDomChilds.length;i++){
            if(__SVGDomChilds[i].SVGDom === obj)
                return __SVGDomChilds[i];
        }
        return null;
    }
    function setAttr(_svgdom,key,value){
        if(! _svgdom instanceof SVGElement)
            throw Error("设置属性的对象必须是一个SVG元素.");
        if(typeof key !== 'string' || typeof value !== 'string')
            throw Error("属性必须是字符串.");

    }


    function createSlider(_x,_y){debugger;
        var ix,iy;              //滑块指示点的坐标
        var iw = 10,ih = 20;    //滑块的宽和高
        var irat = 0.5;         //滑块上下两部分所占的比例 [0 - 1]
        var islider = document.createElementNS("http://www.w3.org/2000/svg","polygon");
        
        if( _x instanceof Point){
            ix = _x.x;
            iy = _x.y;
        }else {
            ix = _x || 0;
            iy = _y || 0;
        }

        islider.z_baseX = ix;
        islider.z_baseY = iy;
        
        islider.setAttribute("points",
            islider.z_baseX.toString()+","+islider.z_baseY.toString()+" "+
            (islider.z_baseX+iw/2).toString()+","+(islider.z_baseY+ih*irat).toString()+" "+
            (islider.z_baseX+iw/2).toString()+","+(islider.z_baseY+ih).toString()+" "+
            (islider.z_baseX-iw/2).toString()+","+(islider.z_baseY+ih).toString()+" "+
            (islider.z_baseX-iw/2).toString()+","+(islider.z_baseY+ih*irat).toString()
        );
        islider.isClick = false;
        
        islider.onmousedown = function (){
            islider.isClick = true;
        }
        islider.onmouseup = function(){
            islider.isClick = false;
        }
        islider.onmousemove = function (){
            if(islider.isClick){

            }
        }

        return islider;
    }

    function areaInit(_id){
        if(typeof _id === 'undefined')
            __SVGDom = document.getElementById("TimeAxis");
        __SVGDom = document.getElementById( _id );

    }

    return function (id){debugger;
        this.aa = 1;  
        areaInit(id);
        __SVGDom.appendChild(new ZSlider(150,110,20,20,0.5).SVGDom);
        __SVGDom.appendChild(new ZAxis().SVGDom);
        __SVGDom.appendChild(new ZButton(10,10,70,30).SVGDom);
    }

})();
TimeAxis.prototype = {
    display:function(){

    }
}







