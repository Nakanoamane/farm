'use client';

import Style from '../../styles/modules/shops.module.scss';

export default function Kitchen({isShow}){
  if(!isShow) { return null; }

  return(
    <div className={Style.restaurantBalloon}>

    </div>
  );

}