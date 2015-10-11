import { Rx } from 'cycle-core';
import { h } from 'cycle-dom';

function view(state$: Rx.Observable<number>): Rx.Observable<VirtualDOM.VTree> {
	return state$.map(x => h('div', [
			h('button.increment', '+1'),
			h('button.decrement', '-1'),
			h('p', String(x))
		])
	);
}
export default view;