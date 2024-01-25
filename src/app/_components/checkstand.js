'use client';

import Style from '../../styles/modules/shops.module.scss';

import _ from 'lodash';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  itemsState,
  selectedItemState,
  scoreState,
  logsState,
  moneyState,
  selectedShopState } from '../../lib/state';
import { products } from '../../lib/checkstand';
import { newItemLogs } from '../../lib/logs';
import { itemOptions, updateItems } from '../../lib/items';

export default function Checkstand(){
  const [items, setItems] = useRecoilState(itemsState);
  const selectedItem = useRecoilValue(selectedItemState);
  const [score, setScore] = useRecoilState(scoreState);
  const [logs, setLogs] = useRecoilState(logsState);
  const [money, setMoney] = useRecoilState(moneyState);
  const selectedShop = useRecoilValue(selectedShopState);

  const updateItemsAndLogs = (newItems) => {
    setItems(updateItems(items, newItems));

    const addLogs = newItemLogs(items, newItems);
		setLogs(addLogs.concat([...logs]));
  };

  const moneyToScore = (money) => {
    let score = Math.round(money / 10);
    if (score < 1) { score = 1; }
    return score;
  };

  const onClickSell = () => {
    const newItems = {};
    newItems[selectedItem] = -1;
    updateItemsAndLogs(newItems);
    setMoney(money + itemOptions[selectedItem].sell);
    setScore(score + moneyToScore(itemOptions[selectedItem].sell));
  };

  const onClickProduct = (product) => {
    const newItems = {};
    newItems[product] = 1;
    updateItemsAndLogs(newItems);
    setMoney(money - itemOptions[product].buy);
    setScore(score + moneyToScore(itemOptions[product].buy));
  };

  const productEls = () => {
    return products.map(product => {
      const itemOption = itemOptions[product];

      return(
        <li key={product} className={Style.product}>
          <button
            type="button"
            className={Style[product]}
            onClick={() => { onClickProduct(product); }}
            disabled={ money < itemOption.buy }
            ></button>
          <p className={ money < itemOption.buy ? `${Style.buyNum} ${Style['is-disabled']}` : Style.buyNum}>
            {itemOption.buy}
          </p>
        </li>
      );
    });
  }

  if(selectedShop !== 'grocer') { return null; }
  return(
    <div className={Style.grocerBalloon}>
      <div className={Style.checkstand}>
        <div className={Style.sell}>
          <button
            type="button"
            className={Style[selectedItem]}
            onClick={onClickSell}
            disabled={ itemOptions[selectedItem].sell === undefined || !items[selectedItem].num >= 1 }
            ></button>
          <p className={Style.sellNum}>{ itemOptions[selectedItem].sell === undefined ? '' : `+ ${itemOptions[selectedItem].sell}` }</p>
        </div>

        <div className={Style.wallet}>{money.toLocaleString()}</div>
      </div>

      <ul className={Style.shelf}>{productEls()}</ul>
    </div>
  );

}