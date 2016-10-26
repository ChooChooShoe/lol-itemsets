
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack';

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

export var itemjson = appDir.read('data/item.json', 'json');
//console.log('JSON dump:', itemjson);

export default function () {
    return this;
}
