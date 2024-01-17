import Style from '../styles/modules/fields.module.scss';

export const fieldsOptions = {
  plowed: {
    className: Style.plowed,
    grow: ['green'],
    growSec: 20,
    items: {
      hoe: { field: 'green' },
      wheat: { field: 'wheat1' },
    }
  },
  green: {
    className: Style.green,
    grow: ['grass1', 'grass2', 'grass3'],
    growSec: 60,
    items: {
      hoe: { field: 'plowed' },
      poultry: { field: 'poultry1' },
      cow: { field: 'cow1' },
    }
  },
  grass1: {
    className: Style.grass1,
    items: {
      sickle: { field: 'green' },
    }
  },
  grass2: {
    className: Style.grass2,
    items: {
      sickle: { field: 'green' },
    }
  },
  grass3: {
    className: Style.grass3,
    items: {
      sickle: { field: 'green', items: { wheat: 1 } },
    }
  },
  wheat1: {
    className: Style.wheat1,
    grow: ['wheat2'],
    growSec: 5,
    items: {
      sickle: { field: 'plowed', items: { wheat: 1 } },
    }
  },
  wheat2: {
    className: Style.wheat2,
    grow: ['wheat3'],
    growSec: 5,
    items: {
      sickle: { field: 'plowed', items: { wheat: 2 } },
    }
  },
  wheat3: {
    className: Style.wheat3,
    items: {
      sickle: { field: 'plowed', items: { wheat: 3, flour: 1 } },
    }
  },
  poultry1: {
    className: Style.poultry1,
    grow: ['poultry2'],
    growSec: 5,
    items: {
      hand: { field: 'green', items: { poultry: 1 } },
      sickle: { field: 'green', items: { chicken: 1 } },
    }
  },
  poultry2: {
    className: Style.poultry2,
    grow: ['poultry3'],
    growSec: 10,
    items: {
      hand: { field: 'poultry1', items: { egg: 1 } },
      sickle: { field: 'green', items: { chicken: 1, egg: 1 } },
    }
  },
  poultry3: {
    className: Style.poultry3,
    items: {
      hand: { field: 'poultry1', items: { poultry: 1 } },
      sickle: { field: 'green', items: { chicken: 2 } },
    }
  },
  cow1: {
    className: Style.cow1,
    grow: ['cow2'],
    growSec: 5,
    items: {
      hand: { field: 'green', items: { cow: 1 } },
      sickle: { field: 'green', items: { beaf: 1 } },
    }
  },
  cow2: {
    className: Style.cow2,
    grow: ['cow3'],
    growSec: 10,
    items: {
      hand: { field: 'cow1', items: { milk: 1 } },
      sickle: { field: 'green', items: { beaf: 1, milk: 1 } },
    }
  },
  cow3: {
    className: Style.cow3,
    items: {
      hand: { field: 'cow1', items: { cow: 1 } },
      sickle: { field: 'green', items: { beaf: 2 } },
    }
  },
};

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