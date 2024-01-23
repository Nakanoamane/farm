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
    totalNum: 5
  },
  poultry: {
    className: Style.poultry,
    type: 'livestock',
    num: 3,
    totalNum: 3
  },
  cow: {
    className: Style.cow,
    type: 'livestock',
    num: 3,
    totalNum: 3
  },
  flour: {
    className: Style.flour,
    type: 'food',
    num: 0
  },
  milk: {
    className: Style.milk,
    type: 'food',
    num: 0
  },
  egg: {
    className: Style.egg,
    type: 'food',
    'num': 0
  },
  chicken: {
    className: Style.chicken,
    type: 'food',
    num: 0
  },
  beaf: {
    className: Style.beaf,
    type: 'food',
    num: 0
  },
  bread: {
    className: Style.bread,
    type: 'food',
    num: 0,
    recipe: [ 'flour', 'flour', 'flour' ]
  },
  pancake: {
    className: Style.pancake,
    type: 'food',
    num: 0,
    recipe: [ 'flour', 'egg', 'milk' ]
  },
  roastChicken: {
    className: Style.roastChicken,
    type: 'food',
    num: 0,
    recipe: [ 'chicken' ]
  },
  cheese: {
    className: Style.cheese,
    type: 'food',
    num: 0,
    recipe: [ 'milk', 'milk', 'milk' ]
  },
  butter: {
    className: Style.butter,
    type: 'food',
    num: 0,
    recipe: [ 'milk', 'milk' ]
  },
  steak: {
    className: Style.steak,
    type: 'food',
    num: 0,
    recipe: [ 'beaf' ]
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