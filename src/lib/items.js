import _ from 'lodash';

export const itemOptions = {
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
    buy: 20,
    sell: 1
  },
  poultry: {
    type: 'livestock',
    buy: 100,
    sell: 3
  },
  cow: {
    type: 'livestock',
    buy: 100,
    sell: 3
  },
  flour: {
    type: 'food',
    sell: 5,
  },
  milk: {
    type: 'food',
    sell: 5,
  },
  egg: {
    type: 'food',
    sell: 5,
  },
  chicken: {
    type: 'food',
    sell: 10,
  },
  beaf: {
    type: 'food',
    sell: 10,
  },
  bread: {
    type: 'food',
    recipe: [ 'flour', 'flour', 'flour' ],
    sell: 30,
  },
  pancake: {
    type: 'food',
    recipe: [ 'flour', 'egg', 'milk' ],
    sell: 50,
  },
  roastChicken: {
    type: 'food',
    recipe: [ 'chicken' ],
    sell: 30,
  },
  cheese: {
    type: 'food',
    recipe: [ 'milk', 'milk', 'milk' ],
    sell: 30,
  },
  butter: {
    type: 'food',
    recipe: [ 'milk', 'milk' ],
    sell: 20,
  },
  steak: {
    type: 'food',
    recipe: [ 'beaf' ],
    sell: 30,
  },
};

export const itemsDefault = {
  hand: {},
  hoe: {},
  sickle: {},
  wheat: {
    num: 5,
    totalNum: 5,
  },
  poultry: {
    num: 3,
    totalNum: 3,
  },
  cow: {
    num: 3,
    totalNum: 3,
  },
  flour: {
    num: 0,
  },
  milk: {
    num: 0,
  },
  egg: {
    num: 0,
  },
  chicken: {
    num: 0,
  },
  beaf: {
    num: 0,
  },
};

export const updateItems = (prevItems, updateItems) => {
  let newItems = _.cloneDeep(prevItems);
  Object.keys(updateItems).forEach(item => {
    if (newItems[item] === undefined) { newItems[item] = {}; }

    if(itemOptions[item].type !== 'tool') {
      if (newItems[item].num === undefined) { newItems[item].num = 0; }
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
  return sortItems(newItems);
};

const sortItems = (items) => {
  let newItems = {};
  let secretItems = {};
  Object.keys(itemOptions).forEach((key) => {
    if (items[key]) {
      if (itemOptions[key].type === 'tool' || items[key].totalNum >= 1) {
        newItems[key] = items[key];
      } else {
        secretItems[key] = items[key];
      }
    }
  });

  return {...newItems, ...secretItems};
};