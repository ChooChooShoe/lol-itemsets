require('list.js');
export default function (source) {
  if (source === undefined)
    source = [];

  var options = {
    item: '<li class="card card-block"><h4 class="card-title title">no title</h4></li>',
    valueNames: [
      'title',
      { data: ['id'] }
    ]
  };

  //var d = itemjson.data;
  for(var i =0; i < 2; i++ ){
    source.push({
      title:'Block ' + (i+1),
      id: i
    });
  }
  //source = [];
  return new List('tab-items', options, source);

}
