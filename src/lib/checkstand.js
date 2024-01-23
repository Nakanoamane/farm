export const products = (items) => {
	return Object.keys(items).filter(item => {
		return items[item].buy !== undefined;
	});
}