import 'pixi';

import model from './model/model';
import view from './view/view';
import intent from './intent/intent';

function main ({DOM}) {
	return { DOM: view(model(intent(DOM))) };
}
main(document.body);
