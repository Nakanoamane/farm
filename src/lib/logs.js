import { itemsDefault } from './items';

export function newLogs(itemNums, selectedItem) {
  return Object.keys(itemNums).map((key) => {
    const num = itemNums[key];
    if(num > 0){
      return {	type: 'GET', text: `${key} +${num}` };
    } else {
      let text = `${key} ${num}`
      if (itemsDefault[selectedItem].num === undefined) {
        text = key;
      }
      return {	type: 'USE', text: text };
    }
  });
}