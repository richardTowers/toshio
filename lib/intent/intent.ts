import { Rx } from 'cycle-core';
import { DOMInputDriver } from 'cycle-dom';
import { Coord } from '../model/model';
import { beatsPerMin } from '../settings';

const msPerMin = 60 * 1000;
const msPerBeat = msPerMin / beatsPerMin;

export interface Intent {
	clickCell$: Rx.Observable<Coord>,
	time$: Rx.Observable<{}>
}

function intent(DOM: DOMInputDriver): Intent {
	return {
		clickCell$: DOM.select('td').events('click')
			.map(x => x.srcElement)
			.map(x => ({
				x: +x.getAttribute('data-x'),
				y: +x.getAttribute('data-y')
			})),
		time$: Rx.Observable.create(o => setInterval(o.onNext.bind(o), msPerBeat))
	};
}
export default intent;