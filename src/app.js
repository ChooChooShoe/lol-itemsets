// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm

import ItemblockSupport from './support/itemblocks';
import RiotItem from './helpers/riot_item';
import Sortable  from 'sortablejs';
import ListsHelper from './helpers/lists';
import env from './env';
window.$ = window.jQuery = require('jquery');
//import Handlebars from 'handlebars';

console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
console.log('The author of this app is:', appDir.read('package.json', 'json').author);

//window.dragMoveListener = InteractSupport();

document.addEventListener('DOMContentLoaded', function () {
    var itemlist = ListsHelper();
    var itemblocks = ItemblockSupport();
    itemblocks.addBlock("ASFF", 76);

    var boots = RiotItem(1001);

        		Sortable.create(document.getElementById('item-source-ul'), {
        			sort: false,
        			group: {
            		name: 'advanced',
            		pull: 'clone',
            		put: true
            	},
        			animation: 150
        		});

      $("add-block").click(function(){
          console.log("The paragraph was clicked.");
      });

    //DragulaSupport();
    /*dragula([document.querySelector('#item-source-ul')],{
      isContainer: function (el) {
        //can be dropped or pulled from any .dragula-container
        return el.classList.contains('dragula-container');
      },
      copy: function (el, source) {
        //only copy from source list
        return source === $('#item-source-ul')[0]
      },
      accepts: function (el, target) {
        //no dropping in the source list
        return target !== $('#item-source-ul')[0]
      },
      removeOnSpill: true
    });

    $('#right-tab a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    })


      function dragMoveListener (event) {
        var target = event.target;

        // translate the element
        target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      }*/



    /*var itemsets = document.getElementById('itemset-ul');
    for (var i=0;i<1;i++){
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
    for (var i =0; i < 0; i++){
      var context = {img: "ggg", count: "2", price: ""+i};
      html = html.concat(template(context));
    }
    itemList.innerHTML = html;*/
});
