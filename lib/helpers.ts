export function times<T>(fn: (id?: number) => T, n: number) : T[] {
	const result = new Array(n);
	for (let i = 0; i < n; i++) {
		result[i] = fn(i);
	}
	return result;
}

export function flatten<T, U>(array: T[], fn: (item: T) => U[]): U[] {
	return array.reduce<U[]>((acc, item) => acc.concat(fn(item)), []);
}