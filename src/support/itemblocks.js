
//This module handles everything in the #tab-items.
//For: ItemBlocks,title,
import Sortable  from 'sortablejs';

export default function (name, source) {
  if (name === undefined)
    name = "Unnamed Itemset";

  if (source === undefined)
    source = [{ title: 'Block 1', id: 1 }];

  var options = {
    item: '<li class="card card-block"><h4 class="card-title title"></h4></li>',
    valueNames: [
      'title',
      { data: ['id'] }
    ]
  };
  var sortableSettngs = {
    sort: true,
    group: {
      name: 'advanced',
      pull: true,
      put: true
    },
    animation: 150,

        // Element is chosen
        onChoose: function (/**Event*/evt) {
            console.log("onChoose");
            console.log(evt);
            evt.oldIndex;  // element index within parent
        },

        // Element dragging started
        onStart: function (/**Event*/evt) {
            console.log("onStart");
            console.log(evt);
            evt.oldIndex;  // element index within parent
        },

        // Element dragging ended
        onEnd: function (/**Event*/evt) {
            console.log("onEnd");
            console.log(evt);
            evt.oldIndex;  // element's old index within parent
            evt.newIndex;  // element's new index within parent
        },

        // Element is dropped into the list from another list
        onAdd: function (/**Event*/evt) {
            console.log("onAdd");
            console.log(evt);
            var itemEl = evt.item;  // dragged HTMLElement
            evt.from;  // previous list
            // + indexes from onEnd
        },

        // Changed sorting within list
        onUpdate: function (/**Event*/evt) {
            console.log("onUpdate");
            console.log(evt);
            var itemEl = evt.item;  // dragged HTMLElement
            // + indexes from onEnd
        },

        // Called by any change to the list (add / update / remove)
        onSort: function (/**Event*/evt) {
            console.log("onSort");
            console.log(evt);
            // same properties as onUpdate
        },

        // Element is removed from the list into another list
        onRemove: function (/**Event*/evt) {
            console.log("onRemove");
            console.log(evt);
            // same properties as onUpdate
        },

        // Attempt to drag a filtered element
        onFilter: function (/**Event*/evt) {
            console.log("onFilter");
            console.log(evt);
            var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
        },

        // Event when you move an item in the list or between lists
        onMove: function (/**Event*/evt, /**Event*/originalEvent) {
            console.log("onMove");
            console.log(evt);
            // Example: http://jsbin.com/tuyafe/1/edit?js,output
            evt.dragged; // dragged HTMLElement
            evt.draggedRect; // TextRectangle {left, top, right и bottom}
            evt.related; // HTMLElement on which have guided
            evt.relatedRect; // TextRectangle
            //originalEvent.clientY; // mouse position
            // return false; — for cancel
        },

        // Called when creating a clone of element
        onClone: function (/**Event*/evt) {
            console.log("onClone");
            console.log(evt);
            var origEl = evt.item;
            var cloneEl = evt.clone;
        }
  };

  var list = new List('tab-items', options, source);

  //adds drag support to all existing items
  for (var i in list.items){
    Sortable.create(list.items[i].elm, sortableSettngs);
  }

  var add_block = function(t, i) {
    //adds block to the list with drag support.
    list.add([{ title: t, id: i }], function(items) {
      for(var i in items)
      {
        Sortable.create(items[i].elm, sortableSettngs);
      }
    });
  };

  var rem_block = function(){
    console.log("Remove Block");

  };
  var set_title = function(title){
    $('.card-title').html = title;
  }
  set_title(name);

  //source = [];
  return {
    listjs: list,
    addBlock: add_block,
    removeBlock: rem_block,
    setTitle: set_title
  };

}
