'use client';

import Style from '../../styles/modules/shops.module.scss';

import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { scoreState, achievementsState, selectedShopState } from '../../lib/state';
import { findLevelAchievement, updateAchievements } from '../../lib/achievements';

export default function Achievements() {
  const score = useRecoilValue(scoreState);
  const [achievements, setAchievements] = useRecoilState(achievementsState);
  const selectedShop = useRecoilValue(selectedShopState);

  useEffect(() => {
    achieve();
  }, [score]);

  const achieve = () => {
		const achievement = findLevelAchievement(achievements, score);
		if(achievement) {
			const newAchievements = updateAchievements(achievements, achievement);
			setAchievements(newAchievements);
		}
	}

  const achievementEls = Object.keys(achievements).map((key) => {
    const achievement = achievements[key];
    const classNames = [Style.achievement];
    if(achievement.achieved) {
      classNames.push(Style[achievement.icon]);
    }
    const title = achievement.achieved ? achievement.title : '???';
    const text = achievement.locked ? '???' : achievement.text ;
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
      <ul className={Style.achievements}>
        {achievementEls}
      </ul>
    </div>
  );
}