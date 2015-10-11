/// <reference path="typings/rx/rx.d.ts" />
/// <reference path="typings/virtual-dom/virtual-dom.d.ts" />

declare module "cycle-core" {
	
	export import Rx = require('rx');

	export interface DriversDefinition {
		[driverName: string]: Function
	}

	export interface DefinitionFunction<I, O> {
		(drivers: I): O
	}

	export function run<I, O>(app: DefinitionFunction<I, O>, drivers: DriversDefinition): [I, O];
}

declare module "cycle-dom" {

	export import h = require('virtual-dom/h');

	interface Selection {
		events: (eventName: string) => Rx.Observable<CustomEvent>
	}

	export interface DOMInputDriver {
		select: (selector: string) => Selection
	}

	export interface DOMOutputDriver extends Rx.Observable<VirtualDOM.VTree> {

	}

	interface DOMDriverFunction {
		(vtree$: Rx.Observable<any>, driverName: string): any
	}

	export function makeDOMDriver(container: string | Element, customElements?: any): DOMDriverFunction;

}