export const fieldsOptions = {
  plowed: {
    image: 'plowed',
    grow: {
      green: 1
    },
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
    image: 'green',
    grow: {
      grass1: 2,
      grass2: 2,
      grass3: 1
    },
    growSec: 120,
    items: {
      hoe: { field: 'plowed' },
      poultry: { field: 'poultry1' },
      cow: { field: 'cow1' },
      pig: { field: 'pig1' },
    }
  },
  grass1: {
    image: 'grass1',
    items: {
      sickle: { field: 'green' },
    }
  },
  grass2: {
    image: 'grass2',
    items: {
      sickle: { field: 'green' },
    }
  },
  grass3: {
    image: 'grass3',
    items: {
      sickle: { field: 'green', items: { wheat: 1 } },
    }
  },
  wheat1: {
    image: 'wheat1',
    grow: {
      wheat2: 1
    },
    growSec: 5,
    items: {
      sickle: { field: 'plowed', items: { wheat: 1 } },
    }
  },
  wheat2: {
    image: 'wheat2',
    grow: {
      wheat3: 1
    },
    growSec: 10,
    items: {
      sickle: { field: 'plowed', items: { wheat: 1 } },
    }
  },
  wheat3: {
    image: 'wheat3',
    items: {
      sickle: { field: 'plowed', items: { wheat: 2, flour: 2 }, addScore: true },
    }
  },
  sugarcane1: {
    image: 'sugarcane1',
    grow: {
      sugarcane2: 1
    },
    growSec: 5,
    items: {
      sickle: { field: 'plowed', items: { sugarcane: 1 } },
    }
  },
  sugarcane2: {
    image: 'sugarcane2',
    grow: {
      sugarcane3: 1
    },
    growSec: 10,
    items: {
      sickle: { field: 'plowed', items: { sugarcane: 1 } },
    }
  },
  sugarcane3: {
    image: 'sugarcane3',
    items: {
      sickle: { field: 'plowed', items: { sugarcane: 2, sugar: 1 }, addScore: true },
    }
  },
  carrot1: {
    image: 'carrot1',
    grow: {
      carrot2: 1
    },
    growSec: 10,
    items: {
      sickle: { field: 'plowed', items: { carrotSeed: 1 } },
    }
  },
  carrot2: {
    image: 'carrot2',
    grow: {
      carrot3: 1
    },
    growSec: 15,
    items: {
      sickle: { field: 'plowed', items: { carrotSeed: 1 } },
    }
  },
  carrot3: {
    image: 'carrot3',
    items: {
      sickle: { field: 'plowed', items: { carrotSeed: 2, carrot: 1 }, addScore: true },
    }
  },
  potato1: {
    image: 'potato1',
    grow: {
      potato2: 1
    },
    growSec: 10,
    items: {
      sickle: { field: 'plowed', items: { seedPotato: 1 } },
    }
  },
  potato2: {
    image: 'potato2',
    grow: {
      potato3: 1
    },
    growSec: 15,
    items: {
      sickle: { field: 'plowed', items: { seedPotato: 1 } },
    }
  },
  potato3: {
    image: 'potato3',
    items: {
      sickle: { field: 'plowed', items: { seedPotato: 2, potato: 1 }, addScore: true },
    }
  },
  tomato1: {
    image: 'tomato1',
    grow: {
      tomato2: 1
    },
    growSec: 10,
    items: {
      sickle: { field: 'plowed', items: { tomatoSeed: 1 } },
    }
  },
  tomato2: {
    image: 'tomato2',
    grow: {
      tomato3: 1
    },
    growSec: 15,
    items: {
      sickle: { field: 'plowed', items: { tomatoSeed: 1 } },
    }
  },
  tomato3: {
    image: 'tomato3',
    items: {
      sickle: { field: 'plowed', items: { tomatoSeed: 2, tomato: 1 }, addScore: true },
    }
  },
  poultry1: {
    image: 'poultry1',
    grow: {
      poultry2: 1
    },
    growSec: 10,
    items: {
      hand: { field: 'green', items: { poultry: 1 } },
      sickle: { field: 'green', items: { chicken: 1 }, addScore: true },
    }
  },
  poultry2: {
    image: 'poultry2',
    grow: {
      poultry3: 1
    },
    growSec: 20,
    items: {
      hand: { field: 'poultry1', items: { egg: 1 }, addScore: true },
      sickle: { field: 'green', items: { chicken: 1, egg: 1 }, addScore: true },
    }
  },
  poultry3: {
    image: 'poultry3',
    items: {
      hand: { field: 'poultry1', items: { poultry: 1 }, addScore: true },
      sickle: { field: 'green', items: { chicken: 2 }, addScore: true },
    }
  },
  cow1: {
    image: 'cow1',
    grow: {
      cow2: 1
    },
    growSec: 10,
    items: {
      hand: { field: 'green', items: { cow: 1 } },
      sickle: { field: 'green', items: { beaf: 1 }, addScore: true },
    }
  },
  cow2: {
    image: 'cow2',
    grow: {
      cow3: 1
    },
    growSec: 20,
    items: {
      hand: { field: 'cow1', items: { milk: 1 }, addScore: true },
      sickle: { field: 'green', items: { beaf: 1, milk: 1 }, addScore: true },
    }
  },
  cow3: {
    image: 'cow3',
    items: {
      hand: { field: 'cow1', items: { cow: 1 }, addScore: true },
      sickle: { field: 'green', items: { beaf: 2 }, addScore: true },
    }
  },
  pig1: {
    image: 'pig1',
    grow: {
      pig2: 1
    },
    growSec: 15,
    items: {
      hand: { field: 'green', items: { pig: 1 } },
      sickle: { field: 'green', items: { pork: 1 }, addScore: true },
    }
  },
  pig2: {
    image: 'pig2',
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

  let grows = [];
  Object.keys(option.grow).forEach((key) => {
    for (let i = 0; i < option.grow[key]; i++) {
      grows.push(key);
    }
  });
  const index = Math.floor(Math.random() * grows.length);
  return newField(time, grows[index]);
}

export function updateFields(time, fields) {
  let newFields = fields.map(row => {
    return row.map(field => {
      return updateField(time, field);
    });
  });
  return newFields;
}