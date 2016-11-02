
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
    animation: 150
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
