'use client';

import Style from '../../styles/modules/fields.module.scss';
import { fieldsOptions, updateItems, newField, newLogs } from '../../lib/state';

export default function Field({
	rowIndex, cellIndex, field, items, setItems,
	selectedItem, fields, setFields, time, setLogs, setScore }) {

	const changeField = (fieldOption) => {
		setFields(() => {
			let newFields = [...fields];
			newFields[rowIndex][cellIndex] = newField(time, fieldOption.items[selectedItem].field);
			return newFields;
		});
	}

	const changeItems = (prev, newItems) => {
		setItems(updateItems(prev, newItems));
	}

	const addLogs = (newItems) => {
		const add = newLogs(newItems, selectedItem);
		setLogs((prev) => {
			return add.concat([...prev]);
		});
	}

	const addScore = (newItems) => {
		let add = 0;
		Object.keys(newItems).forEach((key) => {
			const num = newItems[key];
			if(num > 0) { add += num; }
		});
		if(add > 0) { setScore((prev) => prev + add); }
	}

	const getAndUseItems = (fieldOption) => {
		const item = fieldOption.items[selectedItem];
		let newItems = {};
		if(item.items) {
			newItems = {...item.items};
		}
		newItems[selectedItem] = -1;

		changeItems(items, newItems);
		addLogs(newItems);
		addScore(newItems);
	};

	const onCickField =  () => {
		const fieldOption = fieldsOptions[field.field];
		const clickable = items[selectedItem].num !== undefined && items[selectedItem].num <= 0;
		if(clickable || !fieldOption.items || !fieldOption.items[selectedItem] ) return;

		changeField(fieldOption);
		getAndUseItems(fieldOption);
	}

	return (
		<td
			className={`${Style.cell} ${fieldsOptions[field.field].className}`}
			onClick={onCickField}
			></td>
	)
}