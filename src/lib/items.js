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
  sugarcane: {
    type: 'crop',
    buy: 70,
    sell: 1
  },
  carrotSeed: {
    type: 'crop',
    buy: 100,
    sell: 2
  },
  seedPotato: {
    type: 'crop',
    buy: 100,
    sell: 2
  },
  tomatoSeed: {
    type: 'crop',
    buy: 100,
    sell: 2
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
  pig: {
    type: 'livestock',
    buy: 100,
    sell: 3
  },
  flour: {
    type: 'food',
    sell: 5,
  },
  sugar: {
    type: 'food',
    sell: 10,
  },
  carrot: {
    type: 'food',
    sell: 10,
  },
  potato: {
    type: 'food',
    sell: 10,
  },
  tomato: {
    type: 'food',
    sell: 10,
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
  pork: {
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
  cookie: {
    type: 'food',
    recipe: [ 'flour', 'sugar', 'butter' ],
    sell: 60,
  },
  cupcake: {
    type: 'food',
    recipe: [ 'flour', 'sugar', 'egg', 'milk' ],
    sell: 70,
  },
  pudding: {
    type: 'food',
    recipe: [ 'sugar', 'egg', 'milk' ],
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
  carrotJuice: {
    type: 'food',
    recipe: [ 'carrot' ],
    sell: 30,
  },
  frenchFries: {
    type: 'food',
    recipe: [ 'potato' ],
    sell: 30,
  },
  stew: {
    type: 'food',
    recipe: [ 'potato', 'carrot', 'beaf' ],
    sell: 80,
  },
  pasta: {
    type: 'food',
    recipe: [ 'flour', 'tomato' ],
    sell: 40,
  },
  pizza: {
    type: 'food',
    recipe: [ 'flour', 'tomato', 'cheese' ],
    sell: 100,
  },
  omelette: {
    type: 'food',
    recipe: [ 'egg', 'tomato' ],
    sell: 50,
  },
  ham: {
    type: 'food',
    recipe: [ 'pork' ],
    sell: 40,
  },
  hotdog: {
    type: 'food',
    recipe: [ 'bread', 'pork' ],
    sell: 60,
  },
  baconEgg: {
    type: 'food',
    recipe: [ 'bread', 'egg', 'pork' ],
    sell: 100,
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