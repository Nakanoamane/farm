export const recipeItems = (items) => {
	return Object.keys(items).filter(item => items[item].recipe !== undefined);
};