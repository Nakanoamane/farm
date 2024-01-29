import { itemOptions } from './items';

export const recipeItems = Object.keys(itemOptions).filter(item => itemOptions[item].recipe !== undefined);

export const searchDish = (ingredients, recipes) => {
	let item = '';
	recipes.forEach(i => {
		const recipe = _.cloneDeep(itemOptions[i].recipe).sort();
		const matchRecipe = recipe.every((r, index) => r === ingredients[index]);
		const matchIngs = ingredients.every((ing, index) => ing === recipe[index]);
		if (matchRecipe && matchIngs) { item = i; }
	});
	return item;
};