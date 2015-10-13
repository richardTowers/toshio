import { Rx } from 'cycle-core';
import { Intent } from '../intent/intent';
import { times } from '../helpers';

export type Coord = { x: number, y: number };
export interface ICell { coord: Coord, state: string };
export type IBoard = ICell[][];
export interface IModel { board: IBoard, activeCol: number };

function updateBoard (board: IBoard, cell: Coord): IBoard {
	const toggle = (state: string) => state === 'O' ? 'X' : 'O';
	const createCell = (coord: Coord) => {
		const cellWasClicked: boolean = cell && cell.x === coord.x && cell.y === coord.y;
		const prevState: string = board ? board[coord.y][coord.x].state : 'O';
		const state: string = cellWasClicked ? toggle(prevState) : prevState;
		return { coord, state };
	};
	return times(y => times(x => createCell({ x, y }), 16), 16);
}

function model(actions: Intent): Rx.Observable<IModel> {
	const board$ = actions.clickCell$.startWith(null).scan<IBoard>(updateBoard, null);
	const activeCol$ = actions.time$.scan(acc=> (acc + 1) % 16, -1)

	return board$.combineLatest<number, IModel>(activeCol$,
		(board, activeCol) => ({ board, activeCol })
	);
}

export default model;
