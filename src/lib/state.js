import ItemStyle from '../styles/modules/home.module.scss';
import FieldStyle from '../styles/modules/fields.module.scss';

export const itemsDefault = {
  hand: {
    className: ItemStyle.hand,
    type: 'tool'
  },
  hoe: {
    className: ItemStyle.hoe,
    type: 'tool'
  },
  sickle: {
    className: ItemStyle.sickle,
    type: 'tool'
  },
  wheat: {
    className: ItemStyle.wheat,
    type: 'crop',
    num: 10
  },
  poultry: {
    className: ItemStyle.poultry,
    type: 'livestock',
    num: 10
  },
  cow: {
    className: ItemStyle.cow,
    type: 'livestock',
    num: 10
  },
  flour: {
    className: ItemStyle.flour,
    type: 'food',
    num: 0
  },
  milk: {
    className: ItemStyle.milk,
    type: 'food',
    num: 0
  },
  egg: {
    className: ItemStyle.egg,
    type: 'food',
    'num': 0
  },
  chicken: {
    className: ItemStyle.chicken,
    type: 'food',
    num: 0
  },
  beaf: {
    className: ItemStyle.beaf,
    type: 'food',
    num: 0
  },
};

export const fieldsOptions = {
  plowed: {
    className: FieldStyle.plowed,
    grow: ['green'],
    growSec: 20,
    items: {
      hoe: { field: 'green' },
      wheat: { field: 'wheat1' },
    }
  },
  green: {
    className: FieldStyle.green,
    grow: ['grass1', 'grass2', 'grass3'],
    growSec: 60,
    items: {
      hoe: { field: 'plowed' },
      poultry: { field: 'poultry1' },
      cow: { field: 'cow1' },
    }
  },
  grass1: {
    className: FieldStyle.grass1,
    items: {
      sickle: { field: 'green', items: { wheat: 1 } },
    }
  },
  grass2: {
    className: FieldStyle.grass2,
    items: {
      sickle: { field: 'green', items: { poultry: 1 } },
    }
  },
  grass3: {
    className: FieldStyle.grass3,
    items: {
      sickle: { field: 'green', items: { cow: 1 } },
    }
  },
  wheat1: {
    className: FieldStyle.wheat1,
    grow: ['wheat2'],
    growSec: 5,
    items: {
      sickle: { field: 'plowed', items: { wheat: 1 } },
    }
  },
  wheat2: {
    className: FieldStyle.wheat2,
    grow: ['wheat3'],
    growSec: 5,
    items: {
      sickle: { field: 'plowed', items: { wheat: 2 } },
    }
  },
  wheat3: {
    className: FieldStyle.wheat3,
    items: {
      sickle: { field: 'plowed', items: { wheat: 3, flour: 1 } },
    }
  },
  poultry1: {
    className: FieldStyle.poultry1,
    grow: ['poultry2'],
    growSec: 5,
    items: {
      hand: { field: 'green', items: { poultry: 1 } },
      sickle: { field: 'green', items: { chicken: 1 } },
    }
  },
  poultry2: {
    className: FieldStyle.poultry2,
    grow: ['poultry3'],
    growSec: 10,
    items: {
      hand: { field: 'poultry1', items: { egg: 1 } },
      sickle: { field: 'green', items: { chicken: 1, egg: 1 } },
    }
  },
  poultry3: {
    className: FieldStyle.poultry3,
    items: {
      hand: { field: 'poultry1', items: { poultry: 1 } },
      sickle: { field: 'green', items: { chicken: 2 } },
    }
  },
  cow1: {
    className: FieldStyle.cow1,
    grow: ['cow2'],
    growSec: 5,
    items: {
      hand: { field: 'green', items: { cow: 1 } },
      sickle: { field: 'green', items: { beaf: 1 } },
    }
  },
  cow2: {
    className: FieldStyle.cow2,
    grow: ['cow3'],
    growSec: 10,
    items: {
      hand: { field: 'cow1', items: { milk: 1 } },
      sickle: { field: 'green', items: { beaf: 1, milk: 1 } },
    }
  },
  cow3: {
    className: FieldStyle.cow3,
    items: {
      hand: { field: 'cow1', items: { cow: 1 } },
      sickle: { field: 'green', items: { beaf: 2 } },
    }
  },
};


export const updateItems = (prevItems, updateItems) => {
  let newItems = {...prevItems};
  Object.keys(updateItems).forEach(item => {
    if(newItems[item].num !== undefined) {
      newItems[item].num += updateItems[item];
    }
  });
  return newItems;
}

const fieldDefault = newField(0, 'green');
export function fieldsDefault() {
  let rows = [];
  for (let i = 0; i < 10; i++) {
    let cells = Array.from({length: 12}, () => fieldDefault);
    rows.push(cells);
  }
  return rows;
};

export function newField(time, field) {
  let option = fieldsOptions[field];
  let sec = option.growSec ? option.growSec : 0;
  let newField = {
    field: field,
    updateTime: time + sec,
  }
  return newField;
}

function updateField(time, field){
  let option = fieldsOptions[field.field];
  if (field.updateTime > time || !option.grow) { return field; };

  let isGrow = Math.floor(Math.random() * 100) <= (100 / option.growSec);
  if (!isGrow) {
    return newField(time, field.field);
  };

  let index = Math.floor(Math.random() * option.grow.length);
  return newField(time, option.grow[index]);
}

export function updateFields(time, fields) {
  let newFields = fields.map(row => {
    return row.map(field => {
      return updateField(time, field);
    });
  });
  return newFields;
}