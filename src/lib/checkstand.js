import { itemOptions } from './items';

export const products = Object.keys(itemOptions).filter(item => {
		return itemOptions[item].buy !== undefined;
});

export const buildSelledItems = (selledItems, newItems) => {
	let newSelledItems = _.cloneDeep(selledItems);
	newSelledItems.push(newItems);
	return newSelledItems;
};

export const buildBoughtItems = (boughtItems, item, newItems) => {
	let newBoughtItems = _.cloneDeep(boughtItems);
	if (newBoughtItems[item] === undefined) { newBoughtItems[item] = []; }
	newBoughtItems[item].push(newItems);
	return newBoughtItems;
};