API proposal
------------

	const op = output();
	op.attach(
		gain(0.2).attach([
			sineOscillator(261.6),
			sineOscillator(329.63).attachTo(op)
		])
	);