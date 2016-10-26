// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import { greet } from './hello_world/hello_world'; // code authored by you in this project
import InteractSupport from './helpers/interact_support';
import RiotItem from './helpers/riot_item';
import ListsHelper from './helpers/lists';
import dragula from 'dragula';
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
    var boots = RiotItem(1001);
    dragula([document.querySelector('#item-source-ul'),document.querySelector('#right')]);
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
