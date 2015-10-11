import { Rx } from 'cycle-core';
import { DOMInputDriver } from 'cycle-dom';
import { Coord } from '../model/model';

export interface Intent {
	clickCell$: Rx.Observable<Coord>
}

function intent(DOM: DOMInputDriver): Intent {
	return {
		clickCell$: DOM.select('td').events('click')
			.map(x => x.srcElement)
			.map(x => ({
				x: +x.getAttribute('data-x'),
				y: +x.getAttribute('data-y')
			}))
	};
}
export default intent;