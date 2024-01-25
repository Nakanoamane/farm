import { itemOptions } from "./items";

export function newItemLogs(items, itemNums) {
  let logs = [];
  Object.keys(itemNums).forEach((key) => {
    const num = itemNums[key];
    if(num > 0){
      logs.push({	type: 'GET', text: `${key} +${num}` });

      if (!items[key] || !items[key].totalNum) {
        logs.push({	type: 'NEW', text: key });
      }

    } else {
      let text = `${key} ${num}`
      if (itemOptions[key].type === 'tool') {
        text = key;
      }
      logs.push({	type: 'USE', text: text });
    }
  });
  return logs;
}