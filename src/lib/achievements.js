import _ from 'lodash';
import { calcLevel } from './score';

export const achievementsDefault = {
  beginner: {
    title: 'Beginner',
    text: 'レベル2に到達する',
    icon: 'trophy-tea',
    unlocked: true,
    achieved: false,
    next: 'amateur'
  },
  amateur: {
    title: 'Amateur',
    text: 'レベル7に到達する',
    unlocked: false,
    achieved: false,
    next: 'expert'
  },
  expert: {
    title: 'Expert',
    text: 'レベル15に到達する',
    unlocked: false,
    achieved: false,
    next: 'master'
  },
  master: {
    title: 'Master',
    text: 'レベル30に到達する',
    unlocked: false,
    achieved: false,
  },
};

export function updateAchievements(achievements, achieved) {
  let newachievements = _.cloneDeep(achievements);
  newachievements[achieved].achieved = true;
  let next = newachievements[achieved].next;
  newachievements[next].unlocked = true;
  return newachievements;
}

export function findLevelAchievement(achievements, score) {
  const [level, _] = calcLevel(score);
  const levelMap = {
    beginner: 2,
    amateur: 7,
    expart: 15,
    master: 30,
  };
  return Object.keys(levelMap).find((key) => {
    return levelMap[key] <= level && !achievements[key].achieved;
  });
}