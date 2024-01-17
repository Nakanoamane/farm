'use client';

import Style from '../../styles/modules/shops.module.scss';

import { useRecoilState } from 'recoil';
import { selectedShopState } from '../../lib/state';
import Achievements from './achievements';
import Ketchen from './kitchen';
import Checkstand from './checkstand';


export default function Shops(){
  const [selectedShop, setSelectedShop] = useRecoilState(selectedShopState);

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

        <Achievements/>
      </div>

      <div className={shopClassName('restaurant')}>
        <button
          type="button"
          className={Style.restaurant}
          onClick={() => onClickShop('restaurant')}
          ></button>

        <Ketchen/>
      </div>

      <div className={shopClassName('grocer')}>
        <button
          type="button"
          className={Style.grocer}
          onClick={() => onClickShop('grocer')}
          ></button>

        <Checkstand/>
      </div>
    </nav>
  );
}