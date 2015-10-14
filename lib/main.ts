/// <reference path="../typings.d.ts" />

import { Rx, run, DriversDefinition } from 'cycle-core';
import { makeDOMDriver, DOMInputDriver, DOMOutputDriver } from 'cycle-dom';

import model from './model/model';
import view from './view/view';
import intent from './intent/intent';
import makeAudioGraphDriver from 'virtualAudioGraphDriver';

import { INodeParameter } from 'virtual-audio-graph';

interface InputDrivers {
	DOM: DOMInputDriver
}
export interface OutputDrivers {
	DOM: DOMOutputDriver,
	audioGraph: Rx.Observable<INodeParameter[]>
}

function main(drivers: InputDrivers): OutputDrivers {
	return view(model(intent(drivers.DOM)));
}

run<InputDrivers, OutputDrivers>(
	main, {
		DOM: makeDOMDriver('#app'),
		audioGraph: makeAudioGraphDriver()
	});
