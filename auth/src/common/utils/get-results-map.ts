export const getResultsMap = <T extends { id: number }>(results: T[]): Record<number, T> => {
	const map: Record<number, T> = {};

	for (const result of results) {
		map[result.id] = result;
	}

	return map;
};
