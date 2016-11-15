
import Dragula from 'dragula';

export default function (name, source) {

var drake = Dragula($(".container").get(),{
  isContainer: function (el) {
    //can be dropped or pulled from any .dragula-container
    return el.classList.contains('container');
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

return drake;
}
