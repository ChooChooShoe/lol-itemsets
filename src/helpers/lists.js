require('list.js');
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack';

export default function () {
var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

var itemjson = appDir.read('data/item.json', 'json');

  var options = {
    item: '<div class="item-source"><img class="image"><span class="name"></span><span class="price"></span></div>',
    valueNames: [
      'price',
      'name',
      { data: ['id'] },
      { name: 'image', attr: 'src' }
    ]
  };

  var source = [];
  for(var i in itemjson.data ){
    source.push({
      price: itemjson.data[i].gold.total,
      name: itemjson.data[i].name,
      id: i,
      image: 'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+itemjson.data[i].image.full
    });
  }
  //source = [];
  return new List('item-list', options, source);
}
