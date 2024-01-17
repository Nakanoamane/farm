'use client';

import Style from '../../styles/modules/shops.module.scss';

import { useRecoilValue } from 'recoil';
import { selectedShopState } from '../../lib/state';

export default function Checkstand(){
  const selectedShop = useRecoilValue(selectedShopState);
  if(selectedShop !== 'grocer') { return null; }

  return(
    <div className={Style.grocerBalloon}>

    </div>
  );

}