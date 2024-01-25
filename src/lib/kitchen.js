import { itemOptions } from './items';

export const recipeItems = Object.keys(itemOptions).filter(item => itemOptions[item].recipe !== undefined);