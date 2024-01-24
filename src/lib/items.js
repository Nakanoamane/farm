import _ from 'lodash';

export const itemsDefault = {
  hand: {
    type: 'tool'
  },
  hoe: {
    type: 'tool'
  },
  sickle: {
    type: 'tool'
  },
  wheat: {
    type: 'crop',
    num: 5,
    totalNum: 5,
    buy: 20,
    sell: 1
  },
  poultry: {
    type: 'livestock',
    num: 3,
    totalNum: 3,
    buy: 100,
    sell: 3
  },
  cow: {
    type: 'livestock',
    num: 3,
    totalNum: 3,
    buy: 100,
    sell: 3
  },
  flour: {
    type: 'food',
    num: 0,
    sell: 5,
  },
  milk: {
    type: 'food',
    num: 0,
    sell: 5,
  },
  egg: {
    type: 'food',
    num: 0,
    sell: 5,
  },
  chicken: {
    type: 'food',
    num: 0,
    sell: 10,
  },
  beaf: {
    type: 'food',
    num: 0,
    sell: 10,
  },
  bread: {
    type: 'food',
    num: 0,
    recipe: [ 'flour', 'flour', 'flour' ],
    sell: 30,
  },
  pancake: {
    type: 'food',
    num: 0,
    recipe: [ 'flour', 'egg', 'milk' ],
    sell: 50,
  },
  roastChicken: {
    type: 'food',
    num: 0,
    recipe: [ 'chicken' ],
    sell: 30,
  },
  cheese: {
    type: 'food',
    num: 0,
    recipe: [ 'milk', 'milk', 'milk' ],
    sell: 30,
  },
  butter: {
    type: 'food',
    num: 0,
    recipe: [ 'milk', 'milk' ],
    sell: 20,
  },
  steak: {
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