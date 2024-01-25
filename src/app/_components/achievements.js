'use client';

import Style from '../../styles/modules/shops.module.scss';

import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { scoreState, achievementsState, selectedShopState } from '../../lib/state';
import { achievementOptions, achievementDefault, findLevelAchievement, updateAchievements } from '../../lib/achievements';

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
      <ul className={Style.achievements}>
        {achievementEls}
      </ul>
    </div>
  );
}