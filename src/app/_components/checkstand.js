'use client';

import Style from '../../styles/modules/shops.module.scss';

export default function Checkstand({isShow}){
  if(!isShow) { return null; }

  return(
    <div className={Style.grocerBalloon}>

    </div>
  );

}