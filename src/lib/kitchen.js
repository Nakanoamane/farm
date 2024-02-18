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

export const ingNumbers = (recipe, ingredients) => {
	const ingNums = {};
	recipe.forEach(ing => {
		if(ingNums[ing] === undefined) { ingNums[ing] = 0; }
		ingNums[ing] += 1;
	});
	ingredients.forEach(ing => {
		if(ingNums[ing] === undefined) { ingNums[ing] = 0; }
		ingNums[ing] -= 1;
	});
	return ingNums;
};

export const existIngredient = (ingNum, item) => {
	return item && item.num >= ingNum;
};

export const buildCookedDish = (cookedDish, dish, ings) => {
	let newItems = {};
	newItems[dish] = 1;
	ings.forEach(i => {
		if (newItems[i] === undefined) { newItems[i] = 0; }
		newItems[i] -= 1;
	});
	let newDish = _.cloneDeep(cookedDish);
	newDish.push(newItems);
	return newDish;
}