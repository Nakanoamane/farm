'use client';

import Style from '../../styles/modules/fields.module.scss';
import _ from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	fieldsState,
	itemsState,
	selectedItemState,
	logsState,
	scoreState,
	timeState,
	recordsState } from '../../lib/state';
import { fieldsOptions, newField } from '../../lib/fields';
import { itemOptions, updateItems } from '../../lib/items';
import { newItemLogs } from '../../lib/logs';
import Image from 'next/image';
import { imagePath } from '../../lib/image';
import { countUpRecords } from '../../lib/records';
import ItemCounts from './item_counts';


export default function Field({ rowIndex, cellIndex }) {
	const [fields, setFields] = useRecoilState(fieldsState);
	const field = fields[rowIndex][cellIndex];
	const fieldOption = fieldsOptions[field.field];
	const [items, setItems] = useRecoilState(itemsState);
	const selectedItem = useRecoilValue(selectedItemState);
	const [logs, setLogs] = useRecoilState(logsState);
	const [score, setScore] = useRecoilState(scoreState);
	const time = useRecoilValue(timeState);
	const [records, setRecords] = useRecoilState(recordsState);

	const changeField = (newItems) => {
		setFields(prev => {
			let newFields = _.cloneDeep(prev);
			const fieldName = fieldOption.items[selectedItem].field;
			newFields[rowIndex][cellIndex] = newField(time, fieldName, newItems);
			return newFields
		});
	}

	const changeItems = (newItems) => {
		setItems(updateItems(items, newItems));
	}

	const addLogs = (newItems) => {
		const addLogs = newItemLogs(items, newItems);
		setLogs(addLogs.concat([...logs]));
	}

	const addScore = (newItems) => {
		let add = 0;
		Object.keys(newItems).forEach((key) => {
			const num = newItems[key];
			if(num > 0) { add += num; }
		});
		if(add > 0) { setScore(score + add); }
	}

	const buildNewItems = (items) => {
		let newItems = {};
		if(items) {
			newItems = {...items};
		}
		newItems[selectedItem] = -1;

		return newItems;
	};

	const onCickField =  () => {
		if(!isClickable() ) return;

		const item = fieldOption.items[selectedItem];
		const newItems = buildNewItems(item.items);
		changeField(newItems);
		changeItems(newItems);
		addLogs(newItems);
		if (item.addScore){
			addScore(newItems);
		}
		setRecords(countUpRecords(records, 'farm', 1));
	}

	const isClickable = () => {
		return fieldOption.items && fieldOption.items[selectedItem] &&
			(itemOptions[selectedItem].type === 'tool' || items[selectedItem].num > 0);
	};

	const className = () => {
		const cn = [Style.cell];
		if(isClickable()) {
			cn.push(Style[`cursor-${selectedItem}`]);
		} else {
			cn.push(Style['is-disabled']);
		}
		return cn.join(' ');
	};

	return (
		<td
			className={className()}
			onClick={onCickField}
			>
			<div className={Style.imageBox}>
				<Image
					src={imagePath(`images/fields/${fieldOption.image}-a.webp`)}
					className={Style.imageA}
					width={75}
					height={75}
					alt={field.field}
					/>
				<Image
					src={imagePath(`images/fields/${fieldOption.image}-b.webp`)}
					className={Style.imageB}
					width={75}
					height={75}
					alt={field.field}
					/>
			</div>

			<ItemCounts itemNums={field.items} style={Style} />
		</td>
	)
}