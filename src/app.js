// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import { greet } from './hello_world/hello_world'; // code authored by you in this project
import env from './env';
import Handlebars from 'handlebars';

console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
console.log('The author of this app is:', appDir.read('package.json', 'json').author);


document.addEventListener('DOMContentLoaded', function () {
    var itemsets = document.getElementById('itemset-ul');
    for (var i=0;i<100;i++){
      var li = document.createElement("li");
      li.innerHTML=("<a href=\"#\" class=\"media-body\">List item "+i+"</a>");
      li.setAttribute("class", "list-group-item");
      itemsets.appendChild(li);
    }

    //console.log(document.getElementById("template-iconview").outerHTML);
    var itemList = document.getElementById("item-list");
    var source   = document.getElementById("template-iconview").innerHTML;
    var template = Handlebars.compile(source);
    var html = itemList.innerHTML;
    for (var i =0; i < 150; i++){
      var context = {img: "ggg", count: "2", price: ""+i};
      html = html.concat(template(context));
    }
    itemList.innerHTML = html;
});





// target elements with the "draggable" class
interact('.draggable').draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "none",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(event.dx * event.dx +
                     event.dy * event.dy)|0) + 'px');
    }
});

function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

// enable draggables to be dropped into this
interact('.dropzone-iconview').dropzone({
  // only accept elements matching this CSS selector
  accept: '.item-iconview',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.50,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active');
  },
  ondragenter: function (event) {
    // feedback the possibility of a drop
    event.target.classList.add('drop-target');//dropzoneElement
    event.relatedTarget.classList.add('can-drop');//draggableElement
    //draggableElement.textContent = 'Dragged in';
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target');
    event.relatedTarget.classList.remove('can-drop');
    //event.relatedTarget.textContent = 'Dragged out';
  },
  ondrop: function (event) {
    console.log(event);
    //event.relatedTarget.textContent = 'Dropped';
    event.target.appendChild(event.relatedTarget);

    event.relatedTarget.style.transform = 'translate(0px, 0px)';

    // update the posiion attributes
    event.relatedTarget.setAttribute('data-x', 0);
    event.relatedTarget.setAttribute('data-y', 0);

    event.relatedTarget.classList.remove('can-drop');
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
  }
});
