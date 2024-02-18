'use client';

import Style from '../../styles/modules/kitchen.module.scss';

import _ from 'lodash';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  itemsState,
  selectedItemState,
  logsState,
  scoreState,
  selectedShopState,
  ingredientsState,
  dishState,
  cookedDishState,
  recordsState } from '../../lib/state';
import Recipes from './recipes';
import ItemCounts from './item_counts';
import { itemOptions, updateItems } from '../../lib/items';
import { newItemLogs } from '../../lib/logs';
import { recipeItems, searchDish, buildCookedDish } from '../../lib/kitchen';
import Image from 'next/image';
import { imagePath } from '../../lib/image';
import { countUpRecords } from '../../lib/records';

export default function Kitchen(){
  const [items, setItems] = useRecoilState(itemsState);
  const selectedItem = useRecoilValue(selectedItemState);
  const [score, setScore] = useRecoilState(scoreState);
  const [logs, setLogs] = useRecoilState(logsState);
  const selectedShop = useRecoilValue(selectedShopState);
  const [ingredients, setIngredients] = useRecoilState(ingredientsState);
  const [dish, setDish] = useRecoilState(dishState);
  const [cookedDish, setCookedDish] = useRecoilState(cookedDishState);
  const [records, setRecords] = useRecoilState(recordsState);

  useEffect(() => {
    searchAndSetDish();
  }, [ingredients]);

  useEffect(() => {
    refreshPot();
    setCookedDish([]);
  }, [selectedShop]);

  const searchAndSetDish = () => {
    const ings = _.cloneDeep(ingredients).sort();
    const recipes = recipeItems;
    const item = searchDish(ings, recipes);
    setDish(item);
  };

  const refreshPot = () => {
    let newItems = {};
		ingredients.forEach(i => {
			if (newItems[i] === undefined) { newItems[i] = 0; }
			newItems[i] += 1;
		});

    setItems(updateItems(items, newItems));

    const addLogs = newItemLogs(items, newItems);
		setLogs(addLogs.concat([...logs]));

		setIngredients([]);
  };

  const dishClassName = () => {
    let className = dish === '' ? Style.dish : Style.secret;
    if (dish !== '' && items[dish] && items[dish].totalNum >= 1) {
      className = Style[dish];
    }
    return className;
  };

  const dishLabel = () => {
    let label = '';
    if (dish !== '') {
      label = items[dish] && items[dish].totalNum >= 1 ? dish : '???';
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

    setCookedDish(buildCookedDish(cookedDish, dish, ingredients));

    setScore(score + (itemOptions[dish].recipe.length * 2));
    updateItemsAndLogs(newItems);
    setIngredients(newIngs);
    setRecords(countUpRecords(records, 'cook', 1));
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

  const itemCountEls = cookedDish.map((itemNums, index) => {
    return <ItemCounts itemNums={itemNums} style={Style} key={index} />;
  });

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

  const cursorClassName = (className) => {
    let classNames = [className, Style[`cursor-${selectedItem}`]];
    if (itemOptions[selectedItem].type !== 'food' || !items[selectedItem].num) {
      classNames.push(Style['is-disabled']);
    }
    return classNames.join(' ');
  };

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

          {itemCountEls}
        </div>
      </div>

      <div className={Style.stove}>
        <div className={cursorClassName(Style.pot)}>
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
            className={cursorClassName(Style.ingredient)}
            onClick={onClickAddBtn}
            disabled={itemOptions[selectedItem].type !== 'food' || items[selectedItem].num < 1 || ingredients.length >= 5}
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