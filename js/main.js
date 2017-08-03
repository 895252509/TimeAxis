

//debugger;

window.onload = function(){
    var obj = document.getElementById("TimeAxisArea");
    obj.onclick= function(){

    }

    var i = new TimeAxis("TimeAxisArea");

    var text = document.createElementNS("http://www.w3.org/2000/svg","circle");
    text.setAttribute("r","20");
    text.setAttribute("cx","20");
    text.setAttribute("cy","20");

    //obj.appendChild(text);

    text.setAttribute("fill","blue");
}

