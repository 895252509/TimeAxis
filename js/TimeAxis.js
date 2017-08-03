

/**
 * 定义常用错误
 * 
 */
function TypeError(_functionName){
    return new Error("at: "+_functionName + "\n\t 参数类型不一致!");
}

var TimeAxis= (function (){
    //alert(__window.document.baseURI);

/*  
    function _SVGObj(id,svgdom){
        this.id =id ||"";
        this.svgdom = svgdom ;
    }
    _SVGObj.prototype={
        equal : function(other){
            if(other instanceof _SVGObj){
                other.
            }
        }
    }
    var a = new _SVGObj();

*/
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
        this.baseX = _x || 0;
        this.baseY = _y || 0;
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
            tmpslider.offsetY = e.offsetY;// - tmpslider.baseY;
            
        }
        this.SVGDom.onmouseup = function(){
            this.isClick = false;
        }
        this.SVGDom.onmousemove = function (e){
            if(this.isClick){//debugger;
                var tmpslider = findSlider(this);

                tmpslider.baseX += (e.offsetX - tmpslider.offsetX);
                tmpslider.baseY += (e.offsetY - tmpslider.offsetY);

                tmpslider.offsetX = e.offsetX;// - tmpslider.baseX;
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
            else
                return null;
        }
    }
    function setAttr(_svgdom,key,value){
        if(! _svgdom instanceof SVGElement)
            throw Error("设置属性的对象必须是一个SVG元素.");
        if(typeof key !== 'string' || typeof value !== 'string')
            throw Error("属性必须是字符串.");

    }

    function _polygonReMoveAndReSize(obj){
        if(! obj instanceof SVGPolygonElement)
            throw TypeError("_polygonReMoveAndReSize");
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
        __SVGDom.appendChild(new ZSlider(10,10,20,20,0.5).SVGDom);
    
    }

})();
TimeAxis.prototype = {
    display:function(){

    }
}







