function intent (DOM) {
	return {
		clickIncrement$: DOM.select('.increment').events('click').map(() => 1),
		clickDecrement$: DOM.select('.decrement').events('click').map(() => -1)
	};
}
export default intent;