import _ from 'lodash';
import { calcLevel } from './score';

export const achievementOptions = {
  level1: {
    title: 'Beginner',
    text: 'レベル2に到達する',
    icon: 'trophy-tea',
    next: 'level2'
  },
  level2: {
    title: 'Amateur',
    text: 'レベル7に到達する',
    icon: 'trophy-mint',
    next: 'level3'
  },
  level3: {
    title: 'Expert',
    text: 'レベル15に到達する',
    icon: 'trophy-lime',
    next: 'level4'
  },
  level4: {
    title: 'Master',
    text: 'レベル30に到達する',
    icon: 'trophy-mustard',
  },
  money1: {
    title: 'Pocket Money',
    text: '100コイン貯金する',
    icon: 'money-tea',
    next: 'money2'
  },
  money2: {
    title: 'Rich',
    text: '1,000コイン貯金する',
    icon: 'money-mint',
    next: 'money3'
  },
  money3: {
    title: 'Wealthy',
    text: '10,000コイン貯金する',
    icon: 'money-lime',
    next: 'money4'
  },
  money4: {
    title: 'Tycoon',
    text: '100,000コイン貯金する',
    icon: 'money-mustard',
  },
  time1: {
    title: 'Nice Playing',
    text: '1分間遊ぶ',
    icon: 'time-tea',
    next: 'time2'
  },
  time2: {
    title: 'More Play',
    text: '10分間遊ぶ',
    icon: 'time-mint',
    next: 'time3'
  },
  time3: {
    title: 'Much Play',
    text: '30分遊ぶ',
    icon: 'time-lime',
    next: 'time4'
  },
  time4: {
    title: 'Thanks for Playing',
    text: '1時間遊ぶ',
    icon: 'time-mustard',
  },
  farm1: {
    title: 'Home Garden',
    text: '10回農作業をする',
    icon: 'farm-tea',
    next: 'farm2'
  },
  farm2: {
    title: 'Nice Fieald',
    text: '100回農作業をする',
    icon: 'farm-mint',
    next: 'farm3'
  },
  farm3: {
    title: 'Extensive Fieald',
    text: '1,000回農作業をする',
    icon: 'farm-lime',
    next: 'farm4'
  },
  farm4: {
    title: 'Great Farmer',
    text: '10,000回農作業をする',
    icon: 'farm-mustard',
  },
  cook1: {
    title: 'Firtst Cooking',
    text: '初めて料理をする',
    icon: 'cook-tea',
    next: 'cook2'
  },
  cook2: {
    title: 'Nice Cooking',
    text: '30回料理をする',
    icon: 'cook-mint',
    next: 'cook3'
  },
  cook3: {
    title: 'Good Cooking',
    text: '100回料理をする',
    icon: 'cook-lime',
    next: 'cook4'
  },
  cook4: {
    title: 'Great Chef',
    text: '500回料理をする',
    icon: 'cook-mustard',
  },
  sell1: {
    title: 'First Selling',
    text: '初めて売る',
    icon: 'sell-tea',
    next: 'sell2'
  },
  sell2: {
    title: 'Nice Selling',
    text: '30回売る',
    icon: 'sell-mint',
    next: 'sell3'
  },
  sell3: {
    title: 'Good Bargain',
    text: '100回売る',
    icon: 'sell-lime',
    next: 'sell4'
  },
  sell4: {
    title: 'Great Merchant',
    text: '500回売る',
    icon: 'sell-mustard',
  },
  buy1: {
    title: 'First Buy',
    text: '初めて買う',
    icon: 'buy-tea',
    next: 'buy2'
  },
  buy2: {
    title: 'Nice Buy',
    text: '30回買う',
    icon: 'buy-mint',
    next: 'buy3'
  },
  buy3: {
    title: 'Good Buy',
    text: '100回買う',
    icon: 'buy-lime',
    next: 'buy4'
  },
  buy4: {
    title: 'Great Buyer',
    text: '500回買う',
    icon: 'buy-mustard',
  },
  income1: {
    title: 'Earn Income',
    text: '300コイン得る',
    icon: 'income-tea',
    next: 'income2'
  },
  income2: {
    title: 'Nice Earning',
    text: '3,000コイン得る',
    icon: 'income-mint',
    next: 'income3'
  },
  income3: {
    title: 'Good Earning',
    text: '30,000コイン得る',
    icon: 'income-lime',
    next: 'income4'
  },
  income4: {
    title: 'Money Maker',
    text: '300,000コイン得る',
    icon: 'income-mustard',
  },
  expense1: {
    title: 'A Little Expense',
    text: '100コイン使う',
    icon: 'expense-tea',
    next: 'expense2'
  },
  expense2: {
    title: 'Some Expense',
    text: '1,000コイン使う',
    icon: 'expense-mint',
    next: 'expense3'
  },
  expense3: {
    title: 'Much Expense',
    text: '10,000コイン使う',
    icon: 'expense-lime',
    next: 'expense4'
  },
  expense4: {
    title: 'Big Spender',
    text: '100,000コイン使う',
    icon: 'expense-mustard',
  },
};

const achievementMaps = {
  level: {
    level1: 2,
    level2: 7,
    level3: 15,
    level4: 30,
  },
  money: {
    money1: 100,
    money2: 1000,
    money3: 10000,
    money4: 100000,
  },
  time: {
    time1: 60,
    time2: 600,
    time3: 1800,
    time4: 3600,
  },
  farm: {
    farm1: 10,
    farm2: 100,
    farm3: 1000,
    farm4: 10000,
  },
  cook: {
    cook1: 1,
    cook2: 30,
    cook3: 100,
    cook4: 500,
  },
  sell: {
    sell1: 1,
    sell2: 30,
    sell3: 100,
    sell4: 500,
  },
  buy: {
    buy1: 1,
    buy2: 30,
    buy3: 100,
    buy4: 500,
  },
  income: {
    income1: 300,
    income2: 3000,
    income3: 30000,
    income4: 300000,
  },
  expense: {
    expense1: 100,
    expense2: 1000,
    expense3: 10000,
    expense4: 100000,
  },
};

export const achievementDefault = {
  locked: true,
  achieved: false,
};

export const achievementsDefault = {
  level1: { locked: false, achieved: false },
  money1: { locked: false, achieved: false },
  time1: { locked: false, achieved: false },
  farm1: { locked: false, achieved: false },
  cook1: { locked: false, achieved: false },
  sell1: { locked: false, achieved: false },
  buy1: { locked: false, achieved: false },
  income1: { locked: false, achieved: false },
  expense1: { locked: false, achieved: false },
};

export function updateAchievements(achievements, achieved) {
  let newachievements = _.cloneDeep(achievements);
  newachievements[achieved].achieved = true;
  newachievements[achieved].locked = false;
  let next = achievementOptions[achieved].next;
  if (next) {
    if (newachievements[next] === undefined) { newachievements[next] = {}; }
    newachievements[next].locked = false;
  }
  return newachievements;
}

export function findAchievement(achievements, key, value) {
  const maps = achievementMaps[key];
  return Object.keys(maps).find((k) => {
    return maps[k] <= value && (!achievements[k] || !achievements[k].achieved);
  });
}
