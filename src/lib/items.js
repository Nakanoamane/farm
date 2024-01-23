import Style from '../styles/modules/home.module.scss';
import _ from 'lodash';

export const itemsDefault = {
  hand: {
    className: Style.hand,
    type: 'tool'
  },
  hoe: {
    className: Style.hoe,
    type: 'tool'
  },
  sickle: {
    className: Style.sickle,
    type: 'tool'
  },
  wheat: {
    className: Style.wheat,
    type: 'crop',
    num: 5,
    totalNum: 5,
    buy: 20,
    sell: 1
  },
  poultry: {
    className: Style.poultry,
    type: 'livestock',
    num: 3,
    totalNum: 3,
    buy: 100,
    sell: 3
  },
  cow: {
    className: Style.cow,
    type: 'livestock',
    num: 3,
    totalNum: 3,
    buy: 100,
    sell: 3
  },
  flour: {
    className: Style.flour,
    type: 'food',
    num: 0,
    sell: 5,
  },
  milk: {
    className: Style.milk,
    type: 'food',
    num: 0,
    sell: 5,
  },
  egg: {
    className: Style.egg,
    type: 'food',
    num: 0,
    sell: 5,
  },
  chicken: {
    className: Style.chicken,
    type: 'food',
    num: 0,
    sell: 10,
  },
  beaf: {
    className: Style.beaf,
    type: 'food',
    num: 0,
    sell: 10,
  },
  bread: {
    className: Style.bread,
    type: 'food',
    num: 0,
    recipe: [ 'flour', 'flour', 'flour' ],
    sell: 30,
  },
  pancake: {
    className: Style.pancake,
    type: 'food',
    num: 0,
    recipe: [ 'flour', 'egg', 'milk' ],
    sell: 50,
  },
  roastChicken: {
    className: Style.roastChicken,
    type: 'food',
    num: 0,
    recipe: [ 'chicken' ],
    sell: 30,
  },
  cheese: {
    className: Style.cheese,
    type: 'food',
    num: 0,
    recipe: [ 'milk', 'milk', 'milk' ],
    sell: 30,
  },
  butter: {
    className: Style.butter,
    type: 'food',
    num: 0,
    recipe: [ 'milk', 'milk' ],
    sell: 20,
  },
  steak: {
    className: Style.steak,
    type: 'food',
    num: 0,
    recipe: [ 'beaf' ],
    sell: 30,
  },
};

export const updateItems = (prevItems, updateItems) => {
  let newItems = _.cloneDeep(prevItems);
  Object.keys(updateItems).forEach(item => {
    if(newItems[item].num !== undefined) {
      newItems[item].num += updateItems[item];
    }
    if(updateItems[item] < 0) {
      if (newItems[item].usedNum === undefined) { newItems[item].usedNum = 0; }
      newItems[item].usedNum += (updateItems[item] * (-1));
    } else {
      if (newItems[item].totalNum === undefined) { newItems[item].totalNum = 0; }
      newItems[item].totalNum += updateItems[item];
    }
  });
  return newItems;
};