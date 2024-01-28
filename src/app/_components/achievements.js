'use client';

import Style from '../../styles/modules/achievements.module.scss';

import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  scoreState,
  timeState,
  moneyState,
  recordsState,
  achievementsState,
  selectedShopState } from '../../lib/state';
import {
  achievementOptions,
  achievementDefault,
  findAchievement,
  updateAchievements } from '../../lib/achievements';
import { calcLevel } from '../../lib/score';
import Records from './records';

export default function Achievements() {
  const score = useRecoilValue(scoreState);
  const money = useRecoilValue(moneyState);
  const time = useRecoilValue(timeState);
  const records = useRecoilValue(recordsState);
  const [achievements, setAchievements] = useRecoilState(achievementsState);
  const selectedShop = useRecoilValue(selectedShopState);

  useEffect(() => {
    const [level] = calcLevel(score);
    achieve('level', level);
  }, [score]);

  useEffect(() => {
    achieve('money', money);
  }, [money]);

  useEffect(() => {
    achieve('time', time);
  }, [time]);

  useEffect(() => {
    achieveRecoreds();
  }, [records]);

  const achieve = (key, value) => {
		const achievement = findAchievement(achievements, key, value);
		if(achievement) {
			const newAchievements = updateAchievements(achievements, achievement);
			setAchievements(newAchievements);
		}
	};

  const achieveRecoreds = () => {
    const keys = ['farm', 'cook', 'sell', 'buy', 'income', 'expense'];
    let newAchievements = _.cloneDeep(achievements);
    let num = 0;

    keys.forEach((key) => {
      const achievement = findAchievement(achievements, key, records[key]);
      if(achievement) {
        newAchievements = updateAchievements(newAchievements, achievement);
        num++;
      }
    });

    if(num > 0) {
      setAchievements(newAchievements);
    }
  };

  const achievementEls = Object.keys(achievementOptions).map((key) => {
    const achievementOption = achievementOptions[key];
    const achievement = achievements[key] || achievementDefault;
    const classNames = [Style.achievement];
    if(achievement.achieved) {
      classNames.push(Style[achievementOption.icon]);
    }
    const title = achievement.achieved ? achievementOption.title : '???';
    const text = achievement.locked ? '???' : achievementOption.text ;
    return (
      <li key={`acv-${key}`} className={classNames.join(' ')}>
        <p className={Style.acvTitle}>{title}</p>
        <p className={Style.acvText}>{text}</p>
      </li>
    );
  });

  if(selectedShop !== 'museum') { return null; }
  return (
    <div className={Style.museumBalloon}>
      <Records />
      <ul className={Style.achievements}>
        {achievementEls}
      </ul>
    </div>
  );
}