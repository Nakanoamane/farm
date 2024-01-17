import { atom } from 'recoil';
import { itemsDefault } from './items';
import { fieldsDefault } from './fields';
import { achievementsDefault } from './achievements';

export const balloonSizes = [
  'balloon',
  'balloonLarge',
  'balloonSmall'
];

export const homeBalloonState = atom({
  key: 'homeBalloon',
  default: 'balloon',
});

export const itemsState = atom({
  key: 'items',
  default: itemsDefault,
});

export const selectedItemState = atom({
  key: 'selectedItem',
  default: 'hand',
});

export const fieldsState = atom({
  key: 'fields',
  default: fieldsDefault(),
});

export const achievementsState = atom({
  key: 'achievements',
  default: achievementsDefault,
});

export const timeState = atom({
  key: 'time',
  default: 0,
});

export const logsState = atom({
  key: 'logs',
  default: [],
});

export const moneyState = atom({
  key: 'money',
  default: 0,
});

export const scoreState = atom({
  key: 'score',
  default: 0,
});

export const selectedShopState = atom({
  key: 'selectedShop',
  default: '',
});
