export function newItemLogs(items, itemNums) {
  let logs = [];
  Object.keys(itemNums).forEach((key) => {
    const num = itemNums[key];
    if(num > 0){
      logs.push({	type: 'GET', text: `${key} +${num}` });

      if (!items[key].totalNum) {
        logs.push({	type: 'NEW', text: key });
      }

    } else {
      let text = `${key} ${num}`
      if (items[key].num === undefined) {
        text = key;
      }
      logs.push({	type: 'USE', text: text });
    }
  });
  return logs;
}