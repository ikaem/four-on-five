export type ModelCreateAttributes<T extends { id: string | number }> = {
	id: T['id'];
};
