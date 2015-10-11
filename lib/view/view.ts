import { h } from 'cycle-dom';

function view (state$) {
	return state$.map(x => h('div', [
			h('button.increment', '+1'),
			h('button.decrement', '-1'),
			h('p', String(x))
		])
	);
}
export default view;