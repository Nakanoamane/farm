import { atom } from 'recoil';

import { itemsDefault } from './items';
import { fieldsDefault } from './fields';
import { achievementsDefault } from './achievements';
import { recordsDefault } from './records';

export const itemsState = atom({
  key: 'items',
  default: itemsDefault,
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

export const moneyState = atom({
  key: 'money',
  default: 0,
});

export const scoreState = atom({
  key: 'score',
  default: 0,
});

export const recordsState = atom({
  key: 'records',
  default: recordsDefault,
});


export const homeBalloonState = atom({
  key: 'homeBalloon',
  default: 'balloon',
});

export const selectedItemState = atom({
  key: 'selectedItem',
  default: 'hoe',
});

export const timeMultipleState = atom({
  key: 'timeMultiple',
  default: 1,
});

export const isPlayingState = atom({
  key: 'timeStatus',
  default: true,
});

export const logsState = atom({
  key: 'logs',
  default: [],
});

export const selectedShopState = atom({
  key: 'selectedShop',
  default: '',
});

export const ingredientsState = atom({
  key: 'ingredients',
  default: [],
});

export const dishState = atom({
  key: 'dish',
  default: '',
});


export const saveDataState = atom({
  key: 'saveData',
  default: null,
});

export const savedAtState = atom({
  key: 'savedAt',
  default: null,
});