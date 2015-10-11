import { Rx } from 'cycle-core';
import { Intent } from '../intent/intent';

function model(actions: Intent): Rx.Observable<number> {
	return Rx.Observable.merge(
			actions.clickIncrement$,
			actions.clickDecrement$
		)
		.startWith(0)
		.scan<number>((x, y) => x + y);
}
export default model;