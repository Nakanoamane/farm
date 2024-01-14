'use client';

import Style from '../../styles/modules/fields.module.scss';
import { useCallback } from 'react';
import { fieldsOptions, updateItems, newField } from '../../lib/state';

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
		const newLog = Object.keys(newItems).map((key) => {
			const num = newItems[key];
			if(num > 0){
				return {	type: 'GET', text: `${key} +${num}` };
			} else {
				return {	type: 'USE', text: `${key} ${num}` };
			}
		});

		setLogs((prev) => {
			let newLogs = [...prev];
			return newLog.concat(newLogs);
		});
	}

	const addScore = useCallback((newItems) => {
		let add = 0;
		Object.keys(newItems).forEach((key) => {
			const num = newItems[key];
			if(num > 0) { add += num; }
		});
		if(add > 0) { setScore((prev) => prev + add); }
	});

	const useAndGetItems = (fieldOption) => {
		const item = fieldOption.items[selectedItem];
		let newItems = {};
		if(item.items) {
			newItems = {...item.items};
		}
		if(items[selectedItem].num !== undefined){
			if(items[selectedItem].num <= 0) return;
			newItems[selectedItem] = -1;
		}

		if(Object.keys(newItems).length > 0){
			changeItems(items, newItems);
			addLogs(newItems);
			addScore(newItems);
		}
	};

	const onCickField =  () => {
		const fieldOption = fieldsOptions[field.field];
		const clickable = items[selectedItem].num !== undefined && items[selectedItem].num <= 0;
		if(clickable || !fieldOption.items || !fieldOption.items[selectedItem] ) return;

		changeField(fieldOption);
		useAndGetItems(fieldOption);
	}

	return (
		<td
			className={`${Style.cell} ${fieldsOptions[field.field].className}`}
			onClick={onCickField}
			></td>
	)
}