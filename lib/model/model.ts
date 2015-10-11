import { Rx } from 'cycle-core';
import { Intent } from '../intent/intent';
import { times } from '../helpers';

export type Coord = { x: number, y: number };
export interface ICell { coord: Coord, state: string };
export type IBoard = ICell[][];

function updateBoard (board: IBoard, cell: Coord) {
	const toggle = state => state === 'O' ? 'X' : 'O';
	const createBoard = fn => times(x => times(y => fn({ x, y }), 16), 16);
	return createBoard(coord => {
		const cellWasClicked = cell && cell.x === coord.x && cell.y === coord.y;
		const prevState = board ? board[coord.x][coord.y].state : 'O';
		const state = cellWasClicked ? toggle(prevState) : prevState;
		return { coord, state };
	});
}

function model(actions: Intent): Rx.Observable<IBoard> {
	return actions.clickCell$.startWith(null).scan<IBoard>(updateBoard, null);
}

export default model;
