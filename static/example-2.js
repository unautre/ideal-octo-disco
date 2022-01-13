/* © 2009 ROBO Design
 * http://www.robodesign.ro
 */

console.log("in js");
// Keep everything in anonymous function, called on window load.
if(window.addEventListener) {
    console.log("in if");
    window.addEventListener('load', function () {

        console.log("in load eventlistener");
      var canvas, context, tool;
    
      function init () {
        console.log("in init method");

        // Find the canvas element.
        canvas = document.getElementById('imageView');
        if (!canvas) {
          alert('Error: I cannot find the canvas element!');
          return;
        }
    
        if (!canvas.getContext) {
          alert('Error: no canvas.getContext!');
          return;
        }
    
        // Get the 2D canvas context.
        context = canvas.getContext('2d');
        if (!context) {
          alert('Error: failed to getContext!');
          return;
        }
    
        // Pencil tool instance.
        tool = new tool_pencil();
    
        // Attach the mousedown, mousemove and mouseup event listeners.
        canvas.addEventListener('mousedown', ev_canvas, false);
        canvas.addEventListener('mousemove', ev_canvas, false);
        canvas.addEventListener('mouseup',   ev_canvas, false);

        var bouton = document.getElementById("sendbutton");
        console.log("Found bouton: ", bouton);
        bouton.addEventListener("click", () => {
          canvas.toBlob(blob => {
            var fd = new FormData();
            fd.append("file", blob);

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/", true);
            xhr.send(fd);
          }, "image/png");
        }, false);

        var clearbouton = document.getElementById("clearbutton");
        clearbouton.addEventListener("click", () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
        }, false);
      }
    
      // This painting tool works like a drawing pencil which tracks the mouse 
      // movements.
      function tool_pencil () {
        var tool = this;
        this.started = false;
    
        // This is called when you start holding down the mouse button.
        // This starts the pencil drawing.
        this.mousedown = function (ev) {
            context.beginPath();
            context.moveTo(ev._x, ev._y);
            tool.started = true;
        };
    
        // This function is called every time you move the mouse. Obviously, it only 
        // draws if the tool.started state is set to true (when you are holding down 
        // the mouse button).
        this.mousemove = function (ev) {
          if (tool.started) {
            context.lineTo(ev._x, ev._y);
            context.stroke();
          }
        };
    
        // This is called when you release the mouse button.
        this.mouseup = function (ev) {
          if (tool.started) {
            tool.mousemove(ev);
            tool.started = false;
          }
        };
      }
    
      // The general-purpose event handler. This function just determines the mouse 
      // position relative to the canvas element.
      function ev_canvas (ev) {
        if (ev.layerX || ev.layerX == 0) { // Firefox
          ev._x = ev.layerX;
          ev._y = ev.layerY;
        } else if (ev.offsetX || ev.offsetX == 0) { // Opera
          ev._x = ev.offsetX;
          ev._y = ev.offsetY;
        }
    
        // Call the event handler of the tool.
        var func = tool[ev.type];
        if (func) {
          func(ev);
        }
      }

      function send_canvas() {
          canvas.toBlob(blob => {
            var fd = new FormData();
            fd.append("file", blob);

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/", true);
            xhr.send(fd);
          }, "image/png");
      }
    
      init();
    
    }, false); }
    
    // vim:set spell spl=en fo=wan1croql tw=80 ts=2 sw=2 sts=2 sta et ai cin fenc=utf-8 ff=unix:
    