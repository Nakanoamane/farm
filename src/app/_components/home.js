'use client';

import { useState, useCallback, useEffect } from 'react';
import Style from '../../styles/modules/home.module.scss';
import Items from './items';
import Logs from './logs';

const balloonSizes = [ Style.balloon, Style.balloonLarge, Style.balloonSmall ];

export default function Home({items, selectedItem, setSelectedItem, logs, money, score}) {
  const [balloonClassName, setBalloonClassName] = useState(Style.balloon);
  const onClickHouse = useCallback(() => {
    const index = (balloonSizes.indexOf(balloonClassName) + 1) % 3;
    setBalloonClassName(balloonSizes[index]);
  });

  const lebelScore = 10;
  const calcLevel = () => {
    let lv = 1;
    let nextScore = lebelScore;
    while(score >= nextScore) {
      lv++;
      nextScore += lebelScore * lv;
    }

    return [lv, nextScore];
  }
  const [level, nextScore] = calcLevel();

  const scoreStyle = () => {
    const white = Style['color-white'];
    const mint = Style['color-mint'];
    const max = lebelScore * level;
    const per = Math.round((max - (nextScore - score))/ max * 100);

    return {
      background: `linear-gradient(to top, ${mint} 0%, ${mint} ${per}%, ${white} ${per}%, ${white} 100%)`,
    }
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

      <Logs logs={logs} />

      <p className={Style.money}>{(money).toLocaleString()}</p>

      <div className={Style.score} style={scoreStyle()}>
        <p className={Style.level}>
          LEVEL<br/>
          <span className={Style.levelNum}>{ level }</span>
          </p>
      </div>
    </nav>
  )
}