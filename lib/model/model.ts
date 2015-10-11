import Cycle from 'cycle-core';

function model(actions) {
	return Cycle.Rx.Observable.merge(
			actions.clickIncrement$,
			actions.clickDecrement$
		)
		.startWith(0)
		.scan((x, y) => x + y);
}
export default model;