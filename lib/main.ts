/// <reference path="../typings.d.ts" />

import { run, DriversDefinition } from 'cycle-core';
import { makeDOMDriver, DOMInputDriver, DOMOutputDriver } from 'cycle-dom';

import model from './model/model';
import view from './view/view';
import intent from './intent/intent';

interface InputDrivers {
	DOM: DOMInputDriver
}
interface OutputDrivers {
	DOM: DOMOutputDriver
}

function main(drivers: InputDrivers): OutputDrivers {
	return {
		DOM: view(model(intent(drivers.DOM)))
	};
}

run<InputDrivers, OutputDrivers>(main, { DOM: makeDOMDriver('#app') });
