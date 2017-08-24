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

    var btn = new i.ZButton(0, 0, 80, 30, "创建滑块");
    btn.onclick = function() {
        i.addCom(new i.ZSlider(150, 0, 20, 20, 0.5));
    }
    i.addCom(btn);
    i.addCom(new i.ZAxis());

    var slider1 = new i.ZSlider(150, 0, 20, 20, 0.5);
    i.addCom(slider1);
}