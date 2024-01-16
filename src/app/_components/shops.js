'use client';

import Style from '../../styles/modules/shops.module.scss';
import Achievements from './achievements';
import Ketchen from './kitchen';
import Checkstand from './checkstand';
import { useState } from 'react';

export default function Shops(props){
  const [selectedShop, setSelectedShop] = useState('');
  const onClickShop = (shop) => {
    if (selectedShop === shop) {
      setSelectedShop('');
    } else {
      setSelectedShop(shop);
    }
  }
  const shopClassName = (shop) => {
    return `${Style.shop} ${selectedShop === shop ? Style.selectedShop : ''}`;
  };

  return (
    <nav className={Style.shops}>
      <div className={shopClassName('museum')}>
        <button
          type="button"
          className={Style.museum}
          onClick={() => onClickShop('museum')}
          ></button>

        <Achievements
          achievements={props.achievements}
          isShow={selectedShop === 'museum'}
          />
      </div>

      <div className={shopClassName('restaurant')}>
        <button
          type="button"
          className={Style.restaurant}
          onClick={() => onClickShop('restaurant')}
          ></button>

        <Ketchen
          isShow={selectedShop === 'restaurant'}
          />
      </div>

      <div className={shopClassName('grocer')}>
        <button
          type="button"
          className={Style.grocer}
          onClick={() => onClickShop('grocer')}
          ></button>

        <Checkstand
          isShow={selectedShop === 'grocer'}
          />
      </div>
    </nav>
  );
}