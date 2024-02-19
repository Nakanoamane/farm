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
  lettuceSeed: {
    type: 'crop',
    buy: 150,
    sell: 3
  },
  cornKernel: {
    type: 'crop',
    buy: 150,
    sell: 3
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
  bee: {
    type: 'livestock',
    buy: 200,
    sell: 5
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
  lettuce: {
    type: 'food',
    sell: 15,
  },
  corn: {
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
  honey: {
    type: 'food',
    sell: 15,
  },
  bread: {
    type: 'food',
    recipe: [ 'flour', 'flour', 'flour' ],
    sell: 30,
  },
  pancake: {
    type: 'food',
    recipe: [ 'flour', 'egg', 'milk' ],
    sell: 40,
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
  friedChicken: {
    type: 'food',
    recipe: [ 'flour', 'chicken' ],
    sell: 50,
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
  potatoSalad: {
    type: 'food',
    recipe: [ 'potato', 'pork' ],
    sell: 70,
  },
  stew: {
    type: 'food',
    recipe: [ 'potato', 'carrot', 'beaf' ],
    sell: 90,
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
    sell: 40,
  },
  ham: {
    type: 'food',
    recipe: [ 'pork' ],
    sell: 40,
  },
  hotdog: {
    type: 'food',
    recipe: [ 'bread', 'pork' ],
    sell: 80,
  },
  baconEgg: {
    type: 'food',
    recipe: [ 'bread', 'egg', 'pork' ],
    sell: 100,
  },
  honeyMilk: {
    type: 'food',
    recipe: [ 'milk', 'honey' ],
    sell: 50,
  },
  honeyChicken: {
    type: 'food',
    recipe: [ 'chicken', 'honey' ],
    sell: 60,
  },
  honeyToast: {
    type: 'food',
    recipe: [ 'milk', 'honey', 'bread' ],
    sell: 110,
  },
  salad: {
    type: 'food',
    recipe: [ 'tomato', 'lettuce' ],
    sell: 70,
  },
  sandwich: {
    type: 'food',
    recipe: [ 'egg', 'lettuce', 'bread' ],
    sell: 120,
  },
  hamburger: {
    type: 'food',
    recipe: [ 'beaf', 'tomato', 'lettuce', 'bread', 'cheese' ],
    sell: 200,
  },
  popcorn: {
    type: 'food',
    recipe: [ 'corn' ],
    sell: 30,
  },
  taco: {
    type: 'food',
    recipe: [ 'beaf', 'lettuce', 'tomato', 'corn' ],
    sell: 120,
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

export const baloonItemTypes = {
  balloon: ['tool', 'crop', 'livestock'],
  balloonLarge: ['tool', 'crop', 'livestock', 'food'],
  balloonSmall: ['tool', 'crop', 'livestock'],
  balloonRestaurant: ['food'],
  balloonGrocer: ['crop', 'livestock', 'food'],
};