'use client';

import Style from '../../styles/modules/fields.module.scss';
import { useCallback } from 'react';
import { fieldsOptions, updateItems, newField } from '../../lib/state';

export default function Field({
	rowIndex, cellIndex, field, items,
	setItems, selectedItem, fields, setFields, time}) {

	const changeField = useCallback((fieldOption) => {
		setFields(() => {
			let newFields = [...fields];
			newFields[rowIndex][cellIndex] = newField(time, fieldOption.items[selectedItem].field);
			return newFields;
		});
	});

	const changeItems = useCallback((prev, newItems) => {
		setItems(updateItems(prev, newItems));
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
			onClick={onCickField} ></td>
	)
}