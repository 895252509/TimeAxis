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
    function setAttr(_svgdom,key,value){
        if(! _svgdom instanceof SVGElement)
            throw Error("设置属性的对象必须是一个SVG元素.");
        if(typeof key !== 'string' || typeof value !== 'string')
            throw Error("属性必须是字符串.");

    }
    function createSlider(_x,_y){
        var ix,iy;  //滑块指示点的坐标
        var iw = 10,ih = 20;  //滑块的宽和高
        var irat = 0.5;   //滑块上下两部分所占的比例 [0 - 1]
        var islider = document.createElementNS("http://www.w3.org/2000/svg","polygon");
        
        if( _x instanceof Point){
            ix = _x.x;
            iy = _x.y;
        }else {
            ix = _x || 0;
            iy = _y || 0;
        }
        
        islider.setAttribute("points",
            ix.toString()+","+iy.toString()+" "+
            (ix+iw/2).toString()+","+(iy+ih*irat).toString()+" "+
            (ix+iw/2).toString()+","+(iy+ih).toString()+" "+
            (ix-iw/2).toString()+","+(iy+ih).toString()+" "+
            (ix-iw/2).toString()+","+(iy+ih*irat).toString()
        );

        

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
        __SVGDom.appendChild(createSlider(new Point(10,20)));
    
    }

})();
TimeAxis.prototype = {
    display:function(){

    }
}







