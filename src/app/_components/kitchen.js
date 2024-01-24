'use client';

import Style from '../../styles/modules/shops.module.scss';

import _, { set } from 'lodash';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  itemsState,
  selectedItemState,
  logsState,
  scoreState,
  selectedShopState,
  ingredientsState,
  dishState } from '../../lib/state';
import Recipes from './recipes';
import { updateItems } from '../../lib/items';
import { newItemLogs } from '../../lib/logs';
import { recipeItems } from '../../lib/kitchen';
import Image from 'next/image';
import { imagePath } from '../../lib/image';

export default function Kitchen(){
  const [items, setItems] = useRecoilState(itemsState);
  const selectedItem = useRecoilValue(selectedItemState);
  const [score, setScore] = useRecoilState(scoreState);
  const [logs, setLogs] = useRecoilState(logsState);
  const selectedShop = useRecoilValue(selectedShopState);
  const [ingredients, setIngredients] = useRecoilState(ingredientsState);
  const [dish, setDish] = useRecoilState(dishState);

  useEffect(() => {
    searchAndSetDish();
  }, [ingredients]);

  const searchAndSetDish = () => {
    const ings = _.cloneDeep(ingredients).sort();
    const recipes = recipeItems(items);
    let item = '';
    recipes.forEach(i => {
      const recipe = _.cloneDeep(items[i].recipe).sort();
      const matchRecipe = recipe.every((r, index) => r === ings[index]);
      const matchIngs = ings.every((ing, index) => ing === recipe[index]);
      if (matchRecipe && matchIngs) { item = i; }
    });
    setDish(item);
  };

  const dishClassName = () => {
    let className = dish === '' ? Style.dish : Style.secret;
    if (dish !== '' && items[dish].totalNum >= 1) {
      className = Style[dish];
    }
    return className;
  };

  const dishLabel = () => {
    let label = '';
    if (dish !== '') {
      label = items[dish].totalNum >= 1 ? dish : '???';
    }
    return label;
  };

  const onClickDish = () => {
    let newItems = {};
    newItems[dish] = 1;

    let newIngs = [];
    ingredients.forEach((ni) => {
      if (newItems[ni] === undefined) { newItems[ni] = 0; }
			if (items[ni].num > newItems[ni]*(-1)) {
				newItems[ni] -= 1;
        newIngs.push(ni);
			}
		});

    setScore(score + (items[dish].recipe.length * 2));
    updateItemsAndLogs(newItems);
    setIngredients(newIngs);
  };

  const onClickIngredient = (index) => {
    let newItems = {};
    newItems[ingredients[index]] = 1;
    updateItemsAndLogs(newItems);

    const newIngs = _.cloneDeep(ingredients);
    newIngs.splice(index, 1)
    setIngredients(newIngs);
  };

  const onClickAddBtn = () => {
    let newItems = {};
    newItems[selectedItem] = -1;
    updateItemsAndLogs(newItems);

    const newIngs = _.cloneDeep(ingredients);
    newIngs.push(selectedItem);
    setIngredients(newIngs);
  }

  const updateItemsAndLogs = (newItems) => {
    setItems(updateItems(items, newItems));

    const addLogs = newItemLogs(items, newItems);
		setLogs(addLogs.concat([...logs]));
  };


  const ingEls = ingredients.map((ingredient, index) => {
    return (
      <button
        type="button"
        className={Style.ingredient}
        key={index}
        onClick={() => onClickIngredient(index)}
        >
        <i className={Style[`icon-${ingredient}`]}></i>
      </button>
      );
  });

  if(selectedShop !== 'restaurant') { return null; }
  return(
    <div className={Style.restaurantBalloon}>
      <div className={Style.table}>
        <div className={Style.plate}>
          <button
            type="button"
            className={dishClassName()}
            disabled={dish === ''}
            onClick={onClickDish}
            >
              <span className={Style.itemName}>{dishLabel()}</span>
            </button>
        </div>
      </div>

      <div className={Style.stove}>
        <div className={Style.pot}>
        <Image
          src={imagePath('images/shops/pot1.webp')}
          className={Style.imageA}
          width={580}
          height={533}
          alt="pot"
          />
        <Image
          src={imagePath('images/shops/pot2.webp')}
          className={Style.imageB}
          width={580}
          height={533}
          alt="pot"
          />

          {ingEls}

          <button
            type="button"
            className={Style.ingredient}
            onClick={onClickAddBtn}
            disabled={items[selectedItem].type !== 'food' || items[selectedItem].num < 1 || ingredients.length >= 5}
            >
            <i className={Style.plus}></i>
          </button>
        </div>
      </div>

      <div className={Style.desk}>
        <Recipes />
      </div>
    </div>
  );

}