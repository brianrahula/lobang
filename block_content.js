document.getElementById("input_userName").addEventListener("click mousedown mouseup focus blur keydown change dblclick mousemove mouseover mouseout mousewheel keydown keyup keypress textInput touchstart touchmove touchend touchcancel resize scroll zoom select change submit reset", function(e)  {     console.log(e); console.log("pler");
});

setTimeout(()=> {
    document.getElementById("btnSettings").click();
},500);


setTimeout(() => {

    // input.value = "Test";  
    // input.select();
    // input.blur();


    // input.

    document.getElementsByClassName("btnClose")[0].click();
},550);


document.getElementsByClassName("playlist")[0].classList.add("tab_visible");
