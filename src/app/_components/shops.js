'use client';

import Style from '../../styles/modules/shops.module.scss';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { selectedShopState, homeBalloonState } from '../../lib/state';
import Achievements from './achievements';
import Ketchen from './kitchen';
import Checkstand from './checkstand';
import Controlls from './controlls';


export default function Shops(){
  const [selectedShop, setSelectedShop] = useRecoilState(selectedShopState);
  const setHomeBalloon = useSetRecoilState(homeBalloonState);


  const onClickShop = (shop, itemBalloon) => {
    let selected =  '';
    let balloon = 'balloon';
    if(selectedShop !== shop){
      selected = shop;
      if (itemBalloon) {
        balloon = itemBalloon;
      }
    }
    setSelectedShop(selected);
    setHomeBalloon(balloon);
  }
  const shopClassName = (shop) => {
    return `${Style.shop} ${selectedShop === shop ? Style.selectedShop : ''}`;
  };

  return (
    <nav className={Style.shops}>
      <div className={shopClassName('clock')}>
        <button
          type="button"
          className={Style.clock}
          onClick={() => onClickShop('clock', false)}
          ></button>
          <Controlls/>
      </div>

      <div className={shopClassName('museum')}>
        <button
          type="button"
          className={Style.museum}
          onClick={() => onClickShop('museum', false)}
          ></button>

        <Achievements/>
      </div>

      <div className={shopClassName('restaurant')}>
        <button
          type="button"
          className={Style.restaurant}
          onClick={() => onClickShop('restaurant', 'balloonRestaurant')}
          ></button>

        <Ketchen/>
      </div>

      <div className={shopClassName('grocer')}>
        <button
          type="button"
          className={Style.grocer}
          onClick={() => onClickShop('grocer', 'balloonGrocer')}
          ></button>

        <Checkstand/>
      </div>
    </nav>
  );
}