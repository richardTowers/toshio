import { Rx } from 'cycle-core';
import { h } from 'cycle-dom';
import { IModel } from '../model/model';

function view(state$: Rx.Observable<IModel>): Rx.Observable<VirtualDOM.VTree> {
	return state$.tap(console.log.bind(console)).map(model =>
		h('table', [
			h('tbody', model.board.map(row =>
				h('tr', row.map(cell =>
					h('td', {
						attributes: {
							'data-x': '' + cell.coord.x,
							'data-y': '' + cell.coord.y
						}
					}, cell.coord.x === model.activeCol ? 'Ø' : cell.state))
				))
			)
		])
	);
}
export default view;