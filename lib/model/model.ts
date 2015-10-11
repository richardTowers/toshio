import { Rx } from 'cycle-core';
import { Intent } from '../intent/intent';
import { times } from '../helpers';

export type Coord = { x: number, y: number };
export interface ICell { coord: Coord, state: string };
export type IBoard = ICell[][];

function updateBoard (board: IBoard, cell: Coord): IBoard {
	const toggle = (state: string) => state === 'O' ? 'X' : 'O';
	const createCell = (coord: Coord) => {
		const cellWasClicked: boolean = cell && cell.x === coord.x && cell.y === coord.y;
		const prevState: string = board ? board[coord.x][coord.y].state : 'O';
		const state: string = cellWasClicked ? toggle(prevState) : prevState;
		return { coord, state };
	};
	return times(x => times(y => createCell({ x, y }), 16), 16);
}

function model(actions: Intent): Rx.Observable<IBoard> {
	return actions.clickCell$.startWith(null).scan<IBoard>(updateBoard, null);
}

export default model;
