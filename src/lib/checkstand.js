import { itemOptions } from './items';

export const products = Object.keys(itemOptions).filter(item => {
		return itemOptions[item].buy !== undefined;
});
