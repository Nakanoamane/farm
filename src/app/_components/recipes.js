'use client';

import Style from '../../styles/modules/shops.module.scss';

import _ from 'lodash';
import { useRecoilState } from 'recoil';
import { itemsState, logsState, ingredientsState } from '../../lib/state';
import { recipeItems } from '../../lib/kitchen';
import { updateItems } from '../../lib/items';
import { newItemLogs } from '../../lib/logs';

export default function Recipes(){
	const [items, setItems] = useRecoilState(itemsState);
	const [logs, setLogs] = useRecoilState(logsState);
	const [ingredients, setIngredients] = useRecoilState(ingredientsState);

	const onClickRecipe = (item) => {
		let recipe = _.cloneDeep(items[item].recipe);

		let newIngs = [];
		let newItems = {};
		ingredients.forEach(i => {
			if (newItems[i] === undefined) { newItems[i] = 0; }
			newItems[i] += 1;
		});
		recipe.forEach((r) => {
			if (newItems[r] === undefined) { newItems[r] = 0; }
			if (items[r].num > newItems[r]*(-1)) {
				newItems[r] -= 1;
				newIngs.push(r);
			}
		});
		setItems(updateItems(items, newItems));

    const addLogs = newItemLogs(items, newItems);
		setLogs(addLogs.concat([...logs]));

		setIngredients(newIngs);
	};

	const recipes = recipeItems(items);
	const recipeEls = recipes.map(i => {
		const item = items[i];
		const unlocked = item.totalNum >= 1;

		const icons = item.recipe.map((ingredient, index) => {
			const i = items[ingredient];
			const className = i.totalNum >= 1 ? ingredient : 'secret';
			return <i key={index} className={Style[`icon-${className}`]}></i>;
		});

		const ingNums = {};
		item.recipe.forEach(ingredient => {
			if(ingNums[ingredient] === undefined) { ingNums[ingredient] = 0; }
			ingNums[ingredient] += 1;
		});
		ingredients.forEach(ingredient => {
			if(ingNums[ingredient] === undefined) { ingNums[ingredient] = 0; }
			ingNums[ingredient] -= 1;
		});

		const able = item.recipe.every(ingredient => items[ingredient].num >= ingNums[ingredient]);

		return (
			<li key={i} className={Style.recipe}>
				<button
					type="button"
					className={`${Style.recipeBtn} ${unlocked ? Style[i] : Style.secret}`}
					disabled={!able}
					onClick={() => onClickRecipe(i)}
					>
					<span className={Style.itemName}>{ unlocked ? i : '???' }</span>
				</button>

				<div className={Style.ingredients}>
					{icons}
				</div>
			</li>
		);
	});

	return (
		<ul className={Style.recipes}>
			{recipeEls}
		</ul>
	);
}