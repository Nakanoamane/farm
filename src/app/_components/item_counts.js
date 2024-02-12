'use strict';

import { itemOptions } from '../../lib/items';

export default function ItemCounts({itemNums, style}) {
	if (!itemNums) { return null; }
	const itemEls = Object.keys(itemNums).map((key) => {
		if (itemOptions[key].type === 'tool') { return null; }

		const num = itemNums[key];
		let classNames = [style[`item-${key}`]];
		if(num < 1) { classNames.push(style['is-minus']); }

		return <span className={classNames.join(' ')} key={key}>{num > 0 ? '+' : ''}{num}</span>;
	});

	return <div className={style.itemCounts}>{itemEls}</div>;
}