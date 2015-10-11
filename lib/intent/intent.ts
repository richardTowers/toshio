import { Rx } from 'cycle-core';
import { DOMInputDriver } from 'cycle-dom';

export interface Intent {
	clickIncrement$: Rx.Observable<number>;
	clickDecrement$: Rx.Observable<number>;
}

function intent(DOM: DOMInputDriver): Intent {
	return {
		clickIncrement$: DOM.select('.increment').events('click').map(() => 1),
		clickDecrement$: DOM.select('.decrement').events('click').map(() => -1)
	};
}
export default intent;