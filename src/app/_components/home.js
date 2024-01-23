'use client';

import Style from '../../styles/modules/home.module.scss';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
  homeBalloonState,
  moneyState,
  scoreState } from '../../lib/state';
import { levelScore, calcLevel } from '../../lib/score';
import Items from './items';
import Logs from './logs';

const balloonSizes = [
  'balloon',
  'balloonLarge',
  'balloonSmall'
];

export default function Home() {
  const [homeBalloon, setHomeBalloon] = useRecoilState(homeBalloonState);
  const score = useRecoilValue(scoreState);
  const money = useRecoilValue(moneyState);

  const onClickHouse = () => {
    const index = (balloonSizes.indexOf(homeBalloon) + 1) % 3;
    setHomeBalloon(balloonSizes[index]);
  };

  const [level, nextScore] = calcLevel(score);
  const scoreStyle = () => {
    const white = Style['color-white'];
    const mint = Style['color-mint'];
    const max = levelScore * level;
    const per = Math.round((max - (nextScore - score))/ max * 100);

    return {
      background: `linear-gradient(to top, ${mint} 0%, ${mint} ${per}%, ${white} ${per}%, ${white} 100%)`,
    }
  }

  return (
    <nav className={Style.nav}>
      <button
        type="button"
        className={Style.house}
        onClick={onClickHouse}
        ></button>

      <Items />

      <Logs />

      <p className={Style.money}>{money.toLocaleString()}</p>

      <div className={Style.score} style={scoreStyle()}>
        <p className={Style.level}>
          LEVEL<br/>
          <span className={Style.levelNum}>{ level }</span>
          </p>
      </div>
    </nav>
  )
}