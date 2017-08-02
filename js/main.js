var TimeAxis= (function (){
    //alert(__window.document.baseURI);



return function (id){
    this.aa = 1;    
}

})();
TimeAxis.prototype = {
    display:function(){

    }
}


debugger;

var a = new TimeAxis();
a.aa;

    window.onload = function(){
        var obj = document.getElementById("c1");
        obj.onclick= function(){
            alert("click TimeAxisArea");
        }
    }

