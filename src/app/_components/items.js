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
    const isSecret = item.num !== undefined && !item.totalNum;
    const className = isSecret ? Style.secret : item.className;

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
          onChange={() => setSelectedItem(key) }
          />

        <label htmlFor={id} className={className}>
          <span className={Style.itemName}>{ isSecret ? '' : key }</span>
          { item.num ? item.num : '' }
        </label>
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