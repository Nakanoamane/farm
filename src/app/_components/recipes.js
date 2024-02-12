'use client';

import Style from '../../styles/modules/kitchen.module.scss';

import _ from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { itemsState, logsState, ingredientsState, dishState } from '../../lib/state';
import { recipeItems, ingNumbers, existIngredient } from '../../lib/kitchen';
import { itemOptions, updateItems } from '../../lib/items';
import { newItemLogs } from '../../lib/logs';

export default function Recipes(){
	const [items, setItems] = useRecoilState(itemsState);
	const [logs, setLogs] = useRecoilState(logsState);
	const [ingredients, setIngredients] = useRecoilState(ingredientsState);
	const dish = useRecoilValue(dishState);

	const onClickRecipe = (item) => {
		let recipe = _.cloneDeep(itemOptions[item].recipe);

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

	const recipes = recipeItems;
	const recipeEls = recipes.map(i => {
		const itemOption = itemOptions[i];
		const item = items[i];
		const unlocked = item && item.totalNum >= 1;
		const id = `recipe_${i}`;
		const ingNums = ingNumbers(itemOption.recipe, ingredients);
		const able = itemOption.recipe.every(ing => existIngredient(ingNums[ing], items[ing]));

		const icons = itemOption.recipe.map((ing, index) => {
			const item = items[ing];
			const className = item && item.totalNum >= 1 ? ing : 'secret';
			const statusClassName = existIngredient(ingNums[ing], item) ? '' : Style['is-disabled'];
			return <i key={index} className={`${Style[`icon-${className}`]} ${statusClassName}`}></i>;
		});

		return (
			<li key={i} className={Style.recipe}>
				<div className={Style.recipeItem}>
					<input
						type="radio"
						name="recipes"
						id={id}
						className={`${Style.radio}`}
						defaultChecked={dish === i}
						disabled={!able}
						onClick={() => onClickRecipe(i)}
						/>
					<label htmlFor={id} className={unlocked ? Style[i] : Style.secret}>
						<span className={`${Style.itemName} ${Style['is-show']}`}>{ unlocked ? i : '???' }</span>
					</label>
				</div>

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