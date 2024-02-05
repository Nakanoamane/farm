export const fieldsOptions = {
  plowed: {
    grow: ['green'],
    growSec: 30,
    items: {
      hoe: { field: 'green' },
      wheat: { field: 'wheat1' },
      sugarcane: { field: 'sugarcane1' },
      carrotSeed: { field: 'carrot1' },
      seedPotato: { field: 'potato1' },
      tomatoSeed: { field: 'tomato1' },
    }
  },
  green: {
    grow: ['grass1', 'grass2', 'grass3'],
    growSec: 120,
    items: {
      hoe: { field: 'plowed' },
      poultry: { field: 'poultry1' },
      cow: { field: 'cow1' },
      pig: { field: 'pig1' },
    }
  },
  grass1: {
    items: {
      sickle: { field: 'green' },
    }
  },
  grass2: {
    items: {
      sickle: { field: 'green' },
    }
  },
  grass3: {
    items: {
      sickle: { field: 'green', items: { wheat: 1 } },
    }
  },
  wheat1: {
    grow: ['wheat2'],
    growSec: 5,
    items: {
      sickle: { field: 'plowed', items: { wheat: 1 } },
    }
  },
  wheat2: {
    grow: ['wheat3'],
    growSec: 10,
    items: {
      sickle: { field: 'plowed', items: { wheat: 1 } },
    }
  },
  wheat3: {
    items: {
      sickle: { field: 'plowed', items: { wheat: 2, flour: 2 }, addScore: true },
    }
  },
  sugarcane1: {
    grow: ['sugarcane2'],
    growSec: 5,
    items: {
      sickle: { field: 'plowed', items: { sugarcane: 1 } },
    }
  },
  sugarcane2: {
    grow: ['sugarcane3'],
    growSec: 10,
    items: {
      sickle: { field: 'plowed', items: { sugarcane: 1 } },
    }
  },
  sugarcane3: {
    items: {
      sickle: { field: 'plowed', items: { sugarcane: 2, sugar: 1 }, addScore: true },
    }
  },
  carrot1: {
    grow: ['carrot2'],
    growSec: 10,
    items: {
      sickle: { field: 'plowed', items: { carrotSeed: 1 } },
    }
  },
  carrot2: {
    grow: ['carrot3'],
    growSec: 15,
    items: {
      sickle: { field: 'plowed', items: { carrotSeed: 1 } },
    }
  },
  carrot3: {
    items: {
      sickle: { field: 'plowed', items: { carrotSeed: 2, carrot: 1 }, addScore: true },
    }
  },
  potato1: {
    grow: ['potato2'],
    growSec: 10,
    items: {
      sickle: { field: 'plowed', items: { seedPotato: 1 } },
    }
  },
  potato2: {
    grow: ['potato3'],
    growSec: 15,
    items: {
      sickle: { field: 'plowed', items: { seedPotato: 1 } },
    }
  },
  potato3: {
    items: {
      sickle: { field: 'plowed', items: { seedPotato: 2, potato: 1 }, addScore: true },
    }
  },
  tomato1: {
    grow: ['tomato2'],
    growSec: 10,
    items: {
      sickle: { field: 'plowed', items: { tomatoSeed: 1 } },
    }
  },
  tomato2: {
    grow: ['tomato3'],
    growSec: 15,
    items: {
      sickle: { field: 'plowed', items: { tomatoSeed: 1 } },
    }
  },
  tomato3: {
    items: {
      sickle: { field: 'plowed', items: { tomatoSeed: 2, tomato: 1 }, addScore: true },
    }
  },
  poultry1: {
    grow: ['poultry2'],
    growSec: 10,
    items: {
      hand: { field: 'green', items: { poultry: 1 } },
      sickle: { field: 'green', items: { chicken: 1 }, addScore: true },
    }
  },
  poultry2: {
    grow: ['poultry3'],
    growSec: 20,
    items: {
      hand: { field: 'poultry1', items: { egg: 1 }, addScore: true },
      sickle: { field: 'green', items: { chicken: 1, egg: 1 }, addScore: true },
    }
  },
  poultry3: {
    items: {
      hand: { field: 'poultry1', items: { poultry: 1 }, addScore: true },
      sickle: { field: 'green', items: { chicken: 2 }, addScore: true },
    }
  },
  cow1: {
    grow: ['cow2'],
    growSec: 10,
    items: {
      hand: { field: 'green', items: { cow: 1 } },
      sickle: { field: 'green', items: { beaf: 1 }, addScore: true },
    }
  },
  cow2: {
    grow: ['cow3'],
    growSec: 20,
    items: {
      hand: { field: 'cow1', items: { milk: 1 }, addScore: true },
      sickle: { field: 'green', items: { beaf: 1, milk: 1 }, addScore: true },
    }
  },
  cow3: {
    items: {
      hand: { field: 'cow1', items: { cow: 1 }, addScore: true },
      sickle: { field: 'green', items: { beaf: 2 }, addScore: true },
    }
  },
  pig1: {
    grow: ['pig2'],
    growSec: 15,
    items: {
      hand: { field: 'green', items: { pig: 1 } },
      sickle: { field: 'green', items: { pork: 1 }, addScore: true },
    }
  },
  pig2: {
    items: {
      hand: { field: 'pig1', items: { pig: 1 }, addScore: true },
      sickle: { field: 'green', items: { pork: 2 }, addScore: true },
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

export function newField(time, field, items = {}) {
  let option = fieldsOptions[field];
  let sec = option.growSec ? option.growSec : 0;
  let newField = {
    field: field,
    updateTime: time + sec,
    items: items,
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