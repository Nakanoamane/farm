'use client';

import Style from '../../styles/modules/side.module.scss';

const onChangeItem = (e, setSelectedItem) => {
  const value = e.target.value;
  setSelectedItem(value);
}

const ItemEls = ({items, selectedItem, setSelectedItem}) => {
  const itemKeys = Object.keys(items);
  const els = itemKeys.map(key => {
    const item = items[key];
    const id = `item_${key}`;

    return (
      <li key={id}>
        <input
          type="radio"
          name="items"
          id={id}
          value={key}
          className={Style.radio}
          disabled={item.num === 0}
          checked={key === selectedItem}
          onChange={(e) => onChangeItem(e, setSelectedItem)} />
        <label htmlFor={id} className={item.className}>{item.num}</label>
      </li>
    );
  });

  return (
    <ul className={Style.items}>
      {els}
    </ul>
  );
}

export default function Items({items, balloonClassName, selectedItem, setSelectedItem}) {
  return (
    <div className={balloonClassName}>
      <ItemEls
        items={items}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem} />
    </div>
  )
}