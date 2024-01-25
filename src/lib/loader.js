export const STORAGE_KEY = 'farm';

export const load = () => {
	let saveData = localStorage.getItem(STORAGE_KEY);
	if (saveData === null) { return null; }

	return JSON.parse(saveData);
}