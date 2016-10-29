require('list.js');

export default function () {
  var options = {
    item: '<div class="item-block"><div class="image"></div><div class="name"></div><div class="price"></div></div>',
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
  var blocklist = new List('tab-items', options, source);
  //source = [];
  return {blocklist: blocklist};
}
