'use client';

import Style from '../../styles/modules/fields.module.scss';
import { fieldsOptions, updateItems, newField, newLogs, calcLevel, updateAchievements } from '../../lib/state';

export default function Field({
	rowIndex, cellIndex, field, items, setItems, selectedItem, fields, setFields, time,
	setLogs, score, setScore, achievements, setAchievements }) {

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

	const searchAchievements = () => {
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

	const achieve = () => {
		const achievement = searchAchievements();
		if(achievement) {
			const newAchievements = updateAchievements(achievements, achievement);
			setAchievements(newAchievements);
		}
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
		achieve();
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