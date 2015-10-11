import Cycle from 'cycle-core';
import { makeDOMDriver } from 'cycle-dom';

import model from './model/model';
import view from './view/view';
import intent from './intent/intent';

function main ({DOM}) {
	return { DOM: view(model(intent(DOM))) };
}

Cycle.run(main, { DOM: makeDOMDriver('#app') });
