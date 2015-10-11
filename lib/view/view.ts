import { Rx } from 'cycle-core';
import { h } from 'cycle-dom';
import { IBoard } from '../model/model';

function view(state$: Rx.Observable<IBoard>): Rx.Observable<VirtualDOM.VTree> {
	return state$.map(board =>
		h('table', [
			h('tbody', board.map(row =>
				h('tr', row.map(cell =>
					h('td', {
						attributes: {
							'data-x': '' + cell.coord.x,
							'data-y': '' + cell.coord.y
						}
					}, cell.state))
				))
			)
		])
	);
}
export default view;