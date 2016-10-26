// This helper is for interact.js

export default function (name, options) {
  var commonRestriction = { restriction: ".content", endOnly: true, elementRect: { top: 0, left: 0, bottom: 1, right: 1 } };

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

  // target elements with the "draggable" class
  interact('.item2').draggable({
      // enable inertial throwing
      inertia: false,
      // keep the element within the area of it's parent
      restrict: commonRestriction,
      // enable autoScroll
      autoScroll: true,
      // call this function on every dragmove event
      onmove: dragMoveListener
  });
  // target elements with the "draggable" class
  interact('.item-source').draggable({
      inertia: false,
      restrict: commonRestriction,
      autoScroll: false,
      onstart: function (event){
        var clone = $('<div class="draggable drag-drop item-iconview item">' + event.target.innerHTML+ '</div>');
        //clone.style.position= 'absolute';
        //clone.style.margin = 0;
        //console.log($('#dragbox'));
        $('#dragbox').append(clone);
      },
      onmove: function (event) {
        $('#dragbox').css({'transform':'translate(' + event.pageX + 'px, ' + event.pageY + 'px)'});
      },
      onend: function (event) {
        $("#dragbox").empty();
      }
  });



  // .dropzone-item is a dropzone for any .item
  interact('.dropzone.itemholder').dropzone({
    accept: '.item-source',
    overlap: 'pointer',
    ondropactivate: function (event) {
      event.target.classList.add('drop-active');
    },
    ondragenter: function (event) {
      event.target.classList.add('drop-target');
      event.relatedTarget.classList.add('can-drop');
    },
    ondragleave: function (event) {
      event.target.classList.remove('drop-target');
      event.target.classList.remove('dropped');
      event.relatedTarget.classList.remove('can-drop');
    },
    ondrop: function (event) {
      event.target.classList.add('dropped');
      event.target.appendChild($('#dragbox').children()[0]);
      event.relatedTarget.classList.remove('can-drop');
    },
    ondropdeactivate: function (event) {
      event.target.classList.remove('drop-active');
      event.target.classList.remove('drop-target');
    }
  });
  return dragMoveListener;
}
