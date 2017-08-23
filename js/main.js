//debugger;

window.onload = function() {
    var obj = document.getElementById("TimeAxisArea");
    obj.onclick = function() {

    }

    var i = new TimeAxis("TimeAxisArea");

    var text = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    text.setAttribute("r", "20");
    text.setAttribute("cx", "20");
    text.setAttribute("cy", "20");

    //    obj.appendChild(text);

    text.setAttribute("fill", "blue");

    //i.addCom(new i.ZButton(0, 0, 80, 30, "创建滑块"));
    //i.addCom(new i.ZAxis());

    var slider1 = new i.ZSlider(10, 0, 20, 20, 0.5);
    slider1.onclick = function(e) {
        console.log(e.type);
    }

    slider1.onmousemove = function(e) {
        console.log(e.type);
    }

    slider1.onmouseup = function(e) {
        console.log(e.type);
    }

    i.addCom(slider1);
}