require('list.js');
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack';

export default function () {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };

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
  var d = itemjson.data;
  for(var i in d ){
    source.push({
      price: d[i].gold.total,
      name: d[i].name,
      id: i,
      image: "background: url('img/sprite/{0}') {1}px {2}px; width: {3}px; height: {4}px;".format(
        d[i].image.sprite, -d[i].image.x, -d[i].image.y, d[i].image.w, d[i].image.h)
    });
  }
  //source = [];
  return new List('item-list', options, source);

}
