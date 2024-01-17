'use client';

import Style from '../../styles/modules/shops.module.scss';

import { useRecoilValue } from 'recoil';
import { selectedShopState } from '../../lib/state';

export default function Kitchen(){
  const selectedShop = useRecoilValue(selectedShopState);
  if(selectedShop !== 'restaurant') { return null; }

  return(
    <div className={Style.restaurantBalloon}>

    </div>
  );

}