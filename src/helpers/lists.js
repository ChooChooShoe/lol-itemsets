require('list.js');
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack';

export default function () {
var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

var itemjson = appDir.read('data/item.json', 'json');

  var options = {
    item: '<div class="item-source"><div class="image"></div><div class="name"></div><div class="price"></div></div>',
    valueNames: [
      'price',
      'name',
      { data: ['id'] },
      { name: 'image', attr: 'style' }
    ]
  };

  var source = [];
  for(var i in itemjson.data ){
    source.push({
      price: itemjson.data[i].gold.total,
      name: itemjson.data[i].name,
      id: i,
      image: "background: url('img/sprite/"
      + itemjson.data[i].image.sprite + "') "+ -itemjson.data[i].image.x +"px " + -itemjson.data[i].image.y + "px;"
      + " width: "+itemjson.data[i].image.w + "px; height: "+ itemjson.data[i].image.h+"px;"
    });
  }
  //source = [];
  return new List('item-list', options, source);
}
