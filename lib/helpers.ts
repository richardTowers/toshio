export function times<T>(fn: (id?: number) => T, n: number) : T[] {
	const result = new Array(n);
	for (let i = 0; i < n; i++) {
		result[i] = fn(i);
	}
	return result;
}