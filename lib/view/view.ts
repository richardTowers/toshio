import { Rx } from 'cycle-core';
import { h } from 'cycle-dom';
import { IModel, ICell } from '../model/model';
import { flatten } from '../helpers';
import { OutputDrivers } from '../main';
import { INodeParameter } from 'virtual-audio-graph';

// TODO: proper scales with proper notes.
const notes = [
	261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392, 415.3,
	440, 466.16, 493.88, 523.25, 554.37, 587.33, 622.25, 659.26
];

function view(state$: Rx.Observable<IModel>): OutputDrivers {
	const DOM = state$.map(model =>
		h('table', [
			h('tbody', model.board.map(row =>
				h('tr', row.map(cell =>
					h('td', {
						attributes: {
							'data-x': '' + cell.coord.x,
							'data-y': '' + cell.coord.y
						}
					},
					(cell.state === 'O' && cell.coord.x === model.activeCol) ? 'Ø' : cell.state))
				))
			)
		])
	);
	
	const defaultNodeParams: INodeParameter[] = [['gain', 'output', { gain: 0.2 }]];
	
	const isActiveCell = (model: IModel) => (cell: ICell) =>
		cell.state === 'X' && cell.coord.x === model.activeCol;

	const createOscillator = (cell: ICell): INodeParameter =>
		['oscillator', 0, { type: 'sine', frequency: notes[(16 - cell.coord.y)] }];

	const audioGraph = state$.map<INodeParameter[]>(model =>
		defaultNodeParams.concat(flatten(model.board, row => row.filter(isActiveCell(model)).map(createOscillator)))
	);

	return { DOM, audioGraph };
}
export default view;