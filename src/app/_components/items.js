'use client';

import Style from '../../styles/modules/home.module.scss';

import { useRecoilState, useRecoilValue } from 'recoil';
import { homeBalloonState, itemsState, selectedItemState,} from '../../lib/state';

export default function Items() {
  const homeBalloon = useRecoilValue(homeBalloonState);
  const items = useRecoilValue(itemsState);
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);

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
          onChange={() => setSelectedItem(key) } />
        <label htmlFor={id} className={item.className}>{item.num}</label>
      </li>
    );
  });


  return (
    <div className={Style[homeBalloon]}>
      <ul className={Style.items}>
        {els}
      </ul>
    </div>
  )
}