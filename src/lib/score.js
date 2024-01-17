
export const levelScore = 10;
export function calcLevel(score) {
  let lv = 1;
  let nextScore = levelScore;
  while(score >= nextScore) {
    lv++;
    nextScore += levelScore * lv;
  }

  return [lv, nextScore];
}
