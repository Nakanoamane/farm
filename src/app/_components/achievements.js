'use client';

import Style from '../../styles/modules/shops.module.scss';

export default function Achievements({ achievements, isShow }) {
  if(!isShow) { return null; }

  const achievementEls = Object.keys(achievements).map((key) => {
    const achievement = achievements[key];
    const classNames = [Style.achievement];
    if(achievement.achieved) {
      classNames.push(Style[achievement.icon]);
    }
    const title = achievement.achieved ? achievement.title : '???';
    const text = achievement.achieved || achievement.unlocked ? achievement.text : '???';
    return (
      <li key={`acv-${key}`} className={classNames.join(' ')}>
        <p className={Style.acvTitle}>{title}</p>
        <p className={Style.acvText}>{text}</p>
      </li>
    );
  });

  return (
    <div className={Style.museumBalloon}>
      <ul className={Style.achievements}>
        {achievementEls}
      </ul>
    </div>
  );
}