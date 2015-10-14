import createVirtualAudioGraph, { INodeParameter } from 'virtual-audio-graph';

function makeAudioGraphDriver() {
	const audioContext = new AudioContext();
	const virtualAudioGraph = createVirtualAudioGraph({ audioContext, output: audioContext.destination });

	return audioGraphDriver;

	function audioGraphDriver(nodeParams$: Rx.Observable<INodeParameter[]>, driverName: string): Rx.Observable<{}> {
		nodeParams$.subscribe(nodeParams => virtualAudioGraph.update(nodeParams));
		return Rx.Observable.empty();
	}
}
export default makeAudioGraphDriver;