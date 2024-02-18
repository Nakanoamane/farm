'use client';

import Style from '../../styles/modules/checkstand.module.scss';

import _ from 'lodash';
import ItemCounts from './item_counts';
import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  itemsState,
  selectedItemState,
  scoreState,
  logsState,
  moneyState,
  selectedShopState,
  recordsState,
  selledItemsState,
  boughtItemsState } from '../../lib/state';
import { products, buildSelledItems, buildBoughtItems } from '../../lib/checkstand';
import { newItemLogs } from '../../lib/logs';
import { itemOptions, updateItems } from '../../lib/items';
import { countUpRecords } from '../../lib/records';

export default function Checkstand(){
  const [items, setItems] = useRecoilState(itemsState);
  const selectedItem = useRecoilValue(selectedItemState);
  const [score, setScore] = useRecoilState(scoreState);
  const [logs, setLogs] = useRecoilState(logsState);
  const [money, setMoney] = useRecoilState(moneyState);
  const selectedShop = useRecoilValue(selectedShopState);
  const [records, setRecords] = useRecoilState(recordsState);
  const [selledItems, setSelledItems] = useRecoilState(selledItemsState);
  const [boughtItems, setBoughtItems] = useRecoilState(boughtItemsState);

  useEffect(() => {
    setSelledItems([]);
    setBoughtItems({});
  }, [selectedShop]);

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
    setSelledItems(buildSelledItems(selledItems, newItems));

    const sell = itemOptions[selectedItem].sell;
    setMoney(money + sell);
    setScore(score + moneyToScore(sell));

    let newRecords = countUpRecords(records, 'sell', 1);
    newRecords = countUpRecords(newRecords, 'income', sell);
    setRecords(newRecords);
  };

  const onClickProduct = (product) => {
    const newItems = {};
    newItems[product] = 1;
    updateItemsAndLogs(newItems);
    setBoughtItems(buildBoughtItems(boughtItems, product, newItems));

    const buy = itemOptions[product].buy;
    setMoney(money - buy);
    setScore(score + moneyToScore(buy));

    let newRecords = countUpRecords(records, 'buy', 1);
    newRecords = countUpRecords(newRecords, 'expense', buy);
    setRecords(newRecords);
  };

  const selledCountEls = selledItems.map((itemNums, index) => {
    return <ItemCounts itemNums={itemNums} style={Style} key={index} />;
  });

  const productEls = () => {
    return products.map(product => {
      const itemOption = itemOptions[product];
      let boughtCountEls = null;
      if(boughtItems[product] !== undefined){
        boughtCountEls = boughtItems[product].map((itemNums, index) => {
          return <ItemCounts itemNums={itemNums} style={Style} key={index} />;
        });
      }

      return(
        <li key={product} className={Style.product}>
          <button
            type="button"
            className={Style[product]}
            onClick={() => { onClickProduct(product); }}
            disabled={ money < itemOption.buy }
            >
            <span className={Style.itemName}>{ product }</span>
          </button>
          <p className={ money < itemOption.buy ? `${Style.buyNum} ${Style['is-disabled']}` : Style.buyNum}>
            {itemOption.buy}
          </p>
          {boughtCountEls}
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
            >
            <span className={`${Style.itemName} ${Style['is-show']}`}>{ selectedItem }</span>
          </button>
          <p className={Style.sellNum}>{ itemOptions[selectedItem].sell === undefined ? '' : `+ ${itemOptions[selectedItem].sell}` }</p>
          {selledCountEls}
        </div>

        <div className={Style.wallet}>{money.toLocaleString()}</div>
      </div>

      <div className={Style.shelf}>
        <ul className={Style.products}>{productEls()}</ul>
      </div>
    </div>
  );

}