'use client';

import { useState } from 'react';
import Style from '../../styles/modules/home.module.scss';
import Items from './items';

const balloonSizes = [ Style.balloon, Style.balloonLarge, Style.balloonSmall ];

export default function Home({items, selectedItem, setSelectedItem}) {
  const [balloonClassName, setBalloonClassName] = useState(Style.balloon);
  const onClickHouse = () => {
    const index = (balloonSizes.indexOf(balloonClassName) + 1) % 3;
    setBalloonClassName(balloonSizes[index]);
  }

  return (
    <nav className={Style.nav}>
      <button type="button" className={Style.house} onClick={onClickHouse}></button>
      <Items
        items={items}
        balloonClassName={balloonClassName}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        />
    </nav>
  )
}