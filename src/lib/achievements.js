import _ from 'lodash';
import { calcLevel } from './score';

export const achievementOptions = {
  beginner: {
    title: 'Beginner',
    text: 'レベル2に到達する',
    icon: 'trophy-tea',
    next: 'amateur'
  },
  amateur: {
    title: 'Amateur',
    text: 'レベル7に到達する',
    icon: 'trophy-mint',
    next: 'expert'
  },
  expert: {
    title: 'Expert',
    text: 'レベル15に到達する',
    icon: 'trophy-lime',
    next: 'master'
  },
  master: {
    title: 'Master',
    text: 'レベル30に到達する',
    icon: 'trophy-mustard',
  },
};

export const achievementDefault = {
  locked: true,
  achieved: false,
};

export const achievementsDefault = {
  beginner: {
    locked: false,
    achieved: false,
  }
};

export function updateAchievements(achievements, achieved) {
  let newachievements = _.cloneDeep(achievements);
  newachievements[achieved].achieved = true;
  newachievements[achieved].locked = false;
  let next = achievementOptions[achieved].next;
  if (next) {
    if (newachievements[next] === undefined) { newachievements[next] = {}; }
    newachievements[next].locked = false;
  }
  return newachievements;
}

export function findLevelAchievement(achievements, score) {
  const [level, _] = calcLevel(score);
  const levelMap = {
    beginner: 2,
    amateur: 7,
    expert: 15,
    master: 30,
  };
  return Object.keys(levelMap).find((key) => {
    return levelMap[key] <= level && (!achievements[key] || !achievements[key].achieved);
  });
}